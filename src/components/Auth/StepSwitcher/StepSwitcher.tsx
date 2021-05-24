import React from "react";
import "./StepSwitcher.scss"
import StepSwitcherProps from "../../../interfaces/auth/stepWidget";

const doneIcon = () => {
    return (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.1437 0.25H13.8955C13.7205 0.25 13.5544 0.330357 13.4473 0.467857L6.08478 9.79464L2.55442 5.32143C2.50101 5.25362 2.43294 5.1988 2.35531 5.16106C2.27768 5.12333 2.19252 5.10368 2.1062 5.10357H0.85799C0.738347 5.10357 0.672275 5.24107 0.74549 5.33393L5.63656 11.5304C5.86513 11.8196 6.30442 11.8196 6.53478 11.5304L15.2562 0.478571C15.3294 0.3875 15.2633 0.25 15.1437 0.25Z"
                fill="#1890FF"/>
        </svg>
    )
}

function StepTemplate({step,description, valid}: any){
    return <div className="step-wrapper">
        {valid ? (
            <div className="full-blue-border-wrapper"/>
        ) :( <div className="grey-border-wrapper">
                <div className="blue-border-wrapper"/>
                <div className="content-wrapper">{step}</div>
            </div>)
          }
        <div className="step-description">{description}</div>
    </div>
}

const StepWidget = ({first, second, third}: StepSwitcherProps) => {
    return (
        <div className="container">

            <div className="steps-bar-wrapper">
                <div className="steps-content-wrapper">
                    <StepTemplate step='1' description='Name & Email' valid={first}/>
                    <div className="grey-line"/>
                    <StepTemplate step='2' description='Email Verification' valid={second}/>
                    <div className="grey-line"/>
                    <StepTemplate step='3' description='Username & Password' valid={third}/>
                </div>
            </div>
        </div>
    )
};

export default StepWidget;
