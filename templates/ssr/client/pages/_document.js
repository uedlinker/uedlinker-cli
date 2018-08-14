import React from 'react'
import getConfig from 'next/config'
import Document, { Head, Main, NextScript } from 'next/document'

import { addSlashes } from '../utils/pathUtils'

// 从服务器渲染获取到的配置，basename 是 next.config.js 文件中配置的值。
const { publicRuntimeConfig: { basename = '/' } } = getConfig()

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href={`${addSlashes(basename)}_next/static/style.css`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
