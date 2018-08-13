const addLeadingSlash = path => {
  return path.charAt(0) === '/' ? path : '/' + path
}

const stripLeadingSlash = path => {
  return path.charAt(0) === '/' ? path.substr(1) : path
}

const addTrailingSlash = path => {
  return path.charAt(path.length - 1) === '/' ? path : path + '/'
}

const stripTrailingSlash = path => {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path
}

const addSlashes = path => {
  return addTrailingSlash(addLeadingSlash(path))
}

const stripSlashes = path => {
  return stripTrailingSlash(stripLeadingSlash(path))
}

const hasBasename = (path, basename) => {
  return new RegExp('^' + basename + '(\\/|\\?|#|$)', 'i').test(path)
}

const stripBasename = (path, basename) => {
  basename = stripTrailingSlash(addLeadingSlash(basename))
  return hasBasename(path, basename) ? path.substr(basename.length) : path
}

exports.addLeadingSlash = addLeadingSlash
exports.stripLeadingSlash = stripLeadingSlash
exports.addTrailingSlash = addTrailingSlash
exports.stripTrailingSlash = stripTrailingSlash
exports.addSlashes = addSlashes
exports.stripSlashes = stripSlashes
exports.hasBasename = hasBasename
exports.stripBasename = stripBasename
