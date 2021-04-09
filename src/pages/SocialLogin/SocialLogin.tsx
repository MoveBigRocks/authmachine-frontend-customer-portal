import React, {useEffect, useState} from "react";
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
    const [socialLoading, setSocialLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const {provider} = match.params;
    const loading = !status && message === "";
    const redirectUrl = helpers.getValueFromLocalStorage("connectionType") === "login"
                ? "/customer-portal" : "/customer-portal/login-options";

    useEffect(() => {
        const nextUrl = localStorage.getItem("nextUrl");
        socialCallback(provider, location.search, nextUrl);
    }, [socialCallback, provider, location]);

    useEffect(() => setPageTitle("Social Authorization"), [setPageTitle]);

    useEffect(() => {
        if (status) {
            helpers.removeValueFromLocalStorage("connectionType");
            const nextUrl = localStorage.getItem("nextUrl");
            const redirectFromProvider = localStorage.getItem("redirectFromProvider");

            if (nextUrl === null && redirectFromProvider === null) {
                setRedirect(true);
            } else {
                setSocialLoading(true);
            }
        }
    }, [status])

    if (redirect) return <Redirect to={redirectUrl}/>

    return (
        <div className="customer-portal d-flex-cc" style={{minHeight: "100vh"}}>
            {(socialLoading || loading) &&
                <Spin size="large" spinning={socialLoading || loading} tip={socialLoading ? "Login successful. One moment please" : "Loading..."} style={{width: "100%"}}/>}
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
