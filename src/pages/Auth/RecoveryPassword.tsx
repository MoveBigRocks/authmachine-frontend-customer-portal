import React, {useEffect} from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button, Alert} from "antd";
import {RecoveryPasswordProps} from "../../interfaces/auth/recoveryPassword";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {mainActions} from "../../redux/actions/mainActions";

const {Password} = Input;

const RecoveryPassword = (props: RecoveryPasswordProps) => {
    const [form] = Form.useForm();
    const {status, message, recoveryPassword, setPageTitle} = props;
    const {token} = props.match.params;

    useEffect(() => {
        if (status) form.resetFields();
    }, [status, form]);

    useEffect(() => setPageTitle("Recovery Password"), [setPageTitle]);

    const onFinish = (values: any) => {
        if (values.password !== values.confirmPassword) {
            form.setFields([{
                name: "confirmPassword",
                errors: ["Please check the passwords, values don't match"],
            }])
        }
        values = Object.assign({token}, values);
        recoveryPassword(values);
    }

    return (
        <div className="form-container">
            <div className="text-center">
                <img src={Logo} alt="AuthMachine" className="logo" />
            </div>
            <Typography.Title level={3}>New Password</Typography.Title>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="password"
                           rules={[{ required: true, message: "Please input new password" }]}>
                    <Password size="large" placeholder="Enter new password" />
                </Form.Item>
                <Form.Item name="confirmPassword"
                           rules={[{ required: true, message: "Please input confirm password" }]}>
                    <Password size="large" placeholder="Confirm new password" />
                </Form.Item>
                <Form.Item style={{marginBottom: 0}}>
                    <Button type="primary" size="large" htmlType="submit">Submit New Password</Button>
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
    recoveryPassword: userActions.recoveryPassword,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecoveryPassword);
