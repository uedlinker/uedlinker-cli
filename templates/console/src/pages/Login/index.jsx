import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, Form, Input, Icon, Row, Col, Button, Checkbox, Alert } from 'antd'
import CaptchaButton from 'Components/CaptchaButton/index'
import { LOGIN_TYPE } from 'Constants/index'

import styles from './login.scss'

const { TabPane } = Tabs
const FormItem = Form.Item

@withRouter
class Login extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
    }).isRequired,
    history: PropTypes.shape({}).isRequired,
  }

  handleChangeAutoLogin = () => {
    this.props.changeAutoLogin()
  }

  handleChangeLoginType = (activeKey) => {
    this.props.changeLoginType(activeKey)
  }

  handleGetCaptcha = () => {
    console.log('获取验证码！') // eslint-disable-line no-console
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { form: { validateFields }, submit, history, loginType } = this.props
    const valiateFieldNames = []

    if (loginType === LOGIN_TYPE.ACCOUNT) {
      valiateFieldNames.push('username', 'password')
    } else {
      valiateFieldNames.push('mobile', 'captcha')
    }

    validateFields(valiateFieldNames, { force: true }, (errors, values) => {
      if (!errors) {
        submit(Object.assign({}, values, { type: loginType })).then((result) => {
          if (result) {
            history.replace('/dashboard')
          }
        })
      }
    })
  }

  renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;

  render () {
    const {
      form: { getFieldDecorator },
      autoLogin,
      loginType,
      isLoginFailed,
      loading,
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className={styles.container}>
        <Tabs defaultActiveKey={loginType} onChange={this.handleChangeLoginType} animated={false}>
          <TabPane tab="账号密码登录" key={LOGIN_TYPE.ACCOUNT}>
            {isLoginFailed && (loginType === LOGIN_TYPE.ACCOUNT) && this.renderMessage('账户或密码错误（admin/888888）')}
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '请输入用户名！',
                }],
              })(
                <Input
                  placeholder="admin/user"
                  prefix={<Icon type="user" className={styles['prefix-icon']} />}
                  size="large"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码！',
                }],
              })(
                <Input
                  placeholder="888888/123456"
                  prefix={<Icon type="lock" className={styles['prefix-icon']} />}
                  type="password"
                  size="large"
                />
              )}
            </FormItem>
          </TabPane>
          <TabPane tab="手机号登录" key={LOGIN_TYPE.MOBILE}>
            {isLoginFailed && (loginType === LOGIN_TYPE.MOBILE) && this.renderMessage('验证码错误！')}
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [{
                  required: true,
                  message: '请输入手机号！',
                }, {
                  pattern: /^(13[0-9]|14[56789]|15[012356789]|16[56]|17[01345678]|18[0-9]|19[89])[0-9]{8}$/,
                  message: '请输入正确的手机号！',
                }],
              })(
                <Input
                  placeholder="mobile number"
                  prefix={<Icon type="mobile" className={styles['prefix-icon']} />}
                  size="large"
                />
              )}
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
                        placeholder="captcha"
                        prefix={<Icon type="mail" className={styles['prefix-icon']} />}
                        type="password"
                        size="large"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <CaptchaButton
                    size="large"
                    className={styles.getCaptcha}
                    onClick={this.handleGetCaptcha}
                  />
                </Col>
              </Row>
            </FormItem>
          </TabPane>
        </Tabs>
        <div>
          <Checkbox checked={autoLogin} onChange={this.handleChangeAutoLogin}>自动登录</Checkbox>
          <Link to="/forgot-password" className={styles['forgot-password']}>忘记密码</Link>
        </div>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submit}
            size="large"
            loading={loading}
          >登录
          </Button>
        </FormItem>
        <div>
          其他登录的方式
          <Icon type="alipay-circle" className={styles.icon} />
          <Icon type="taobao-circle" className={styles.icon} />
          <Icon type="weibo-circle" className={styles.icon} />
          <Link to="register" className={styles.register}>注册账户</Link>
        </div>
      </Form>
    )
  }
}

export default connect(
  state => ({
    autoLogin: state.login.autoLogin,
    loginType: state.login.loginType,
    isLoginFailed: state.login.isLoginFailed,
    loading: state.loading.effects.login.submit,
  }),
  dispatch => ({
    submit: info => dispatch.login.submit(info),
    changeAutoLogin: () => dispatch.login.changeAutoLogin(),
    changeLoginType: () => dispatch.login.changeLoginType(),
  })
)(Form.create()(Login))
