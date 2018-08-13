// 引入按需加载单个页面（组件导入）
// const index = (location,cb) =>{
// 	require.ensure([], require => {
// 		cb(null, require('../components/index/Index').default);//当导出组建为default时添加default
// 	  });
// }
// const user = (location,cb) =>{
// 	require.ensure([], require => {
// 		cb(null, require('../components/user/User').default);
// 	  });
// }
// export default [
//     {path:"index",com:index},
//     {path:"user",com:user}
// ]


import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

const Index = asyncComponent(() => import("../components/index/Index"));
const User = asyncComponent(() => import("../components/user/User"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/index" component={Index} />
          <Route path="/user" component={User} />
          <Route path="/yuan" component={User} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}
