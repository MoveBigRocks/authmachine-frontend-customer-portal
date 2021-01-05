import alertTypes from "../types/alertTypes";
import { notification } from "antd";

function success(message: string) {
    notification.success({
      message: "Success!",
      description: message
    });
    return { type: alertTypes.ALERT_SUCCESS, message };
}

function error(message: string) {
    if ("string" !== typeof (message)) {
        message = String(message);
    }
    notification.error({
      message: "Error!",
      description: message
    });
    return { type: alertTypes.ALERT_ERROR, message };
}

function clear() {
    return { type: alertTypes.ALERT_CLEAR };
}

export const alertActions = {
    success,
    error,
    clear
};