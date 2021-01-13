import React, {useEffect} from "react";
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

const App = ({pageTitle, auth, loading}: AppProps) => {

    useEffect(() => auth(), [auth]);

    return (
        <Router history={history}>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Spin tip="Loading..." spinning={loading} wrapperClassName="bg-white">
                <Switch>
                    <Route path={"/customer-portal"} component={CustomerPortal} />
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
