import React from "react";
import {DelegatePermissionProps} from "../../../interfaces/user";
import {Modal, Form, Select, DatePicker, TimePicker} from "antd";
import "./DelegatePermission.scss";


const DelegatePermission = ({visible, onCancel}: DelegatePermissionProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("onFinish", values)
    };

    return (
        <Modal
            title="Delegate Permission"
            visible={visible}
            className="custom-modal delegate-permission"
            onCancel={onCancel}
            okText="Submit Delegation"
            okButtonProps={{htmlType: "submit", form: "delegate-permission"}}
        >
            <Form
                id="delegate-permission"
                layout="vertical"
                form={form}
                onFinish={onFinish}
              >
                <Form.Item label="User" name="User">
                  <Select placeholder="Select user" />
                </Form.Item>
                <Form.Item label="Permission" name="permission">
                  <Select placeholder="Select permission" />
                </Form.Item>
                <Form.Item label="Expiry Date" name="expiry date" className="sub-dates">
                    <DatePicker placeholder="Select date" />
                    <TimePicker placeholder="Select time" />
                </Form.Item>
              </Form>
        </Modal>
    )
};

export default DelegatePermission;