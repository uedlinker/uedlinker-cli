import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from 'antd'

import styles from './result.scss'

const Result = ({
  className,
  type,
  title,
  description,
  extra,
  actions,
  ...restProps
}) => {
  const iconMap = {
    error: <Icon className={styles.error} type="close-circle" />,
    success: <Icon className={styles.success} type="check-circle" />,
  }
  const clsString = classNames(styles.result, className)

  return (
    <div className={clsString} {...restProps}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}

Result.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  extra: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  actions: PropTypes.node,
}

Result.defaultProps = {
  className: '',
  description: '',
  extra: '',
  actions: null,
}

export default Result
