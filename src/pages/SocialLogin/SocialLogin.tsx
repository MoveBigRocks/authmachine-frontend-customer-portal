import React, {useEffect} from "react";
import {Alert, Spin} from "antd";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {SocialLoginProps} from "../../interfaces/socialLogin";
import {Redirect} from "react-router-dom";
import helpers from "../../helpers";
import {mainActions} from "../../redux/actions/mainActions";


const SocialLogin = (props: SocialLoginProps) => {
    const {status, message, match, socialCallback, location, setPageTitle} = props;
    const {provider} = match.params;
    const loading = !status && message === "";

    useEffect(() => {
        socialCallback(provider, location.search);
    }, [socialCallback, provider, location]);

    useEffect(() => setPageTitle("Social Authorization"), [setPageTitle])

    if (status) {
        const redirectUrl = helpers.getValueFromLocalStorage("connectionType") === "login"
            ? "/customer-portal" : "/customer-portal/login-options";
        helpers.removeValueFromLocalStorage("connectionType");
        return <Redirect to={redirectUrl} />
    }

    return (
        <div className="customer-portal d-flex-cc" style={{minHeight: "100vh"}}>
            {loading && <Spin size="large" spinning={loading} tip="Loading..." style={{width: "100%"}}/>}
            {(!loading && !status) &&
                <Alert
                    style={{width: "90%", margin: "auto"}}
                    message="Error!"
                    description={message}
                    type="error"
                    showIcon
                />
            }
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {operationStatus, message} = state.user;
    return {
        status: operationStatus,
        message,
    }
};

const mapDispatchToProps = {
    socialCallback: userActions.socialCallback,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialLogin);
