import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ChangePasswordProps} from "../../../interfaces/customerPortal/changePassword";
import {Typography, Form, Input, Button, Col, Row} from "antd";
import {PasswordInput} from "antd-password-input-strength";
import {mainActions} from "../../../redux/actions/mainActions";
import {usersActions} from "../../../redux/actions/usersActions";
import {RootState} from "../../../redux/reducer";

const {Password} = Input;

const passwordInputSettings = {
    height: 5,
    alwaysVisible: true,
    colorScheme: {
        levels: Array(5).fill("#1890ff"),
        noLevel: "lightgrey",
    },
};

const ChangePassword = ({setPageTitle, changePassword, status}: ChangePasswordProps) => {
    const [form] = Form.useForm();

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const onFinish = () => changePassword(oldPass, newPass);

    useEffect(() => setPageTitle("Change Password"), [setPageTitle]);

    useEffect(() => {
        if (status) form.resetFields();
    }, [status, form]);

    return (
        <>
            <Typography.Title level={4} style={{marginBottom: "1.5rem"}}>Change Password</Typography.Title>
            <Row style={{maxWidth: 800}}>
                <Col md={24} lg={14}>
                    <Form layout="vertical" onFinish={onFinish} form={form}>
                        <Form.Item label="Old Password" name="oldPassword"
                                   rules={[{
                                       required: true,
                                       message: "Please input your old password",
                                   }]}>
                            <Password placeholder="Enter old password"
                                      value={oldPass}
                                      onChange={e => setOldPass(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="New Password" name="newPassword"
                                   rules={[{
                                       required: true,
                                       message: "Please input your new password",
                                   }]}>
                            <PasswordInput settings={passwordInputSettings}
                                           inputProps={{value: newPass}}
                                           onChange={e => setNewPass(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Confirm Password" name="confirmPassword"
                                   dependencies={['newPassword']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: "Please confirm your new password",
                                       },
                                       ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                       }),
                                   ]}>
                            <Password placeholder="Confirm new password"
                                      value={confirmPass}
                                      onChange={e => setConfirmPass(e.target.value)} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save New Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    const {operationStatus} = state.users;
    return { status: operationStatus };
};


const mapDispatchToProps = {
    changePassword: usersActions.changeCurrentUserPassword,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

