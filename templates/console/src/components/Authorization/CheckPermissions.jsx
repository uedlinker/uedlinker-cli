import React from 'react'
import PromiseRender from './PromiseRender'

function isPromise (obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

// 当前权限
let CURRENT_AUTHORITY = null

export function setCurrentAuthority (authority) {
  if (typeof authority === 'function') {
    CURRENT_AUTHORITY = authority()
  } else if (typeof authority === 'string') {
    CURRENT_AUTHORITY = authority
  } else {
    CURRENT_AUTHORITY = null
  }
}
/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, target, Exception = null) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(CURRENT_AUTHORITY) >= 0) {
      return target
    }
    return Exception
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === CURRENT_AUTHORITY) {
      return target
    }
    return Exception
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(CURRENT_AUTHORITY)
      if (bool) {
        return target
      }
      return Exception
    } catch (error) {
      throw error
    }
  }
  throw new Error('unsupported parameters')
}

export default checkPermissions
