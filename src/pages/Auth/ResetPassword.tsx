import React from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button} from "antd";

const ResetPassword = () => (
    <div className="form-container">
        <img src={Logo} alt="AuthMachine" className="logo" />
        <Typography.Title level={3}>Password Recovery</Typography.Title>
        <Form>
            <Form.Item>
                <Input size="large" placeholder="Username or email" />
            </Form.Item>
            <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" size="large" htmlType="submit">Send Recovery Link</Button>
            </Form.Item>
        </Form>
    </div>
);

export default ResetPassword;