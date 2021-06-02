import React, {useEffect} from "react";
import {connect} from "react-redux";
import Logo from "../../staticfiles/images/logo.png"
import {RootState} from "../../redux/reducer";
import {ResetPasswordProps} from "../../interfaces/auth/resetPassword";
import {mainActions} from "../../redux/actions/mainActions";
// import BackIcon from "../../components/Icons/BackIcon/BackIcon";
// import CrossIcon from "../../components/Icons/CrossIcon/CrossIcon";
import Switcher from "../../components/Auth/Switcher/Switcher";
import FormInput from "../../components/Auth/FormInput/FormInput";
import {Link, Redirect} from "react-router-dom";
import ResetPasswordStepOne from "../../components/Auth/ResetPassword/ResetPasswordStepOne";
// import SocialAccounts from "../../components/Auth/SocialAccounts";

const ResetPassword = ({setPageTitle, step}: ResetPasswordProps) => {

    useEffect(() => setPageTitle("Password Reset"), [setPageTitle]);

    if (step === 3) {
        return <Redirect to={'/'}/>
    }

    const resetSteps = {
        0: <ResetPasswordStepOne/>,
        1: 1,
        2: 2
    }

    const getStep = (step: number) => {
        return resetSteps[step];
    }

    return (
        <div className="form-container auth-form">
            {/*<div className="head-panel">*/}
            {/*    <BackIcon display/>*/}
            {/*    <CrossIcon/>*/}
            {/*</div>*/}
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
                        {getStep(step)}
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {operationStatus, resetStep} = state.user;
    return {
        status: operationStatus,
        step: resetStep
    }
};

const mapDispatchToProps = {
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
