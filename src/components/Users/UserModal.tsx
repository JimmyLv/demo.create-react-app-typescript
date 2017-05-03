import { Form, Input, Modal } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

import { User } from '../../models/users'

const FormItem = Form.Item

interface UserModalProps {
  children: React.ReactElement<{}>
  onOk: Function
  form: WrappedFormUtils
  record: User
}

class UserEditModal extends React.Component<UserModalProps, { visible: boolean }> {
  constructor(props: UserModalProps) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    const { visible } = this.state
    const { children, onOk, form, record } = this.props
    const { getFieldDecorator, validateFields } = form
    const { name, email, website } = record
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    return (
      <span>
        <span onClick={() => this.setState({ visible: true })}>{children}</span>
        <Modal
          title="Edit User"
          visible={visible}
          onOk={() => validateFields((err, values) => {
            if (!err) {
              onOk(values)
              this.setState({ visible: false })
            }
          })}
          onCancel={() => this.setState({ visible: false })}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(UserEditModal)