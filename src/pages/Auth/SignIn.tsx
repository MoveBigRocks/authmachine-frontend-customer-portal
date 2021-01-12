import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Checkbox, Button} from "antd";
import { Link } from "react-router-dom";
import Github from "../../staticfiles/images/social-icons/github.svg";
import Twitter from "../../staticfiles/images/social-icons/twitter.svg";
import Facebook from "../../staticfiles/images/social-icons/facebook.svg";

const SignIn = () => (
    <div className="form-container auth-form">
        <div className="form-content">
            <img src={Logo} alt="AuthMachine" className="logo" />
            <Typography.Title level={3}>Login</Typography.Title>
            <Form>
                <Form.Item>
                    <Input size="large" placeholder="Username" />
                </Form.Item>
                <Form.Item>
                    <Input.Password size="large" placeholder="Password" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" className="space-between">
                    <Checkbox>Remember me</Checkbox>
                    <Link to="/reset-password">Forgot password?</Link>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
            <div className="socials">
                <Button size="large">
                    <img src={Facebook} alt="facebook"/>Login with Facebook
                </Button>
                <Button size="large">
                    <img src={Twitter} alt="twitter"/>Login with Twitter
                </Button>
                <Button size="large">
                    <img src={Github} alt="github"/>Login with GitHub
                </Button>
            </div>
        </div>
        <ul className="additional-actions">
            <li>Don't have account? <Link to="/registration">Create account</Link></li>
            <li>Got activation code? <Link to="/activation">Activate your account</Link></li>
        </ul>
    </div>
);

export default SignIn;