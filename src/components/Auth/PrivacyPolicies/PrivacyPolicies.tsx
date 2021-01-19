import React, {useEffect} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {userActions} from "../../../redux/actions/userActions";
import {Form, Checkbox} from "antd";
import {PrivacyPoliciesProps, PrivacyPolicy} from "../../../interfaces/auth/privacyPolicy";

const PrivacyPolicies = ({policies, getPrivacyPolicyList, form}: PrivacyPoliciesProps) => {

    useEffect(() => getPrivacyPolicyList(), [getPrivacyPolicyList]);
    policies.sort((a: PrivacyPolicy, b: PrivacyPolicy) =>
        b.acceptOnActivation.localeCompare(a.acceptOnActivation));

    if (policies.length > 0) {
        return (
            <>
                {policies.map(p => {
                    const required = p.acceptOnActivation === "implicit";
                    const name = `policy_${p.id}`;
                    if (required) form.setFieldsValue({[name]: required});
                    return (
                        <Form.Item name={name} key={p.id}
                                   valuePropName="checked"
                                   style={{marginBottom: 10}}
                                   rules={[{ required: true, message: "Please accept the policy" }]}>
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
