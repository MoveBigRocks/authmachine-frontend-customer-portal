import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {userActions} from "../../../redux/actions/userActions";
import {Form, Checkbox, Button, Modal} from "antd";
import {PrivacyPoliciesProps, PrivacyPolicy} from "../../../interfaces/auth/privacyPolicy";
import { RuleObject } from "antd/lib/form";
import parse from "html-react-parser";

const PrivacyPolicies = ({policies, getPrivacyPolicyList, form, formType}: PrivacyPoliciesProps) => {
    const [modalText, setModalText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => getPrivacyPolicyList(), [getPrivacyPolicyList]);
    policies.sort((a: PrivacyPolicy, b: PrivacyPolicy) =>
        b.acceptOnActivation.localeCompare(a.acceptOnActivation));

    const validation = (rule: RuleObject, value: any, callback: (error?: string) => void) => {
        if(value) return callback();
        return callback("Please accept the terms and conditions");
    };

    const onClickPolicy = (policy: {title: string, htmlBody: string}) => {
        setModalText(policy.htmlBody);
        setShowModal(true);
        setModalTitle(policy.title);
    };

    const hideModal = () => setShowModal(false);

    if (policies.length > 0) {
        return (
            <>
                {policies.map(p => {
                    const required = p[formType === "activation" ? "acceptOnActivation" : "acceptOnLogin"] === "implicit";
                    const name = `policy_${p.id}`;
                    if (required) form.setFieldsValue({[name]: required});
                    return (
                        <Form.Item name={name} key={p.id}
                                   className="fs-15"
                                   valuePropName="checked"
                                   style={{marginBottom: 5}}
                                   rules={[{validator: validation}]}>
                            <Checkbox disabled={required}>I accept the&nbsp;
                                <Button type="link"
                                        onClick={() => onClickPolicy(p)}
                                        style={{padding: 0, fontSize: 15}}>{p.title}</Button>
                            </Checkbox>
                        </Form.Item>
                    )
                })}
                <Modal title={modalTitle}
                       visible={showModal}
                       onCancel={hideModal}
                       footer={[
                           <Button key="submit" type="primary" onClick={hideModal}>
                               Ok
                           </Button>,
                       ]}>
                    {parse(modalText)}
                  </Modal>
            </>
        )
    } else {
        return null;
    }

};

const mapStateToProps = (state: RootState) => {
    const {policies} = state.user;
    return {
        policies,
    }
};

const mapDispatchToProps = {
    getPrivacyPolicyList: userActions.getPrivacyPolicyList,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyPolicies);
