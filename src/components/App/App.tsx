import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import {Router, Switch, Route, Link} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import Error404 from "../../pages/Error404";
import {Avatar, Button, Divider, Layout, Menu, Spin} from "antd";
import logoSm from "../../staticfiles/images/logo-sm.png";
import {
    BorderOutlined,
    HistoryOutlined, KeyOutlined, LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, ReloadOutlined,
    UserOutlined
} from "@ant-design/icons";
import SitesEnabled from "../../pages/SitesEnabled/SitesEnabled";
import MyProfile from "../../pages/MyProfile/MyProfile";
import MyProfileEdit from "../../pages/MyProfileEdit/MyProfileEdit";
import RecentActivity from "../../pages/RecentActivity/RecentActivity";
import ChangePassword from "../../pages/ChangePassword/ChangePassword";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {CustomerPortalProps} from "../../interfaces/customerPortal/customerPortal";
import { AppProps, AppState } from "../../interfaces/app";

const {Header, Sider, Content} = Layout;

const links = {
    sites: "/sites",
    profile: "/profile",
    profileEdit: "/profile-edit",
    activity: "/recent-activity",
    changePassword: "/change-password",
};

class App extends React.Component<AppProps, AppState> {
    constructor(props: CustomerPortalProps) {
        super(props)
        this.state = {
            collapsed: false,
            selectedMenuItems: ["sites"],
        }
    }

    componentDidMount() {
        const {auth, getFeaturesList} = this.props;
        auth();
        getFeaturesList();
        this.setMenuInitialState();
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    setMenuInitialState = () => {
        let {pathname} = history.location;
        pathname = pathname.substring(1);
        this.setState({ selectedMenuItems: [pathname] });
    }

    onMenuSelect = (e: any) => {
        let key: string = e.key;
        this.setState({selectedMenuItems: [key]});
    }

    render() {
        const {loading, user, eventsExists} = this.props;
        const {collapsed, selectedMenuItems} = this.state;

        return (
            <Router history={history}>
                <div className="customer-portal">
                    <Spin tip="Loading..." spinning={loading}>
                        <Layout>
                            <Header className="bg-white logo-header" style={{width: "100%"}}>
                                <div style={{width: collapsed ? 55 : 225}} className="d-flex-center">
                                    <img src={logoSm} alt="logo-img"/>
                                    {!collapsed && <div className="logo-text f-bold">AuthMachine</div>}
                                </div>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: "trigger",
                                    onClick: this.toggle,
                                })}
                                <div style={{marginLeft: "auto"}}>
                                    <div style={{marginRight: 8, display: "inline-block"}}>
                                        {user.avatar
                                            ? <Avatar src={user.avatar} size="small" />
                                            : <Avatar icon={<UserOutlined />} size="small" />
                                        }
                                    </div>

                                    <div style={{marginRight: 15, display: "inline-block"}}>You're logged as <strong>{user?.username}</strong></div>
                                    <a href={"/directory/logout"}>
                                        <Button icon={<LogoutOutlined />}>Logout</Button>
                                    </a>
                                </div>
                            </Header>
                            <Layout>
                                <Sider trigger={null} collapsible collapsed={collapsed} style={{width: 300}} className="menu-aside">
                                    <Menu mode="inline"
                                          selectedKeys={selectedMenuItems}
                                          theme="light"
                                          onClick={this.onMenuSelect}
                                          className="submenu-list bg-white">
                                        <Menu.Item key="sites" icon={<BorderOutlined />}>
                                            <Link to={links.sites}>Sites</Link>
                                        </Menu.Item>
                                        <Menu.Item key="profile" icon={<UserOutlined/>}>
                                            <Link to={links.profile}>My Profile</Link>
                                        </Menu.Item>
                                        <Menu.Item key="recent-activity" icon={<HistoryOutlined />} disabled={!eventsExists}>
                                            <Link to={links.activity}>Recent Activity</Link>
                                        </Menu.Item>
                                        <Menu.ItemGroup title={<Divider />}/>
                                        <div className="menu-title f-bold">Settings</div>
                                        <Menu.Item key="login-options" icon={<LoginOutlined />}>
                                            Login Options
                                        </Menu.Item>
                                        <Menu.Item key="change-password" icon={<KeyOutlined />}>
                                            <Link to={links.changePassword}>Change Password</Link>
                                        </Menu.Item>
                                        <Menu.Item key="permission-delegation" icon={<ReloadOutlined />}>
                                            Permission Delegation
                                        </Menu.Item>
                                    </Menu>
                                </Sider>
                                <Content className="bg-white site-layout" style={{minHeight: 280}}>
                                    <Switch>
                                        <Route path={links.sites} component={SitesEnabled} />
                                        <Route path={links.profile} component={MyProfile} />
                                        <Route path={links.profileEdit} component={MyProfileEdit} />
                                        {eventsExists && <Route path={links.activity} component={RecentActivity} />}
                                        <Route path={links.changePassword} component={ChangePassword} />

                                        <Route path="**" exact={true} component={Error404} />
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>

                    </Spin>
                </div>
            </Router>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        user: state.user,
        loading: state.main.loading,
        eventsExists: state.user.eventsExists,
    }
};

const mapDispatchToProps = {
    auth: userActions.auth,
    getFeaturesList: userActions.getFeaturesList,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
