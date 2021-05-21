import axios from 'axios';
import { Message } from 'element-ui'
import { TIME_OUT } from '../constant';
import { getAuthority, removeAuthority, getBaseURL } from '../utils';
import router from '../pages/index/router'
// axios 配置
axios.defaults.timeout = TIME_OUT;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.baseURL = getBaseURL();
export const baseURL = axios.defaults.baseURL;

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (getAuthority()) {
    config.headers['token'] = getAuthority();
  }
  return config;
}, (error) => {
  return error;
});

function MessagError(msg) {
  Message({
    message: msg,
    type: 'error',
    duration: 2 * 1000
  })
}
let isUnauthorized = true;
// 返回状态判断
axios.interceptors.response.use((res) => {
  const msg = res.data.message;
  if (res.data.code != '200') {
    if (res.data.code === 500) {
      MessagError(msg);
    } else if (res.data.code === 404) {
      MessagError(msg);
    } else if (res.data.code === 403) {
      MessagError(msg);
      router.push('/403');
    } else if (res.data.code === 401) {
      if (isUnauthorized) {
        MessagError("登录状态已过期，请重新登录");
        isUnauthorized = false;
      }
      removeAuthority();
      router.push('/login');
    } else if (res.data.code !== 200) {
      MessagError(msg);
    }
  }
  return res;
}, (error) => {
  if (error.response && error.response.status) {
    const code = error.response.status;
    const msg = error.response.data.message;
    if (code === 500) {
      MessagError(msg);
    } else if (code === 404) {
      MessagError(msg);
    } else if (code === 403) {
      MessagError(msg);
      router.push('/403');
    } else if (code === 401) {
      if (isUnauthorized) {
        MessagError("登录状态已过期，请重新登录");
        isUnauthorized = false;
      }
      router.push('/login');
    } else if (code !== 200) {
      MessagError(msg);
    }
  } else {
    MessagError('网络连接异常');
  }
  return Promise.reject(error);
});

/**
 * axios post 请求
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export function axiosPost(url, params){
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        if (response && response.data && response.data.code == 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * axios put 请求
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export function axiosPut(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(response => {
        if (response && response.data && response.data.code == 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * axios get 请求
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 */
export function axiosGet(url, data){
  return new Promise((resolve, reject) => {
    axios.get(url, data)
      .then(response => {
        if (response && response.data && response.data.code == 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * axios delete 请求
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export function axiosDelete(url, params) {
  const config = {
    data: params,
  };
  return new Promise((resolve, reject) => {
    axios.delete(url, config)
      .then(response => {
        if (response && response.data && response.data.code == 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default axios;
