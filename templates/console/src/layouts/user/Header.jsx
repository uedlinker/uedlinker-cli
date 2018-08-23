import React from 'react'
import { Link } from 'react-router-dom'

import styles from './header.scss'
import logo from '../../assets/uedlinker.png'

const Header = () => (
  <header className={styles.container}>
    <Link to="/">
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className={styles.title}>Uedlinker</h1>
      <div className={styles.subtitle}>Uedlinker 控制台模板</div>
    </Link>
  </header>
)

export default Header
