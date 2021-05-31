import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Typography, Button, Alert, Checkbox} from "antd";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {ResetPasswordProps} from "../../interfaces/auth/resetPassword";
import {mainActions} from "../../redux/actions/mainActions";
import BackIcon from "../../components/Icons/BackIcon/BackIcon";
import CrossIcon from "../../components/Icons/CrossIcon/CrossIcon";
import Switcher from "../../components/Auth/Switcher/Switcher";
import FormInput from "../../components/Auth/FormInput/FormInput";
import {Link, Redirect} from "react-router-dom";
import SocialAccounts from "../../components/Auth/SocialAccounts";

const ResetPassword = ({status, resetPassword, setPageTitle}: ResetPasswordProps) => {
    const [form] = Form.useForm();
    const [done, setDone] = useState(false);

    const onFinish = (values: any) => resetPassword(values);

    useEffect(() => setPageTitle("Password Recovery"), [setPageTitle]);

    useEffect(() => {
        if (status) {
            form.resetFields();
            setDone(true);
        }
    }, [status, form]);

    if (done) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className="form-container auth-form">
            <div className="head-panel">
                <BackIcon display/>
                <CrossIcon/>
            </div>
            <div className="form-content">
                <div className="text-center">
                    <img src={Logo} alt="AuthMachine" className="logo"/>
                </div>
                <div>
                    <div className="space-between sign-type-panel">
                        <Switcher link="/" active title="Sign In"/>
                        <Switcher link="/register" title="Register"/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item className="text-center">
                                <Typography.Text>
                                    In order to reset your password, <br/>
                                    you need to enter your username or email.
                                </Typography.Text>
                            </Form.Item>
                            <Typography.Title level={3} style={{marginBottom: 25}}>Password Recovery</Typography.Title>
                            <Form.Item name="username"
                                       rules={[{required: true, message: "Please input your username"}]}>

                                <FormInput label="Username or Email" type="text" name="username"
                                           placeholder="Username or Email"/>
                            </Form.Item>
                            <Form.Item>
                                <div className="form-context-q">
                                    Didn't recieve the recovery link? <Link to="/registration">Resend it</Link>
                                </div>
                            </Form.Item>

                            <Form.Item style={{marginBottom: 0}}>
                                <Button type="primary" size="large" htmlType="submit">Confirm</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {operationStatus} = state.user;
    return {
        status: operationStatus,
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
