import React, {useEffect} from "react";
import {connect} from "react-redux";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button, Alert} from "antd";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import { ResetPasswordProps } from "../../interfaces/auth/resetPassword";
import {mainActions} from "../../redux/actions/mainActions";

const ResetPassword = ({status, message, resetPassword, setPageTitle}: ResetPasswordProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => resetPassword(values);

    useEffect(() => setPageTitle("Password Recovery"), [setPageTitle]);

    useEffect(() => {
        if (status) form.resetFields();
    }, [status, form]);

    return (
        <div className="form-container">
            <div className="text-center">
                <img src={Logo} alt="AuthMachine" className="logo" />
            </div>
            <Typography.Title level={3}>Password Recovery</Typography.Title>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="username"
                           rules={[{ required: true, message: "Please input your username" }]}>
                    <Input size="large" placeholder="Username or email" />
                </Form.Item>
                <Form.Item style={{marginBottom: 0}}>
                    <Button type="primary" size="large" htmlType="submit">Send Recovery Link</Button>
                </Form.Item>
                {(!status && message !== "") && <Alert style={{marginTop: 20}} message={message} type="error" showIcon />}
                {(status && message !== "") && <Alert style={{marginTop: 20}} message={message} type="success" showIcon />}
            </Form>
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
    resetPassword: userActions.resetPassword,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);