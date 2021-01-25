import React from "react";
import {Switch, Route, Link, Redirect} from "react-router-dom";
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
    UserOutlined,
    DeploymentUnitOutlined
} from "@ant-design/icons";
import SitesEnabled from "../../pages/Dashboard/SitesEnabled/SitesEnabled";
import MyProfile from "../../pages/Dashboard/MyProfile/MyProfile";
import MyProfileEdit from "../../pages/Dashboard/MyProfileEdit/MyProfileEdit";
import RecentActivity from "../../pages/Dashboard/RecentActivity/RecentActivity";
import ChangePassword from "../../pages/Dashboard/ChangePassword/ChangePassword";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {CustomerPortalProps, CustomerPortalState} from "../../interfaces/customerPortal/customerPortal";
import helpers from "../../helpers";
import PermissionDelegation from "../../pages/Dashboard/PermissionDelegation/PermissionDelegation";
import {mainActions} from "../../redux/actions/mainActions";
import LoginOptions from "../../pages/Dashboard/LoginOptions/LoginOptions";

const {Header, Sider, Content} = Layout;

const links = {
    sites: "",
    profile: "profile",
    profileEdit: "profile-edit",
    activity: "recent-activity",
    changePassword: "change-password",
    permissionDelegation: "permission-delegation",
    loginOptions: "login-options",
};

class CustomerPortal extends React.Component<CustomerPortalProps, CustomerPortalState> {
    constructor(props: CustomerPortalProps) {
        super(props)
        this.state = {
            collapsed: false,
            selectedMenuItems: ["sites"],
        }
    }

    componentDidMount() {
        const {getFeaturesList, isAuthenticated} = this.props;
        if (isAuthenticated) getFeaturesList();
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
        const {loading, user, eventsExists, match, setPageLink} = this.props;
        const {collapsed, selectedMenuItems} = this.state;
        const {path} = match;

        if (!this.props.isAuthenticated) {
            setPageLink(history.location.pathname);
            return <Redirect to="/"/>
        }

        return (
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
                                <Button icon={<LogoutOutlined />} onClick={this.props.logout}>Logout</Button>
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
                                        <Link to={helpers.getPagePath(path, links.sites)}>Sites</Link>
                                    </Menu.Item>
                                    <Menu.Item key="profile" icon={<UserOutlined/>}>
                                        <Link to={helpers.getPagePath(path, links.profile)}>My Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="recent-activity" icon={<HistoryOutlined />} disabled={!eventsExists}>
                                        <Link to={helpers.getPagePath(path, links.activity)}>Recent Activity</Link>
                                    </Menu.Item>
                                    <Menu.ItemGroup title={<Divider />}/>
                                    <div className="menu-title f-bold">Settings</div>
                                    <Menu.Item key="login-options" icon={<LoginOutlined />}>
                                        <Link to={helpers.getPagePath(path, links.loginOptions)}>Login Options</Link>
                                    </Menu.Item>
                                    <Menu.Item key="change-password" icon={<KeyOutlined />}>
                                        <Link to={helpers.getPagePath(path, links.changePassword)}>Change Password</Link>
                                    </Menu.Item>
                                    <Menu.Item key="permission-delegation" icon={<ReloadOutlined />}>
                                        <Link to={helpers.getPagePath(path, links.permissionDelegation)}>Permission Delegation</Link>
                                    </Menu.Item>
                                    <Menu.Item key="admin-portal" icon={<DeploymentUnitOutlined />} disabled={user?.user.isSuperuser !== true}>
                                        Admin Portal
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content className="bg-white site-layout" style={{minHeight: 280}}>
                                <Switch>
                                    <Route exact path={helpers.getPagePath(path, links.sites)} component={SitesEnabled}/>
                                    <Route path={helpers.getPagePath(path, links.profile)} component={MyProfile} />
                                    <Route path={helpers.getPagePath(path, links.profileEdit)} component={MyProfileEdit} />
                                    {eventsExists && <Route path={helpers.getPagePath(path, links.activity)} component={RecentActivity} />}
                                    <Route path={helpers.getPagePath(path, links.changePassword)} component={ChangePassword} />
                                    <Route path={helpers.getPagePath(path, links.loginOptions)} component={LoginOptions} />
                                    <Route path={helpers.getPagePath(path, links.permissionDelegation)} component={PermissionDelegation} />

                                    <Route path="**" exact={true} component={Error404} />
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Spin>
            </div>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    const {isAuthenticated, eventsExists} = state.user;
    return {
        user: state.user,
        loading: state.main.loading,
        isAuthenticated,
        eventsExists,
    }
};

const mapDispatchToProps = {
    getFeaturesList: userActions.getFeaturesList,
    logout: userActions.logout,
    setPageLink: mainActions.setPageLink,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerPortal);
