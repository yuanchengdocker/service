import React from 'react'
import { Button, Modal, Form, Input,Select, Radio,notification,DatePicker } from 'antd';
const FormItem = Form.Item;
import ReactDOM from 'react-dom'
import {axiosAjax} from '../../../service/getService'
import {ep} from '../../../utils/create-events'
import {formatDateTime} from '../../../utils/optTime'

class SingleAdd extends React.Component{
    constructor(props){
        super(props)
        const { visible,member,visibleFn,flag,sucFn } = this.props;
        this.state={
          visible:visible,
          flag:flag,
          member:member||{},
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      const { visible,member } = nextProps;
      this.setState({
        visible:visible,
        member:member
      })
    }

    hiddenModule(){
      const { resetFields } = this.props.form;
      this.setState({
        visible:false
      })
      resetFields();
      this.props.visibleFn(false);
    }
    
    render(){
      const { getFieldDecorator,resetFields } = this.props.form;
      let member = this.state.member||{};
      return (
        <Modal
          visible={this.state.visible}
          title={"个人信息"}
          maskClosable={false}
          okText="Ok"
          onCancel={this.hiddenModule.bind(this)}
          onOk={this.hiddenModule.bind(this)}
        >
          <Form layout="vertical">
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                initialValue:member.name,
                rules: [{
                  required: true,
                  message: '姓名不能为空',
                }],
              })(
                <Input placeholder="请输入姓名！" />
              )}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address', {
                initialValue:member.address,
                rules: [{ required: true, message: '地址不能为空' },{
                  validator: this.phoneValid,
                }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入地址！"/>
              )}
            </FormItem>
           
          </Form>
        </Modal>
      );
    }
}


const Profile2 = Form.create()(SingleAdd)
export default Profile2;