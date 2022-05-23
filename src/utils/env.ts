export const inBrowser = typeof window !== 'undefined'
export const ua = inBrowser && navigator.userAgent.toLowerCase()
export const isWeChatDevTools = !!(ua && /wechatdevtools/.test(ua))
export const isAndroid = ua && ua.indexOf('android') > 0



/* istanbul ignore next */
export let supportsPassive = false
/* istanbul ignore next */
if (inBrowser) {
  const EventName = 'test-passive' as any
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true
      },
    }) // https://github.com/facebook/flow/issues/285
    window.addEventListener(EventName, () => {}, opts)
  } catch (e) {}
}