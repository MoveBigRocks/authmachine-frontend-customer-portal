import React from "react";
import "./MessageLabel.scss";
import {MessageInterface} from "../../../interfaces/auth/messageLabelInterface";
import ErrorIcon from "../../Icons/ErrorIcon/ErrorIcon";

const MessageLabel = (props: MessageInterface) => {
    if (props.level === "error") {
        return (
            <div className="error">
                <><ErrorIcon/> {props.message}</>
            </div>
        )
    } else {
        return (
            <div className="message-label">
                <div className={props.level}>
                    {props.message}
                </div>
            </div>
        )
    }

};

export default MessageLabel
