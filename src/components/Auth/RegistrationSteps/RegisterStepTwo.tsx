import React, {useEffect, useState} from "react";
import {Form, Input} from "antd";
import {Button} from "antd";
import MessageLabel from "../MessageLabel/MessageLabel";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../../redux/actions/userActions";
import {RegisterStepTwoProps} from "../../../interfaces/auth/registration";


const RegisterStepTwo = ({id, register, isRegister, message, changeMessage, status}: RegisterStepTwoProps) => {
    const [form] = Form.useForm();
    const [code, setCode] = useState('      ');

    const onFinish = () => {
        if (validate(code)) {
            register({activationCode: code, id});
        } else {
            changeMessage("Activation code is incorrect!");
        }
    };

    const autoFocus = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.nextElementSibling) {
            (e.currentTarget.nextElementSibling as HTMLInputElement).focus();
        }
    };

    const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 1) {
            setCode(code.substr(0, Number.parseInt(e.currentTarget.id)) + e.currentTarget.value[0] + code.substr(Number.parseInt(e.currentTarget.id) + 1));
            form.setFieldsValue({code: code});
        } else if (e.currentTarget.value.length === 0) {
            setCode(code.substr(0, Number.parseInt(e.currentTarget.id)) + ' ' + code.substr(Number.parseInt(e.currentTarget.id) + 1));
            form.setFieldsValue({code: code});
        } else {
            setCode(code.substr(0, Number.parseInt(e.currentTarget.id)) + e.currentTarget.value + code.substr(Number.parseInt(e.currentTarget.id) + 1));
            form.setFieldsValue({code: code});
            autoFocus(e);
        }
    };

    const validate = (value: string) => {
        return value.length === 6 && Number.parseInt(value);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            {message !== "" ? (
                <MessageLabel level={isRegister ? "success" : "error"} message={message}/>
            ) : <MessageLabel
                level="info"
                message="Please check your email for six digit verification code"
            />}
            <Form.Item name="code"
                       rules={[{required: true, message: "Type your code"}]}>
                <div className="form-title">Six digits code</div>

                <Form.Item className="space-between">
                    <Input id={"0"} type="number" autoFocus={true} size="large" className="digit-field" max={9} min={0}
                           maxLength={1} onChange={inputChange} value={code[0]}/>
                    <Input id={"1"} type="number" size="large" className="digit-field" max={9} min={0} maxLength={1}
                           onChange={inputChange} value={code[1]}/>
                    <Input id={"2"} type="number" size="large" className="digit-field" max={9} min={0} maxLength={1}
                           onChange={inputChange} value={code[2]}/>
                    <Input id={"3"} type="number" size="large" className="digit-field" max={9} min={0} maxLength={1}
                           onChange={inputChange} value={code[3]}/>
                    <Input id={"4"} type="number" size="large" className="digit-field" max={9} min={0} maxLength={1}
                           onChange={inputChange} value={code[4]}/>
                    <Input id={"5"} type="number" size="large" className="digit-field" max={9} min={0} maxLength={1}
                           onChange={inputChange} value={code[5]}/>
                </Form.Item>

                <div className="form-context-q">
                    Didn’t recieve the code? <Link to="/">Resend it</Link>
                </div>

            </Form.Item>
            <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" size="large" htmlType="submit">Verify</Button>
            </Form.Item>
        </Form>
    );

};

const mapStateToProps = (state: any) => {
    const {registerMessage, isRegister, id, status} = state.user;
    return {
        message: registerMessage,
        isRegister,
        id,
        status
    };
};

const mapDispatchToProps = {
    register: userActions.registerStepTwo,
    changeMessage: userActions.changeMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepTwo);
