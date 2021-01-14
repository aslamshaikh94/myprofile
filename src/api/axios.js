import Axios from 'axios'
import { getAppStore, storeDispatcher } from '@store'
import { setLodingStatusAction } from '@actions'
// import { encryptRequest, decryptResponse } from './crypto'
import { LOGIN_ROUTE } from '@constants/routers'
import history from '@history'

import { showNotification } from '@shared/Notification'

/**
 * Authorizes requests by injecting the token from the localStorage.
 * @param {import('axios').AxiosRequestConfig} request The request object
 */
const outgoingRequestInterceptor = (request) => {
  if (request.url) {
    const { loggedInUserData = {} } = getAppStore()
    const { token } = loggedInUserData
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
    request.headers['Content-Type'] = 'application/json'
  }
  setLodingStatusAction(true)
  return request
}

/**
 * This interceptor is used to handle all possible axios failure scenarios.
 * Add an early return to not pass the error ahead to the caller.
 * @param {Object} err The error object
 */
const responseErrorInterceptor = (err) => {
  let errorJSON = err.toJSON ? err.toJSON() : {}
  const { response: { status, message } = {} } = err
  if (status < 500 && status >= 400) {
    // all 4xx errors

    // throw user to capture lead page if errorFlag is true Otherwise display err msg
    if (err.response && err.response.status === 400) {
      const {
        data: { message },
      } = err.response
      showNotification('error', message)
    }

    // throw user to login page. 403 might have to be removed depending on API
    if ([401, 403].includes(err.response.status)) {
      const {
        data: { message = 'You have been logged out' } = {},
      } = err.response

      showNotification('error', message)

      history.push(LOGIN_ROUTE)
    }
    setLodingStatusAction(false)
  }

  if (!!errorJSON && errorJSON.code === 'ECONNABORTED') {
    showNotification('error', 'Request Timed Out. Please check your connection')
    setLodingStatusAction(false)
  }

  if (!!errorJSON && errorJSON.message === 'Network Error') {
    showNotification('error', 'Network Error.')
    setLodingStatusAction(false)
  }

  return Promise.reject(err)
}

let AxiosInstance = Axios.create({
  baseURL: process.env.API_URL,
})

AxiosInstance.defaults.timeout = 30000

const responseSuccessInterceptor = (response) => {
  setLodingStatusAction(false)
  return response
}

AxiosInstance.interceptors.request.use(
  (request) => outgoingRequestInterceptor(request),
  (error) => error,
)

AxiosInstance.interceptors.response.use(
  (response) => responseSuccessInterceptor(response),
  (error) => responseErrorInterceptor(error),
)

export default AxiosInstance
