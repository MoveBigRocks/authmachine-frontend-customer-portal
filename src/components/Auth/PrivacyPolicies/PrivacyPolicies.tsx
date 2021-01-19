import React, {useEffect} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {userActions} from "../../../redux/actions/userActions";
import {Form, Checkbox} from "antd";
import {PrivacyPoliciesProps, PrivacyPolicy} from "../../../interfaces/auth/privacyPolicy";
import { RuleObject } from "antd/lib/form";

const PrivacyPolicies = ({policies, getPrivacyPolicyList, form, formType}: PrivacyPoliciesProps) => {

    useEffect(() => getPrivacyPolicyList(), [getPrivacyPolicyList]);
    policies.sort((a: PrivacyPolicy, b: PrivacyPolicy) =>
        b.acceptOnActivation.localeCompare(a.acceptOnActivation));

    const validation = (rule: RuleObject, value: any, callback: (error?: string) => void) => {
        if(value) return callback();
        return callback("Please accept the terms and conditions");
    };

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
                            <Checkbox disabled={required}>I accept the {p.title}</Checkbox>
                        </Form.Item>
                    )
                })}
            </>
        )
    } else {
        return <></>
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
