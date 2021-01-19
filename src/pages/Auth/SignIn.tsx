import React, {useEffect} from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Checkbox, Button, Alert} from "antd";
import { Link } from "react-router-dom";
import Github from "../../staticfiles/images/social-icons/github.svg";
import Twitter from "../../staticfiles/images/social-icons/twitter.svg";
import Facebook from "../../staticfiles/images/social-icons/facebook.svg";
import {connect} from "react-redux";
import {userActions} from "../../redux/actions/userActions";
import {SignInProps} from "../../interfaces/auth/signIn";
import {usersActions} from "../../redux/actions/usersActions";

const SignIn = ({login, isAuthenticated, message, socials, getSocials}: SignInProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => login(values);

    useEffect(() => {
        getSocials();
    }, [getSocials]);


    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <img src={Logo} alt="AuthMachine" className="logo" />
                <Typography.Title level={3}>Login</Typography.Title>
                <Form form={form} onFinish={onFinish} initialValues={{remember: false}}>
                    <Form.Item name="username"
                               rules={[{ required: true, message: 'Please input your username' }]}>
                        <Input size="large" placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password"
                               rules={[{ required: true, message: 'Please input your password' }]}>
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" className="space-between">
                        <Checkbox>Remember me</Checkbox>
                        <Link to="/reset-password">Forgot password?</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Login</Button>
                    </Form.Item>
                    {(!isAuthenticated && message !== "") && <Alert message={message} type="error" showIcon />}
                </Form>
                <div className="socials">
                    {socials.map(s => (
                        <Button size="large"><img src="" alt=""/>Login with {s.name}</Button>
                    ))}
                </div>
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
    const {socials} = state.users;
    return {
        isAuthenticated,
        message,
        socials,
    }
};

const mapDispatchToProps = {
    login: userActions.login,
    getSocials: usersActions.getSocials,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
