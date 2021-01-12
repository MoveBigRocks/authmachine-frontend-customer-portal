import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button} from "antd";
import { Link } from "react-router-dom";
import Github from "../../staticfiles/images/social-icons/github.svg";
import Twitter from "../../staticfiles/images/social-icons/twitter.svg";
import Facebook from "../../staticfiles/images/social-icons/facebook.svg";

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
            <div className="socials">
                <Button size="large">
                    <img src={Facebook} alt="facebook"/>Sign up with Facebook
                </Button>
                <Button size="large">
                    <img src={Twitter} alt="twitter"/>Sign up with Twitter
                </Button>
                <Button size="large">
                    <img src={Github} alt="github"/>Sign up with GitHub
                </Button>
            </div>
        </div>
        <ul className="additional-actions">
            <li>Already have account? <Link to="/">Log In</Link></li>
        </ul>
    </div>
);

export default Registration;