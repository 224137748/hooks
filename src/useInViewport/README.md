## useInViewport

#### 简介
这个hook使用`Intersection Observer API`实现，用于监听某个dom元素进入或者离开viewport。

#### Api
|name|type|default|required|description|
|----|-----|----|----|----|
|root|Element|document|false|所监听对象的具体祖先元素(element)。如果未传入值或值为null，则默认使用顶级文档的视窗。|
|rootMargin|string|'0px'|false|计算交叉时添加到根(root)边界盒bounding box (en-US)的矩形偏移量， 可以有效的缩小或扩大根的判定范围从而满足计算需要。|
|threshold|number\|number[]|0|false|一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率|
|trackVisibility|boolean|false|false|一个布尔值，指示此 IntersectionObserver 是否将跟踪目标上的可见性更改。简而言之就是就是控制的entry中是否有一个isVisible属性，这个属性是表示观察的元素是否在可视区域内，这个属性在chrome是默认就有的，在其他浏览器中可能不存在，是为了兼容不支持IntersectionObserver V2的浏览器|
|delay|number|undefined|false|给定目标的此观察者发出的通知之间的最小延迟（以毫秒为单位）.如果trackVisibility为true，则必须将其设置为至少100|
|skip|boolean|false|false|跳过创建IntersectionObserver。您可以根据需要使用它来启用和禁用观察者。|
|triggerOnce|boolean|false|false|只触发观察者一次。(比如：组件第一次进入视图中发送接口请求）|
|initialInView|boolean|false| false|设置inView布尔值的初始值。如果你希望希望元素一开始就视口中，并且希望在元素离开时触发某些内容，则可以使用此选项。|
|fallbackInView|boolean|undefined|false|如果IntersectionObserver API在客户端不可用，默认行为是抛出错误。您可以设置特定的回退行为，并且inView值将设置为该值，而不是失败。如果要全局设置默认值，可以使用observe.ts中暴露出的defaultFallbackInView('specialValue')修改。嗯，查了一下ie11不支持IntersectionObserver，八嘎呀路！|
