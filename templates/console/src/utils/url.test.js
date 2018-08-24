import { convertUrlToArray } from './url'

describe('test convert URL to Array', () => {
  it('test one segment', () => {
    const url = '/aaa'
    expect(convertUrlToArray(url)).toEqual(['/aaa'])
  })

  it('test two segments', () => {
    const url = '/aaa/bbb'
    expect(convertUrlToArray(url)).toEqual(['/aaa', '/aaa/bbb'])
  })

  it('test three segments', () => {
    const url = '/aaa/bbb/ccc'
    expect(convertUrlToArray(url)).toEqual(['/aaa', '/aaa/bbb', '/aaa/bbb/ccc'])
  })
})
