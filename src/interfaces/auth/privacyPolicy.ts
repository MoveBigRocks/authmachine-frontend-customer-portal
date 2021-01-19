export interface PrivacyPolicy {
    id: string,
    title: string,
    htmlBody: string,
    acceptOnActivation: string,
    acceptOnLogin: string,
}

export interface PrivacyPoliciesProps {
    policies: PrivacyPolicy[],
    getPrivacyPolicyList: () => void,
    form: any,
    formType: string,
}