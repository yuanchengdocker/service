/**
 * 
 * @authors yuancheng
 * @date    2017-05-31 16:42:35
 * @description 主入口模块
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';//对于IE9 es6中像Object.assign函数的转es5

// 引入React-Router模块
// import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink,browserHistory} from 'react-router'

import {
	HashRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider,connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import store from './store/store';

import style1 from './css/reset.styl';
import style2 from './css/main.styl';
import style3 from './css/public.styl';
import pages from './params/pageParams'
import Header from './components/Header'
import Menu from './components/menu'
import Login from './components/login/Login'
import {getUser} from './components/userInit'
import {ep} from './utils/create-events'


class App extends React.Component{
    constructor(props){
		super(props)
		let self = this;
		var user = getUser();
		this.state = {
			mainWord:"",
			nameWord:""
		}
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			mainWord:nextProps.mainword.main,
			nameWord:nextProps.mainword.name
		})
	}
	
	componentDidMount(){
		let index = "#/"+(location.hash.split("#/")[1]||"index");
		let clickObj = $(".sidebar-menu").find("li").find("a[href='"+index+"']");
        var liObj = clickObj.parents("ul.treeview-menu").length == 0?clickObj.parent().children("a").children("span"):clickObj.parent().parents("li").children("a").children("span");
		this.setState({
			mainWord:liObj[0].innerHTML,
			nameWord:clickObj.parents("ul.treeview-menu").length == 0?"":clickObj.text()
		})
	}
    render(){
        return (
            <div style={{height: '100%'}}>
				<Header/>
				<aside className="main-sidebar">
					<Menu/>
				</aside>
				<div  className="content-wrapper mCS-autoHide" style={{height: '100%',backgroundColor: '#ecf0f5'}}>
				<section id="content-5"  className="content" style={{postion:'relative'}}>
                    <section className="content-header">
                        <h1 style={{display:'inline-block'}}>
                            {this.state.nameWord||this.state.mainWord}
                        </h1>
                        <ol className="breadcrumb" style={{top:0}}>
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">{this.state.mainWord}</a></li>
							{
								this.state.nameWord?<li className="active">{this.state.nameWord}</li>:""
							}
                        </ol>
                    </section>
					{this.props.children}
                </section>

				<footer className="main-footer" style={{marginLeft: '0px !important'}}>
					<div className="pull-right hidden-xs">
					<b>Version</b> 2.4.0
					</div>
					<strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights
					reserved.
				</footer>
				</div>
			</div>
        )
    }
}

const mapStateToProps = (state) => {
return {
	mainword:state.mainword
}
}

let App2 = connect(mapStateToProps,null)(App);

const render = Component => {
	ReactDOM.render(
	  //绑定redux、热加载
		<Provider store={store}>
			<Router>
				<App2>
					<AppContainer>
						<Component />
					</AppContainer>
				</App2>
			</Router>
		</Provider>,
	  document.getElementById('root'),
	)
}
  
render(pages);

// 配置路由
// ReactDOM.render((
// 	<Provider store={store}>
//     <Router history={hashHistory} >
//         <Route path="/" component={main}>
// 			<IndexRoute getComponent={pages[0]&&pages[0].com}/>
// 			{
// 				pages.map((page,index)=>{
// 					return <Route key={index} path={page.path} getComponent={page.com}/>
// 				})
// 			}
//         </Route>
//     </Router>
// 	</Provider>
// ), document.getElementById('root'));


