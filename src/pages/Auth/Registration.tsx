import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button} from "antd";
import { Link } from "react-router-dom";
import SocialAccounts from "../../components/Auth/SocialAccounts";

const Registration = () => (
    <div className="form-container auth-form">
        <div className="form-content">
            <img src={Logo} alt="AuthMachine" className="logo" />
            <Typography.Title level={3}>Create Account</Typography.Title>
            <Form>
                <Form.Item>
                    <Input size="large" placeholder="Username" />
                </Form.Item>
                <Form.Item>
                    <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item>
                    <Input.Password size="large" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit">Create Account</Button>
                </Form.Item>
            </Form>

            <SocialAccounts type="register" />
        </div>
        <ul className="additional-actions">
            <li>Already have account? <Link to="/">Log In</Link></li>
        </ul>
    </div>
);

export default Registration;