import React, {useEffect} from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Checkbox, Button, Alert} from "antd";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../redux/actions/userActions";
import {SignInProps} from "../../interfaces/auth/signIn";
import PrivacyPolicies from "../../components/Auth/PrivacyPolicies/PrivacyPolicies";
import SocialAccounts from "../../components/Auth/SocialAccounts";
import {mainActions} from "../../redux/actions/mainActions";

const SignIn = (props: SignInProps) => {
    const {login, isAuthenticated, message, setPageTitle, systemInfo, setSystemInformation} = props;
    const [form] = Form.useForm();

    useEffect(() => setPageTitle("Sign In"), [setPageTitle]);

    const onFinish = (values: any) => {
        let nextUrl = new URLSearchParams(props.location.search).get("next");
        if (nextUrl && process.env.REACT_APP_SERVER_URL) nextUrl = nextUrl.substr(nextUrl.indexOf('/', 7));
        values["policies"] = Object.keys(values).filter((key: string) => key.startsWith("policy_"));
        login(values, nextUrl);
    };

    useEffect(() => {
        return () => setSystemInformation({
            show: false,
            success: false,
            title: "",
            description: "",
        })
    }, [setSystemInformation]);

    useEffect(() => {
        let nextUrl = new URLSearchParams(props.location.search).get("next");
        if (nextUrl) localStorage.setItem("nextUrl", nextUrl);
        return () => {
            localStorage.removeItem("nextUrl");
        }
    }, [props.location])

    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <div className="text-center">
                    <img src={Logo} alt="AuthMachine" className="logo" />
                </div>

                {systemInfo.show && (
                    <div style={{marginBottom: 20}}>
                        <Alert
                          style={{width: "100%"}}
                          message={systemInfo.title}
                          description={systemInfo.description}
                          type={systemInfo.success ? "success" : "error"}
                          showIcon
                        />
                    </div>
                )}

                <Typography.Title level={3}>Login</Typography.Title>
                <Form form={form} onFinish={onFinish} initialValues={{remember: false}}>
                    <Form.Item name="username"
                               rules={[{ required: true, message: "Please input your username" }]}>
                        <Input size="large" placeholder="Username or Email" />
                    </Form.Item>
                    <Form.Item name="password"
                               rules={[{ required: true, message: "Please input your password" }]}>
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>

                    <PrivacyPolicies form={form} formType="login" />

                    <Form.Item name="remember" valuePropName="checked" className="space-between">
                        <Checkbox>Remember me</Checkbox>
                        <Link to="/reset-password">Forgot password?</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Login</Button>
                    </Form.Item>
                    {(!isAuthenticated && message !== "") && <Alert message={message} type="error" showIcon />}
                </Form>

                <SocialAccounts type="login" />
            </div>
            <ul className="additional-actions">
                <li>Don't have account? <Link to="/registration">Create account</Link></li>
                <li>Got activation code? <Link to="/activation">Activate your account</Link></li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    const {isAuthenticated, loginMessage} = state.user;
    const {systemInfo} = state.main;
    return {
        isAuthenticated,
        message: loginMessage,
        systemInfo,
    }
};

const mapDispatchToProps = {
    login: userActions.login,
    setPageTitle: mainActions.setPageTitle,
    setSystemInformation: mainActions.setSystemInformation,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
