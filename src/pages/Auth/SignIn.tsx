import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Checkbox, Button, Alert} from "antd";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../redux/actions/userActions";
import {SignInProps} from "../../interfaces/auth/signIn";
import PrivacyPolicies from "../../components/Auth/PrivacyPolicies/PrivacyPolicies";
import SocialAccounts from "../../components/Auth/SocialAccounts";

const SignIn = ({login, isAuthenticated, message}: SignInProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        values["policies"] = Object.keys(values).filter((key: string) => key.startsWith("policy_"));
        login(values);
    };

    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <img src={Logo} alt="AuthMachine" className="logo" />
                <Typography.Title level={3}>Login</Typography.Title>
                <Form form={form} onFinish={onFinish} initialValues={{remember: false}}>
                    <Form.Item name="username"
                               rules={[{ required: true, message: "Please input your username" }]}>
                        <Input size="large" placeholder="Username" />
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
    const {isAuthenticated, message} = state.user;
    return {
        isAuthenticated,
        message,
    }
};

const mapDispatchToProps = {
    login: userActions.login,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
