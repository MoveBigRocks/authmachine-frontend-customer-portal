import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button} from "antd";
import { Link } from "react-router-dom";

const ActivateAccount = () => (
    <div className="form-container auth-form">
        <div className="form-content">
            <img src={Logo} alt="AuthMachine" className="logo" />
            <Typography.Title level={3}>Activate Account</Typography.Title>
            <Form>
                <Form.Item>
                    <Input size="large" placeholder="Activation Code" />
                </Form.Item>
                <Form.Item style={{marginBottom: 0}}>
                    <Button type="primary" size="large" htmlType="submit">Activate Account</Button>
                </Form.Item>
            </Form>
        </div>
        <ul className="additional-actions">
            <li>Got activation code with username? <Link to="/activation-with-username">Activate account with username</Link></li>
        </ul>
    </div>
);

export default ActivateAccount;