import React from 'react'
import ReactDOM from 'react-dom'
import {getUser,delUser,getUserFlag} from './userInit'
import {ep} from '../utils/create-events'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMainWord } from '../store/index/action';

class Menu extends React.Component{
    constructor(props){
        super(props)
        let userFlag = getUserFlag();
        let user = getUser();
        let self = this;
        ep.on("update-user-flag",function(user){
            self.updateUser(user)
        });
        ep.on("update-menu-flag",function(){
            self.overflowChange($("body").hasClass("sidebar-collapse")?false:true)
        });
        let active = location.hash.split("#/")[1];
        this.state = {
            active:active||"index",
            user:user||{},
            isRoot:userFlag=="root"
        }
    }
    componentDidMount () {
        let self = this;
        $("#content-5").mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia:100,
            autoHideScrollbar:true,
            autoDraggerLength:true,
            mouseWheel:true,
            advanced:{ updateOnContentResize:true }
        });
        this.overflowChange($("body").hasClass("sidebar-collapse")?false:true)

        $(".sidebar-menu").find("li").find("a[href*='#/']").on('click',function(){
            let active = this.getAttribute('href').split("#/")[1];
            if(active == self.state.active) return;
            self.setState({
                active:active
            })
            let clickObj = $(".sidebar-menu").find("li").find("a[href='"+this.getAttribute('href')+"']");
            var liObj = clickObj.parents("ul.treeview-menu").length == 0?clickObj.parent().children("a").children("span"):clickObj.parent().parents("li").children("a").children("span");

            self.props.updateMainWord({main:liObj[0].innerHTML,name:clickObj.parents("ul.treeview-menu").length == 0?"":clickObj.text()});
        })
    }
    
    overflowChange(flag){
        if(flag){
            $("#content-5").find(".mCustomScrollBox").css("overflow","hidden");
            $("#content-5").find(".mCSB_container").css("overflow","hidden");
        }else{
            $("#content-5").find(".mCustomScrollBox").css("overflow","visible");
            $("#content-5").find(".mCSB_container").css("overflow","visible");
        }
    }

    componentWillUpdate () {
        getUserFlag();
    }
    
    updateUser(user){
        this.setState({
            user:user
        })
    }
	menuChange(page){
        this.setState({
            active:page
        })
    }
    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
    }
    render(){
        let active = this.state.active;
        let user = this.state.user;
        return (
            <section className="sidebar" style={{height:'100%'}}>
                <div className="user-panel">
                    <div className="pull-left image">
                    <img src="../img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                    </div>
                    <div className="pull-left info">
                    <p>Alexander Pierce</p>
                    <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>
                <form action="#" method="get" className="sidebar-form">
                    <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..."/>
                        <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
                <div id="content-5" style={{height:'85%'}}>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className={"user,index".indexOf(active)>=0?"treeview active":"treeview"}>
                            <a href="#">
                                <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li className={"user".indexOf(active)>=0?"active":""}><a href="#/user"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
                                <li className={"index".indexOf(active)>=0?"active":""}><a href="#/index"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-files-o"></i>
                                <span>Layout Options</span>
                                <span className="pull-right-container">
                                <span className="label label-primary pull-right">4</span>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="../layout/top-nav.html"><i className="fa fa-circle-o"></i> Top Navigation</a></li>
                                <li><a href="../layout/boxed.html"><i className="fa fa-circle-o"></i> Boxed</a></li>
                                <li><a href="../layout/fixed.html"><i className="fa fa-circle-o"></i> Fixed</a></li>
                                <li><a href="../layout/collapsed-sidebar.html"><i className="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                            </ul>
                        </li>
                        
                        <li className={"yuan".indexOf(active)>=0?"active":""}>
                        <a href="#/yuan">
                            <i className="fa fa-th"></i> <span>Widgets</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green">new</small>
                            </span>
                        </a>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-pie-chart"></i>
                            <span>Charts</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="../charts/chartjs.html"><i className="fa fa-circle-o"></i> ChartJS</a></li>
                            <li><a href="../charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
                            <li><a href="../charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
                            <li><a href="../charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
                        </ul>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-laptop"></i>
                            <span>UI Elements</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="../UI/general.html"><i className="fa fa-circle-o"></i> General</a></li>
                            <li><a href="../UI/icons.html"><i className="fa fa-circle-o"></i> Icons</a></li>
                            <li><a href="../UI/buttons.html"><i className="fa fa-circle-o"></i> Buttons</a></li>
                            <li><a href="../UI/sliders.html"><i className="fa fa-circle-o"></i> Sliders</a></li>
                            <li><a href="../UI/timeline.html"><i className="fa fa-circle-o"></i> Timeline</a></li>
                            <li><a href="../UI/modals.html"><i className="fa fa-circle-o"></i> Modals</a></li>
                        </ul>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-edit"></i> <span>Forms</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="../forms/general.html"><i className="fa fa-circle-o"></i> General Elements</a></li>
                            <li><a href="../forms/advanced.html"><i className="fa fa-circle-o"></i> Advanced Elements</a></li>
                            <li><a href="../forms/editors.html"><i className="fa fa-circle-o"></i> Editors</a></li>
                        </ul>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-table"></i> <span>Tables</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="../tables/simple.html"><i className="fa fa-circle-o"></i> Simple tables</a></li>
                            <li><a href="../tables/data.html"><i className="fa fa-circle-o"></i> Data tables</a></li>
                        </ul>
                        </li>
                        <li>
                        <a href="../calendar.html">
                            <i className="fa fa-calendar"></i> <span>Calendar</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-red">3</small>
                            <small className="label pull-right bg-blue">17</small>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="../mailbox/mailbox.html">
                            <i className="fa fa-envelope"></i> <span>Mailbox</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-yellow">12</small>
                            <small className="label pull-right bg-green">16</small>
                            <small className="label pull-right bg-red">5</small>
                            </span>
                        </a>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-folder"></i> <span>Examples</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="invoice.html"><i className="fa fa-circle-o"></i> Invoice</a></li>
                            <li className=""><a href="profile.html"><i className="fa fa-circle-o"></i> Profile</a></li>
                            <li><a href="login.html"><i className="fa fa-circle-o"></i> Login</a></li>
                            <li><a href="register.html"><i className="fa fa-circle-o"></i> Register</a></li>
                            <li><a href="lockscreen.html"><i className="fa fa-circle-o"></i> Lockscreen</a></li>
                            <li><a href="404.html"><i className="fa fa-circle-o"></i> 404 Error</a></li>
                            <li><a href="500.html"><i className="fa fa-circle-o"></i> 500 Error</a></li>
                            <li><a href="blank.html"><i className="fa fa-circle-o"></i> Blank Page</a></li>
                            <li><a href="pace.html"><i className="fa fa-circle-o"></i> Pace Page</a></li>
                        </ul>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-share"></i> <span>Multilevel</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
                            <li className="treeview">
                            <a href="#"><i className="fa fa-circle-o"></i> Level One
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="#"><i className="fa fa-circle-o"></i> Level Two</a></li>
                                <li className="treeview">
                                <a href="#"><i className="fa fa-circle-o"></i> Level Two
                                    <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                                    <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                                </ul>
                                </li>
                            </ul>
                            </li>
                            <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
                        </ul>
                        </li>
                        <li><a href="https://adminlte.io/docs"><i className="fa fa-book"></i> <span>Documentation</span></a></li>
                        <li className="header">LABELS</li>
                        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
                        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
                        <li><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
                    </ul>
                </div>
            </section>
        )
    }
}

// export default Menu;
const mapStateToProps = (state) => {
  return {
    mainword:state.mainword
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateMainWord:bindActionCreators(updateMainWord,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Menu);