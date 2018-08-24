import pathToRegexp from 'path-to-regexp'

export function getOpenKeys (menuKeys, paths) {
  return paths
    .reduce((openKeys, path) => [...openKeys, ...menuKeys.filter(key => pathToRegexp(key).test(path))], [])
}

/**
 * 扁平化所有菜单路径
 *
 * [{
 *   path: '/aaa',
 *   children: {         ===>  ['/aaa', '/aaa/bbb']
 *     path: '/aaa/bbb'
 *   }
 * }]
 *
 * @export
 * @param {Object} menu 菜单数据
 * @returns {Array} 所有路径集合
 */
export function getFlatMenuKeys (menu) {
  return menu.reduce((keys, menuItem) => {
    keys.push(menuItem.path)
    if (menuItem.children) {
      return [...keys, ...getFlatMenuKeys(menuItem.children)]
    }

    return keys
  }, [])
}
