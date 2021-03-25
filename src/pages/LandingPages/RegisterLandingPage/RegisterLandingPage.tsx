import React, {useEffect, useState} from "react";
import Logo from "../../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button, Alert, Row, Col, Select} from "antd";
import {userActions} from "../../../redux/actions/userActions";
import {connect} from "react-redux";
import {RegistrationProps} from "../../../interfaces/auth/registration";
import {mainActions} from "../../../redux/actions/mainActions";
import "./RegisterLandingPage.scss";
import CustomSocialAccounts from "../CustomSocialAccounts/CustomSocialAccounts";
import Countries from "../countries.json";

const {Option} = Select;

const RegisterLandingPage = ({message, isRegister, register, setPageTitle}: RegistrationProps) => {
    const [formErrors, setFormErrors] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      values["additionalRegistrationData"] = Object.assign({}, values);
      register(values);
    };

    useEffect(() => setPageTitle("Start Free 30-Day Trial - OpenUnited"), [setPageTitle])

    useEffect(() => {
        let formErrors: import("rc-field-form/es/interface").FieldData[] | { name: string; errors: any[]; }[] = [];
        try {
            let errors = JSON.parse(message);
            let hasError = false;
            Object.keys(errors).map((key: string) => {
                if (errors.hasOwnProperty(key)) {
                    formErrors.push({
                        name: key,
                        errors: [errors[key][0].message],
                    });
                    hasError = true;
                }
                return key;
            })
            if (hasError) setFormErrors(true);
            form.setFields(formErrors);
        } catch (Exception) {
            setFormErrors(false);
        }
    }, [form, message]);

    return (
        <div className="form-container register-landing-page-container">
            <div className="form-content">
                <Row>
                    <Col md={16} sm={12} xs={24} className="t-container">
                        <div className="t-text-container">
                            <img src={Logo} alt="AuthMachine" className="logo" />
                            <Typography.Title level={4}>Change the world, change your life</Typography.Title>
                            <Typography.Title level={5} style={{marginBottom: "1em"}}>
                                Contribute to Open Products
                            </Typography.Title>
                            <p style={{fontSize: "1rem"}}>Contribute and showcase your skills. Join the
                                communities building the products you love and use.
                            </p>
                            <p style={{fontSize: "1rem"}}>Improve your skills and get the recognition you deserve. Expand
                                your professional network and discover new career opportunities.</p>
                            <img alt="man"
                                 src="https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>
                        </div>
                    </Col>
                    <Col md={8} sm={12} xs={24} className="f-container">
                        <div className="f-form-container">
                            <div className="text-center">
                                <Typography.Title level={3} style={{marginBottom: 0}}>Join Now</Typography.Title>
                            </div>
                            <CustomSocialAccounts />
                            <div className="">
                                <div className="title-wrapper text-center">
                                    <span className="line"/>
                                     <Typography.Title level={5} style={{marginBottom: 0}}>OR</Typography.Title>
                                    <span className="line"/>
                                </div>
                                <Typography.Title level={5} className="text-center">
                                    Enter your details:
                                </Typography.Title>

                                <Form form={form} onFinish={onFinish}>
                                    <Form.Item name="fullName"
                                               rules={[
                                                   { required: true, message: "Please input your full name" }
                                               ]}>
                                        <Input placeholder="Full name" />
                                    </Form.Item>
                                    <Form.Item name="email"
                                               rules={[{ required: true, message: "Please input your email" }]}>
                                        <Input placeholder="Email" type="email" />
                                    </Form.Item>
                                    <Form.Item name="employees"
                                               rules={[{ required: true, message: "Please select your country" }]}>
                                        <Select placeholder="Country">
                                            {Countries.map((c: {country: string}, index: number) =>
                                              <Option value={c.country} key={index}>{c.country}</Option>)}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button size="large" htmlType="submit" className="join-btn">Join Now</Button>
                                    </Form.Item>
                                    {(!formErrors && message !== "") && <Alert style={{marginTop: 20}}
                                                                               message={message}
                                                                               type={isRegister ? "success" : "error"}
                                                                               showIcon />}
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
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
)(RegisterLandingPage);
