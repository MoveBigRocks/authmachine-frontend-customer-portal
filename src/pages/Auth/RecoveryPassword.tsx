import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button} from "antd";

const {Password} = Input;

const RecoveryPassword = () => (
    <div className="form-container">
        <img src={Logo} alt="AuthMachine" className="logo" />
        <Typography.Title level={3}>New Password</Typography.Title>
        <Form>
            <Form.Item>
                <Password size="large" placeholder="Enter new password" />
            </Form.Item>
            <Form.Item>
                <Password size="large" placeholder="Confirm new password" />
            </Form.Item>
            <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" size="large" htmlType="submit">Submit New Password</Button>
            </Form.Item>
        </Form>
    </div>
);

export default RecoveryPassword;