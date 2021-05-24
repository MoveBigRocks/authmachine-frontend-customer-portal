import React from "react";
import "./PasswordChecker.scss"
import {PasswordCheckerInterface} from "../../../interfaces/auth/passwordChecker";

const PasswordChecker = (props: PasswordCheckerInterface) => {
    return (
        <div className={(props.display ? ("password-checker") : ("disabled"))}>
            <ul className={props.level}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className={`title title-${props.level}`}>{props.level}</div>
        </div>
    )
};

export default PasswordChecker;
