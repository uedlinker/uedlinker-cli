export const addLeadingSlash = path => {
  return path.charAt(0) === '/' ? path : '/' + path
}

export const stripLeadingSlash = path => {
  return path.charAt(0) === '/' ? path.substr(1) : path
}

export const addTrailingSlash = path => {
  return path.charAt(path.length - 1) === '/' ? path : path + '/'
}

export const stripTrailingSlash = path => {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path
}

export const addSlashes = path => {
  return addTrailingSlash(addLeadingSlash(path))
}

export const stripSlashes = path => {
  return stripTrailingSlash(stripLeadingSlash(path))
}

export const hasBasename = (path, basename) => {
  return new RegExp('^' + basename + '(\\/|\\?|#|$)', 'i').test(path)
}

export const stripBasename = (path, basename) => {
  basename = stripTrailingSlash(addLeadingSlash(basename))
  return hasBasename(path, basename) ? path.substr(basename.length) : path
}
