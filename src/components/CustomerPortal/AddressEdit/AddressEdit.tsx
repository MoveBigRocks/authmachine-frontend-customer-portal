import React from "react";
import {AddressEditProps} from "../../../interfaces/user";
import {Modal, Form, Input, Checkbox} from "antd";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const AddressEdit = ({visible, onCancel, address, saveAddress}: AddressEditProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => saveAddress(form.getFieldsValue());

    return (
        <Modal
            title="Address Detail"
            visible={visible}
            className="custom-modal"
            onCancel={onCancel}
            okText="Save"
            okButtonProps={{htmlType: "submit", form: "address-detail"}}
        >
            <Form
                id="address-detail"
                {...formItemLayout}
                layout="horizontal"
                form={form}
                initialValues={address}
                onFinish={onFinish}
              >
                <Form.Item label="Type" name="type">
                  <Input />
                </Form.Item>
                <Form.Item label="Street Address" name="streetAddress">
                  <Input />
                </Form.Item>
                <Form.Item label="Locality" name="locality">
                  <Input />
                </Form.Item>
                <Form.Item label="Region" name="region">
                  <Input />
                </Form.Item>
                <Form.Item label="postalCode" name="postalCode">
                  <Input />
                </Form.Item>
                <Form.Item label="Country" name="country">
                  <Input />
                </Form.Item>
                <Form.Item label="Formatted" name="formatted">
                  <Input />
                </Form.Item>
                <Form.Item name="primary" valuePropName="checked">
                  <Checkbox>Primary</Checkbox>
                </Form.Item>
              </Form>
        </Modal>
    )
};

export default AddressEdit;