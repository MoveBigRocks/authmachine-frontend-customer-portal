import React, {useEffect, useState} from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button, Alert} from "antd";
import { Link } from "react-router-dom";
import SocialAccounts from "../../components/Auth/SocialAccounts";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {RegistrationProps} from "../../interfaces/auth/registration";
import {mainActions} from "../../redux/actions/mainActions";

const Registration = ({message, isRegister, register, setPageTitle}: RegistrationProps) => {
    const [formErrors, setFormErrors] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values: any) => register(values);

    useEffect(() => setPageTitle("Registration"), [setPageTitle])

    useEffect(() => {
        let formErrors = [];
        try {
            let errors = JSON.parse(message);
            if (errors.hasOwnProperty("username")) {
                formErrors.push({
                    name: "username",
                    errors: [errors.username[0].message],
                })
                setFormErrors(true);
            }
            if (errors.hasOwnProperty("email")) {
                formErrors.push({
                    name: "email",
                    errors: [errors.email[0].message],
                })
            }
            setFormErrors(true);
            form.setFields(formErrors);
        } catch (Exception) {
            setFormErrors(false);
        }
    }, [form, message]);

    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <img src={Logo} alt="AuthMachine" className="logo" />
                <Typography.Title level={3}>Create Account</Typography.Title>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="username"
                               rules={[{ required: true, message: "Please input your username" }]}>
                        <Input size="large" placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email"
                               rules={[{ required: true, message: "Please input your email" }]}>
                        <Input size="large" placeholder="Email" type="email" />
                    </Form.Item>
                    {/*<Form.Item>*/}
                    {/*    <Input.Password size="large" placeholder="Password" />*/}
                    {/*</Form.Item>*/}
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Create Account</Button>
                    </Form.Item>
                    {(!formErrors && message !== "") && <Alert style={{marginTop: 20}}
                                                               message={message}
                                                               type={isRegister ? "success" : "error"}
                                                               showIcon />}
                </Form>

                <SocialAccounts type="register" />
            </div>
            <ul className="additional-actions">
                <li>Already have account? <Link to="/">Log In</Link></li>
            </ul>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const {registerMessage, isRegister} = state.user;
    return {
        message: registerMessage, isRegister
    }
};

const mapDispatchToProps = {
    register: userActions.register,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
