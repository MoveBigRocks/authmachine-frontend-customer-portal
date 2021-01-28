import React from "react";
import {RemovePermissionProps} from "../../../interfaces/user";
import {Modal} from "antd";


const RemovePermission = ({visible, onCancel, removeItemId}: RemovePermissionProps) => {

    return (
        <Modal
            title="Remove Delegation"
            visible={visible}
            className="custom-modal delegate-permission"
            onCancel={onCancel}
            okText="Remove Delegation"
            // @ts-ignore
            okButtonProps={{type: "danger"}}
        >
            Do you really want to remove delegation?
        </Modal>
    )
};

export default RemovePermission;