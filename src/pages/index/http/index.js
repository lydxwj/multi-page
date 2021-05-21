// import { axiosPost } from '@/utils/ruquest';
// import $url from './url';

/**
 * 登录接口
 * @param {*} params
 */
export function Login() {
  // return axiosPost($url.authority.login, params);
  return Promise.resolve({
    code: 200,
    result: 'token',
    msg: 'success'
  })

}

/**
 * 登出
 */
export function logout() {
  // return axiosPost($url.authority.logout)
  return Promise.resolve({
    code: 200,
    result: true,
    msg: 'success'
  })
}
