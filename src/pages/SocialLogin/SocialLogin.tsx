import React, {useEffect} from "react";
import {Alert, Spin, Space} from "antd";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {SocialLoginProps} from "../../interfaces/socialLogin";
import {Redirect} from "react-router-dom";
import helpers from "../../helpers";


const SocialLogin = (props: SocialLoginProps) => {
    const {status, message, match, socialCallback, location} = props;
    const {provider} = match.params;
    const loading = !status && message === "";

    useEffect(() => {
        socialCallback(provider, location.search);
    }, [socialCallback, provider, location]);

    if (status) {
        const redirectUrl = helpers.getValueFromLocalStorage("connectionType") === "login"
            ? "/customer-portal" : "/customer-portal/login-options";
        helpers.removeValueFromLocalStorage("connectionType");
        return <Redirect to={redirectUrl} />
    }

    return (
        <Space size="middle" className="d-flex-cc" style={{height: "100%"}}>
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
        </Space>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialLogin);
