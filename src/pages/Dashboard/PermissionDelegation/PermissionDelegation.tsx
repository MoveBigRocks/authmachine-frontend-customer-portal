import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {Typography, Table, Button} from "antd";
import {eventActions} from "../../../redux/actions/eventActions";
import helpers from "../../../helpers";
import {mainActions} from "../../../redux/actions/mainActions";
import {UserAddOutlined} from "@ant-design/icons";
import {PermissionDelegationProps} from "../../../interfaces/customerPortal/permissionDelegation";
import DelegatePermission from "../../../components/CustomerPortal/DelegatePermission/DelegatePermission";
import RemovePermission from "../../../components/CustomerPortal/RemovePermission/RemovePermission";

const getTableColumns = () => {
    return [
        {
            title: 'Permission',
            dataIndex: 'createdAt',
            render: (text: string) => helpers.getEventDateTime(text),
        },
        {
            title: 'Delegate to',
            dataIndex: 'type',
            render: (text: string) => (
                <>

                </>
            ),
        },
        {
            title: 'Expires',
            dataIndex: 'type',
            render: (text: string) => (
                <>

                </>
            ),
        },
        {
            title: '',
            dataIndex: 'device',
            render: (text: any) => text.identifier,
        },
    ];
};

export const PermissionDelegation = ({permissions, getPermissions, setPageTitle}: PermissionDelegationProps) => {
    const [addModal, setAddModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    // const [removeItem, setRemoveItem] = useState(null);

    // useEffect(() => getEvents({}), [getEvents]);

    const hideAddModal = () => setAddModal(!addModal);
    const hideRemoveModal = () => setRemoveModal(!removeModal);

    useEffect(() => setPageTitle("Permission Delegation"), [setPageTitle]);

    return (
        <div className="recent-activity">
            <Typography.Title level={4} className="d-flex-justify" style={{marginBottom: "0.5rem"}}>
                Permission Delegation
                <Button icon={<UserAddOutlined />}
                        type="primary"
                        size="large"
                        onClick={hideAddModal}>Delegate</Button>
            </Typography.Title>

            <Table columns={getTableColumns()}
                   dataSource={permissions}
                   pagination={false}
                   rowKey="id"
                   style={{paddingTop: 20}} />

            <DelegatePermission visible={addModal} onCancel={hideAddModal} />
            <RemovePermission visible={removeModal} onCancel={hideRemoveModal} removeItemId={null} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    const {events, page, pageSize, total} = state.event;
    return {
        events,
        page,
        pageSize,
        total,
    }
};

const mapDispatchToProps = {
    getEvents: eventActions.getEvents,
    setPageTitle: mainActions.setPageTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionDelegation);