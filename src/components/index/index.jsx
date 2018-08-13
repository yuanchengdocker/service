import React from 'react'
import ReactDOM from 'react-dom'
import {Button,notification,Input,Table,Icon,Divider} from 'antd'
const Search = Input.Search;
// import XLSX from 'xlsx'
import {getUser,delUser,getUserFlag} from '../userInit'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax} from '../../service/getService';
import {formatDateTime} from '../../utils/optTime'
import SingleAdd from './member/SingleAdd'
import {ep} from '../../utils/create-events'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

// const XLSX = () => import('xlsx')

import { getMemberList } from '../../store/index/action';

class Index extends React.Component{
    constructor(props){
        super(props)
        let userFlag = getUserFlag();
        this.state={
            member:{},
            singleVisibal:false
        }
    }

    memberSingleAddVisibal(flag){
        this.setState({
            singleVisibal:flag
        })
    }
    
    componentDidMount () {
        notification['success']({
            message: '加载完成',
            description: "lalala",
        });
    }
    itemDel(e){
        console.log(e)
        this.setState({
            singleVisibal:true,
            member:e
        })
    }
    render(){
        const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text,record) => <a href="#" onClick={this.itemDel.bind(this,record)}>{text}</a>,
        }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
            <a href="#">Action 一 {record.name}</a>
            <Divider type="vertical" />
            <a href="#" onClick={this.itemDel.bind(this,text)}>Delete</a>
            <Divider type="vertical" />
            <a href="#" className="ant-dropdown-link">
                More actions <Icon type="down" />
            </a>
            </span>
        ),
        }];

        const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        }];
        
        return (
                <div className="main-content">
                    <SingleAdd flag={"add"} visibleFn={this.memberSingleAddVisibal.bind(this)} visible={this.state.singleVisibal} member={this.state.member}/>
                    <Table columns={columns} dataSource={data} />
                </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    formData:state.formData
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        yuantest:bindActionCreators(getMemberList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);
