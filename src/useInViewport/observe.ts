
export type ObserverInstanceCallback = (
  inView: boolean,
  entry: IntersectionObserverEntry
) => void;

const observerMap = new Map<
  string,
  {
    id: string;
    observer: IntersectionObserver;
    elements: Map<Element, Array<ObserverInstanceCallback>>;
  }
>();

/** element-dom 和 id的映射map */
const RootIds: WeakMap<Element | Document, string> = new WeakMap();
let rootId = 0;

let unSupportedValue: boolean | undefined = undefined;

/**
 * 当浏览器不支持 IntersectionObserver 时的处理逻辑
 * @param inView
 */
export function defaultFallbackInView(inView: boolean | undefined) {
  unSupportedValue = inView;
}

/**
 * 为root element 生成一个唯一的ID
 * @param root 所监听对象的具体祖先元素(element)。如果未传入值或值为null，则默认使用顶级文档的视窗
 * @returns
 */
function getRootId(root: IntersectionObserverInit['root']) {
  if (!root) return '0';
  if (RootIds.has(root)) return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}

/**
 * 将 options 转换成一个string id，
 * 确保在使用相同选项观察元素时可以重用相同的Observer
 * @param options
 * @returns
 */
export function optionsToId(options: IntersectionObserverInit) {
  return Object.keys(options)
    .sort()
    .filter((key) => options[key] !== undefined)
    .map((key) => {
      return `${key}_${
        key === 'root' ? getRootId(options.root) : options[key]
      }`;
    })
    .toString();
}

/**
 * 返回一个监听实例，如果以前创建过则从map中取，如果没有则新创建一个
 * @param options 
 * @returns 
 */
function createObserver(options: IntersectionObserverInit) {
  // 为Observer生成一个唯一的id，基于 options.root
  const id = optionsToId(options);
  let instance = observerMap.get(id);

  if (!instance) {
    // 为即将观察的元素，以及其绑定的回调函数建立映射关系，每个元素一旦进入视图，就应该触发这些回调。
    const elements = new Map<Element, Array<ObserverInstanceCallback>>();
    // 一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。
    let thresholds: number[] | readonly number[];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const inView =
          entry.isIntersecting &&
          thresholds.some((threshold) => entry.intersectionRatio >= threshold);

        // @ts-ignore 支持 IntersectionObserver v2
        if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
          // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
          // @ts-ignore
          entry.isVisible = inView;
        }

        elements.get(entry.target).forEach((callback) => {
          callback(inView, entry);
        });
      });
    }, options);

    // 确保阈值是一个有效的数组
    thresholds =
      observer.thresholds ||
      (Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold || 0]);

    instance = {
      id,
      observer,
      elements,
    };
    observerMap.set(id, instance);
  }

  return instance;
}

/**
 * 
 * @param element 要监听的dom元素
 * @param callback 当 intersection 状态发生变化时的回调
 * @param options observer options
 * @param fallbackInView 
 */
export function observe(
  element: Element,
  callback: ObserverInstanceCallback,
  options: IntersectionObserverInit = {},
  fallbackInView = unSupportedValue
) {
  if (typeof window.IntersectionObserver === 'undefined' && fallbackInView !== undefined) {
    const bounds = element.getBoundingClientRect();
    callback(fallbackInView, {
      isIntersecting: fallbackInView,
      target: element,
      intersectionRatio:
        typeof options.threshold === 'number' ? options.threshold : 0,
      time: 0,
      boundingClientRect: bounds,
      intersectionRect: bounds,
      rootBounds: bounds,
    })
    return () => {};
  }

  const {id, observer, elements} = createObserver(options);

  // 添加回调函数
  let callbacks = elements.get(element) || [];
  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }

  callbacks.push(callback);
  observer.observe(element);

  return function unobserve() {
    // 从回调函数数组中移除
    callbacks.splice(callbacks.indexOf(callback), 1);
    if (callbacks.length === 0) {
      // remove the callback from the callback list.
      elements.delete(element)
      // 使IntersectionObserver停止监听特定目标元素
      observer.unobserve(element);
    }

    if (elements.size === 0) {
      // no more elements are being observer by this instance, so destroy it. 呃，有时候发现英文比中文表达更简单
      observer.disconnect();
      observerMap.delete(id);
    }
  }
}
