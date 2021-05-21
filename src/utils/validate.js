/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|iframe:)/.test(path)
}

/**
 * 以iframe方式打开
 * @param path
 * @returns {boolean}
 */
export function isIframe(path) {
  return /^(iframe:)/.test(path)
}
