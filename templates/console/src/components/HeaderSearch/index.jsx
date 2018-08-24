import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, AutoComplete, Input } from 'antd'
import classNames from 'classnames'
import _ from 'lodash'

import styles from './headerSearch.scss'

class HeaderSearch extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    dataSource: PropTypes.arrayOf(PropTypes.node),
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onPressEnter: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    placeholder: '',
    dataSource: '',
    onChange: () => {},
    onPressEnter: () => {},
    onSearch: () => {},
    onSelect: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      inputMode: false,
      value: '',
    }
  }

  handleChange = (value) => {
    this.setState({ value })
    this.props.onChange(value)
  }

  handleKeyDown = _.debounce((e) => {
    if (e.key === 'Enter') {
      this.props.onPressEnter(this.state.value)
    }
  }, 500, {
    leading: true,
    trailing: false,
  })

  handleDebounceKeyDown = (e) => {
    e.persist()
    this.handleKeyDown(e)
  }

  handleClick = () => {
    this.setState({ inputMode: true })
    this.inputRef.focus()
  }

  handleBlur = () => {
    this.setState({
      inputMode: false,
      value: '',
    })
  }

  render () {
    const {
      className, placeholder, dataSource, onSearch, onSelect,
    } = this.props
    const { value, inputMode } = this.state
    const inputClsName = classNames(styles['input-wrapper'], {
      [styles.show]: inputMode,
    })

    return (
      <span className={classNames(styles.container, className)}>
        <button className={styles.trigger} onClick={this.handleClick}>
          <Icon type="search" />
        </button>
        <AutoComplete
          className={inputClsName}
          dataSource={dataSource}
          value={value}
          onChange={this.handleChange}
          onSelect={onSelect}
          onSearch={onSearch}
        >
          <Input
            ref={(c) => { this.inputRef = c }}
            type="text"
            placeholder={placeholder}
            className={styles.input}
            onBlur={this.handleBlur}
            onKeyDown={this.handleDebounceKeyDown}
          />
        </AutoComplete>
      </span>
    )
  }
}

export default HeaderSearch
