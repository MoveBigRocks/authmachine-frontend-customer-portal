import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import "./App.scss";
import {Router, Switch, Route} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import Error404 from "../../pages/Error404";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import { AppProps } from "../../interfaces/app";
import {Helmet} from "react-helmet";
import CustomerPortal from "../CustomerPortal/CustomerPortal";
import Auth from "../Auth/Auth";
import {Spin} from "antd";
import SocialLogin from "../../pages/SocialLogin/SocialLogin";

const App = ({pageTitle, auth, loading}: AppProps) => {
    const [startAuth, setStartAuth] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading");

    useEffect(() => {
        const redirectFromProvider = localStorage.getItem("redirectFromProvider");
        if (redirectFromProvider) {
            localStorage.removeItem("redirectFromProvider");
            setShowLoading(true);
            setLoadingMessage("Login successful. One moment please");
        } else {
            if (startAuth) auth();
        }

    }, [startAuth, auth]);

    useEffect(() => setStartAuth(!window.location.pathname.startsWith("/socials")), [setStartAuth]);

    return (
        <Router history={history}>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Spin tip={`${loadingMessage}...`}
                  spinning={showLoading ? true : startAuth ? loading : false}
                  wrapperClassName="bg-white">
                <Switch>
                    <Route path={"/customer-portal"} component={CustomerPortal} />
                    <Route path={"/socials/:provider/login"} component={SocialLogin} />
                    <Route exact path={""} component={Auth} />
                    <Route path="**" exact={true} component={Error404} />
                </Switch>
            </Spin>
        </Router>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        pageTitle: state.main.pageTitle,
        loading: state.main.authLoading,
    }
};

const mapDispatchToProps = {
    auth: userActions.auth,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
