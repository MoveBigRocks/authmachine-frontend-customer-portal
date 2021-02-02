import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import {RootState} from "../../redux/reducer";
import {connect} from "react-redux";
import SignIn from "../../pages/Auth/SignIn";
import {AuthProps} from "../../interfaces/auth";
import "./Auth.scss";
import Background from "../../staticfiles/images/auth-background.jpg";
import RecoveryPassword from "../../pages/Auth/RecoveryPassword";
import ResetPassword from "../../pages/Auth/ResetPassword";
import Registration from "../../pages/Auth/Registration";
import ActivateAccount from "../../pages/Auth/ActivateAccount";
import ActivateFinish from "../../pages/Auth/ActivateFinish";
import {Helmet} from "react-helmet";

const onlyNotAuthLinks = ["/", "/registration", "/login"];


const Auth = ({isAuthenticated, initialLink, pageTitle}: AuthProps) => {
    const [isAuth, setIsAuth] = useState(false);
    const {pathname} = history.location;

    useEffect(() => {
        if (isAuthenticated) setIsAuth(true);
    }, [isAuthenticated]);

    if (isAuth && onlyNotAuthLinks.includes(pathname)) {
        return <Redirect to={initialLink === "/" ? "/customer-portal" : initialLink} />
    }

    return (
        <div className="auth-page-container" style={{background: `url(${Background}) no-repeat center center`, backgroundSize: "cover"}}>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Switch>
                <Route exact path={["/", "/login"]} component={SignIn} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/recovery-password/:token" component={RecoveryPassword} />
                <Route exact path="/activation" component={ActivateAccount} />
                <Route exact path="/activation-with-username" component={ActivateAccount} />
                <Route exact path="/activation/:token" component={ActivateFinish} />
            </Switch>
        </div>
    );
}


const mapStateToProps = (state: RootState) => {
    const {isAuthenticated} = state.user;
    const {pageLink, pageTitle} = state.main;
    return {
        isAuthenticated,
        initialLink: pageLink,
        pageTitle,
    }
};

export default connect(mapStateToProps, null)(Auth);
