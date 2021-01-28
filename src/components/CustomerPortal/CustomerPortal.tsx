import React, {useEffect, useRef, useState} from "react";
import {Switch, Route, Link, Redirect} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import Error404 from "../../pages/Error404";
import {Avatar, Button, Divider, Layout, Menu, Spin} from "antd";
import logoSm from "../../staticfiles/images/logo-sm.png";
import {
    BorderOutlined,
    HistoryOutlined, KeyOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, ReloadOutlined,
    UserOutlined,
    DeploymentUnitOutlined,
    SplitCellsOutlined
} from "@ant-design/icons";
import SitesEnabled from "../../pages/Dashboard/SitesEnabled/SitesEnabled";
import MyProfile from "../../pages/Dashboard/MyProfile/MyProfile";
import MyProfileEdit from "../../pages/Dashboard/MyProfileEdit/MyProfileEdit";
import RecentActivity from "../../pages/Dashboard/RecentActivity/RecentActivity";
import ChangePassword from "../../pages/Dashboard/ChangePassword/ChangePassword";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {CustomerPortalProps} from "../../interfaces/customerPortal/customerPortal";
import helpers from "../../helpers";
import PermissionDelegation from "../../pages/Dashboard/PermissionDelegation/PermissionDelegation";
import {mainActions} from "../../redux/actions/mainActions";
import LoginOptions from "../../pages/Dashboard/LoginOptions/LoginOptions";
import './CustomerPortal.scss';

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

const CustomerPortal = ({
                            getFeaturesList,
                            loading,
                            user,
                            eventsExists,
                            match,
                            setPageLink,
                            isAuthenticated,
                            isSuperuser,
                            username,
                            logout,
                        }: CustomerPortalProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItems, setSelectedMenuItems] = useState(['sites']);
    const [isMobileSize, setIsMobileSize] = useState(false);

    const menuRef = useRef(null);


    useEffect(() => {
        if (isAuthenticated) getFeaturesList();
        setMenuInitialState();

        checkMobileSize();
        window.addEventListener('resize', () => {
            checkMobileSize();
        });

        return () => {
            window.removeEventListener('resize', () => {
                checkMobileSize();
            });
        }
    }, [isAuthenticated, getFeaturesList]);

    const checkMobileSize = () => {
        if (menuRef.current) {
            // @ts-ignore
            menuRef.current.focus();
        }
        if (document.documentElement.clientWidth < 600) {
            setCollapsed(true);
            setIsMobileSize(true);
        } else {
            setIsMobileSize(false);
        }
    }

    const setMenuInitialState = () => {
        let {pathname} = history.location;
        pathname = pathname.substring(1);
        setSelectedMenuItems([pathname]);
    }

    const onMenuSelect = (e: any) => {
        let key: string = e.key;
        setSelectedMenuItems([key])
    }

    const {path} = match;

    const pageLinks = {
        sites: helpers.getPagePath(path, links.sites),
        profile: helpers.getPagePath(path, links.profile),
        profileEdit: helpers.getPagePath(path, links.profileEdit),
        loginOptions: helpers.getPagePath(path, links.loginOptions),
        changePassword: helpers.getPagePath(path, links.changePassword),
        permissionDelegation: helpers.getPagePath(path, links.permissionDelegation),
        activity: helpers.getPagePath(path, links.activity),
    }

    if (!isAuthenticated) {
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
                        <div className="mobile-hide">
                            {
                                collapsed &&
                                <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(prev => !prev)}/>
                            }
                            {
                                !collapsed &&
                                <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(prev => !prev)}/>
                            }
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            <div style={{marginRight: 8, display: "inline-block"}}>
                                {user.avatar
                                    ? <Avatar src={user.avatar} size="small"/>
                                    : <Avatar icon={<UserOutlined/>} size="small"/>
                                }
                            </div>

                            <div style={{marginRight: 15, display: "inline-block"}}>
                                <span className="mobile-hide">You're logged as </span>
                                <strong>{username}</strong>
                            </div>
                            {
                                !isMobileSize &&
                                <Button icon={<LogoutOutlined/>} onClick={logout}
                                        className="logout-btn">Logout</Button>
                            }
                        </div>
                    </Header>
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={collapsed} style={{width: 300}}
                               className="menu-aside">
                            <input style={{display: 'none'}} ref={menuRef} type="text"/>
                            <Menu mode="inline"
                                  selectedKeys={selectedMenuItems}
                                  theme="light"
                                  onClick={onMenuSelect}
                                  className="submenu-list bg-white">
                                <Menu.Item key="sites" icon={<BorderOutlined/>}>
                                    <Link to={pageLinks.sites}>Sites</Link>
                                </Menu.Item>
                                <Menu.Item key="profile" icon={<UserOutlined/>}>
                                    <Link to={pageLinks.profile}>My Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="recent-activity" icon={<HistoryOutlined/>} disabled={!eventsExists}>
                                    <Link to={pageLinks.activity}>Recent Activity</Link>
                                </Menu.Item>
                                <Menu.ItemGroup title={<Divider/>}/>
                                <div className="menu-title f-bold">Settings</div>
                                <Menu.Item key="login-options" icon={<SplitCellsOutlined/>}>
                                    <Link to={pageLinks.loginOptions}>Login Options</Link>
                                </Menu.Item>
                                <Menu.Item key="change-password" icon={<KeyOutlined/>}>
                                    <Link to={pageLinks.changePassword}>Change Password</Link>
                                </Menu.Item>
                                <Menu.Item key="permission-delegation" icon={<ReloadOutlined/>}>
                                    <Link to={pageLinks.permissionDelegation}>Permission Delegation</Link>
                                </Menu.Item>
                                <Menu.Item key="admin-portal" icon={<DeploymentUnitOutlined/>}
                                           disabled={!isSuperuser}>
                                    <a href={process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/admin"} rel="noreferrer">Admin Portal</a>
                                </Menu.Item>
                                {
                                    isMobileSize &&
                                    <>
                                        <Menu.ItemGroup title={<Divider/>}/>
                                        <Menu.Item onClick={logout} key="logout" icon={<LogoutOutlined/>}/>
                                    </>
                                }
                            </Menu>
                        </Sider>
                        <Content className="bg-white site-layout" style={{minHeight: 280}}>
                            <Switch>
                                <Route exact path={pageLinks.sites} component={SitesEnabled}/>
                                <Route path={pageLinks.profile} component={MyProfile}/>
                                <Route path={pageLinks.profileEdit} component={MyProfileEdit}/>
                                {eventsExists && <Route path={pageLinks.activity} component={RecentActivity}/>}
                                <Route path={pageLinks.changePassword} component={ChangePassword}/>
                                <Route path={pageLinks.loginOptions} component={LoginOptions}/>
                                <Route path={pageLinks.permissionDelegation} component={PermissionDelegation}/>

                                <Route path="**" exact={true} component={Error404}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Spin>
        </div>
    );
}


const mapStateToProps = (state: RootState) => {
    const {username, isAuthenticated, eventsExists, isSuperUser} = state.user;
    return {
        username,
        user: state.user,
        loading: state.main.loading,
        isAuthenticated,
        eventsExists,
        isSuperuser: isSuperUser,
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
