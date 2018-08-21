import React from 'react'
import { Spin } from 'antd'

import styles from './Loading.scss'

const Loading = () => (
  <div className={styles.container}>
    <Spin size="large" tip="加载中" />
  </div>
)

export default Loading
