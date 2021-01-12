import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import Error404 from "../../pages/Error404";
import {RootState} from "../../redux/reducer";
import {connect} from "react-redux";
import SignIn from "../../pages/Auth/SignIn";
import {AuthProps} from "../../interfaces/auth";
import "./Auth.scss";
import Background from "../../staticfiles/images/auth-background.png";
import RecoveryPassword from "../../pages/Auth/RecoveryPassword";
import ResetPassword from "../../pages/Auth/ResetPassword";
import Registration from "../../pages/Auth/Registration";
import ActivateAccount from "../../pages/Auth/ActivateAccount";
import ActivateAccountWithUsername from "../../pages/Auth/ActivateAccountWithUsername";

const Auth = ({loading}: AuthProps) => {
    return (
        <Router history={history}>
            <div className="auth-page-container" style={{background: `url(${Background}) no-repeat center center`, backgroundSize: "cover"}}>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <Route path="/recovery-password" component={RecoveryPassword} />
                    <Route path="/activation" component={ActivateAccount} />
                    <Route path="/activation-with-username" component={ActivateAccountWithUsername} />

                    <Route path="**" exact={true} component={Error404} />
                </Switch>
            </div>
        </Router>
    );
}


const mapStateToProps = (state: RootState) => {
    return {
        loading: state.main.loading,
    }
};

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
