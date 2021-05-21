import Cookies from 'js-cookie';
import { TOKEN } from '../constant';

// 默认url
export const getBaseURL = function() {
  if (process.env.NODE_ENV == 'development') {
    return 'http://test.com';
  } else {
    return 'http://test.com';
  }
};

// 获取登录验证
export function getAuthority() {
  return Cookies.get(TOKEN);
}

// 存token
export function setAuthority(authority, expires = 4) {
  return Cookies.set(TOKEN, authority, { expires });
}

// 移除token
export function removeAuthority() {
  return Cookies.remove(TOKEN);
}

/**
 * 判断是否是基本数据类型
 * @param value
 */
function isPrimitive(value) {
  return (typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean')
}

/**
 * 判断是否是一个js对象
 * @param value
 */
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 深拷贝一个值
 * @param value
 */
export function cloneDeep(value) {
  // 记录被拷贝的值，避免循环引用的出现
  const memo = {};

  function baseClone(value) {
    let res;
    // 如果是基本数据类型，则直接返回
    if (isPrimitive(value)) {
      return value;
      // 如果是引用数据类型，我们浅拷贝一个新值来代替原来的值
    } else if (Array.isArray(value)) {
      res = [...value];
    } else if (isObject(value)) {
      res = { ...value };
    }
    // 检测我们浅拷贝的这个对象的属性值有没有是引用数据类型。如果是，则递归拷贝
    Reflect.ownKeys(res).forEach(key => {
      if (typeof res[key] === 'object' && res[key] !== null) {
        // 此处我们用memo来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
        if (memo[res[key]]) {
          res[key] = memo[res[key]];
        } else {
          memo[res[key]] = res[key];
          res[key] = baseClone(res[key])
        }
      }
    })
    return res;
  }

  return baseClone(value)
}

/**
 * 不再框架内，跳转到对应页面
 * @returns 
 */
export function isInIframe() {
	if (window.frames.length == parent.frames.length) {
    let pathname = window.location.pathname;
    const dotIndex = pathname.indexOf('.');
    if (dotIndex > -1) {
      pathname = pathname.substring(0, dotIndex);
    }
    window.location.href = '/iframe' + pathname;
  }
}

/**
 * 后代页面提示
 * @returns 
 */
export function descendantsMessage(params) {
  const indexVue = window.parent.__indexVue__;
	if (indexVue) {
    indexVue.$message(params);
  }
}