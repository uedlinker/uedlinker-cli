import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Input, Form, Button, Row, Col, Select, Popover, Progress } from 'antd'
import CaptchaButton from 'Components/CaptchaButton/index'

import styles from './register.scss'

const FormItem = Form.Item
const { Option } = Select

const passwordStrengthTypeMap = {
  weak: '弱',
  normal: '中',
  strong: '强',
}

@withRouter
class Register extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
    }).isRequired,
    history: PropTypes.shape({}).isRequired,
  }

  getPasswordStrength = () => {
    const { form: { getFieldValue } } = this.props
    const password = getFieldValue('password')

    if (password && password.length > 9) {
      return 'strong'
    }

    if (password && password.length > 5) {
      return 'normal'
    }

    return 'weak'
  }

  validatePassword = (rule, value, callback) => {
    const { form: { getFieldValue, validateFields } } = this.props

    const confirmPassword = getFieldValue('confirm')

    if (confirmPassword) {
      validateFields(['confirm'], { force: true })
    }

    callback()
  }

  validateConfirmPassword = (rule, value, callback) => {
    const { form } = this.props
    const originalPassword = form.getFieldValue('password')

    if (value && (value !== originalPassword)) {
      callback('俩次输入的密码不一致！')
    } else {
      callback()
    }
  }

  handlePasswordChange = (e) => {
    const { value } = e.target

    this.props.togglePopoverVisible(value.length > 0)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form: { validateFields },
      register,
      history,
    } = this.props

    validateFields((errors, values) => {
      if (!errors) {
        register(values)
          .then(() => {
            // resetFields()
            history.push('/user/register-result')
          })
      }
    })
  }

  renderPasswordProgress = () => {
    const { form: { getFieldValue } } = this.props
    const password = getFieldValue('password')

    if (!password) {
      return null
    }

    const percent = (password.length * 10) > 100 ? 100 : (password.length * 10)

    return (
      <Progress
        percent={percent}
        strokeWidth={6}
        showInfo={false}
        className={styles.progress}
      />
    )
  }

  render () {
    const {
      form: { getFieldDecorator },
      visible,
      registering,
    } = this.props

    const strengthType = this.getPasswordStrength()
    const select = (
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    )
    const prefixSelector = getFieldDecorator('itu', {
      initialValue: '86',
    })(select)

    return (
      <div className={styles.container}>
        <h3>注册</h3>
        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: '请输入邮箱地址！',
              }, {
                type: 'email',
                message: '请输入正确的邮箱地址！',
              }],
            })(<Input size="large" placeholder="邮箱" />)}
          </FormItem>
          <FormItem>
            <Popover
              content={(
                <div className={styles[`strength-${strengthType}`]}>
                  <div className={styles.prompt}>{`强度：${passwordStrengthTypeMap[strengthType]}`}</div>
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                      请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              )}
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                validateFirst: true,
                rules: [{
                  required: true,
                  message: '请输入密码！',
                }, {
                  min: 6,
                  message: '请输入至少6位密码！',
                }, {
                  validator: this.validatePassword,
                }],
              })(
                <Input
                  size="large"
                  type="password"
                  onChange={this.handlePasswordChange}
                  placeholder="至少6位密码，区分大小写"
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              validateFirst: true,
              rules: [{
                required: true,
                message: '请确认密码！',
              }, {
                validator: this.validateConfirmPassword,
              }],
            })(<Input size="large" type="password" placeholder="确认密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{
                required: true,
                message: '请输入手机号！',
              }, {
                pattern: /^(13[0-9]|14[56789]|15[012356789]|16[56]|17[01345678]|18[0-9]|19[89])[0-9]{8}$/,
                message: '请输入正确的手机号！',
              }],
            })(<Input size="large" addonBefore={prefixSelector} placeholder="11位手机号" />)}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                <FormItem>
                  {getFieldDecorator('captcha', {
                    rules: [{
                      required: true,
                      message: '请输入验证码！',
                    }],
                  })(
                    <Input
                      placeholder="验证码"
                      type="password"
                      size="large"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <CaptchaButton
                  size="large"
                  className={styles.captchaButton}
                  onClick={this.handleGetCaptcha}
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              type="primary"
              className={styles.submit}
              htmlType="submit"
              loading={registering}
            >注册
            </Button>
            <Link to="/user/login" className={styles.login}>使用已有账户登录</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({
    visible: state.register.popoverVisible,
    registering: state.register.pending,
  }),
  dispatch => ({
    register: values => dispatch.register.register(values),
    togglePopoverVisible: shouldVisible => dispatch.register.togglePopoverVisible(shouldVisible),
  })
)(Form.create()(Register))
