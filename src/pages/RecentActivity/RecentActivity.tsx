import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {RootState} from "../../redux/reducer";
import {Typography, Select, DatePicker, Pagination, Table} from "antd";
import {RecentActivityProps} from "../../interfaces/customerPortal/recentActivity";
import {eventActions} from "../../redux/actions/eventActions";
import helpers from "../../helpers";
import "./RecentActivity.scss";
import {mainActions} from "../../redux/actions/mainActions";

const eventTypes = [
    {value: "all", title: "All events"},
    {value: "login", title: "Login"},
    {value: "logout", title: "Logout"},
    {value: "user_activation", title: "User Activation"},
    {value: "user_creation", title: "User Creation"},
    {value: "password_reset", title: "Password Reset"},
    {value: "one_time_login", title: "One Time Login"},
];

const getTableColumns = () => {
    return [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (text: string) => helpers.getEventDateTime(text),
        },
        {
            title: 'Event',
            dataIndex: 'type',
            render: (text: string) => (
                <>
                    <img src={helpers.getEventIcon(text)} alt={text} style={{height: 22, marginRight: 5}} />
                    {helpers.getTitleWithUpper(text)}
                </>
            ),
        },
        {
            title: 'Device',
            dataIndex: 'device',
            render: (text: any) => text.identifier,
        },
    ];
};

export const RecentActivity = ({events, page, pageSize, total, getEvents, setPageTitle}: RecentActivityProps) => {
    const [eventType, setEventType] = useState<string>("all");
    const [date, setDate] = useState<null | string[]>(null);

    useEffect(() => getEvents({}), [getEvents]);

    useEffect(() => setPageTitle("Recent Activity"), [setPageTitle]);

    return (
        <div className="recent-activity">
            <Typography.Title level={4} style={{marginBottom: "1.5rem"}}>Recent Activity</Typography.Title>
            Event:
            <Select
                style={{ width: 200, marginLeft: 10, marginRight: 20 }}
                placeholder="Select an event"
                onChange={(eventType: string) => {
                    setEventType(eventType);
                    getEvents({eventType});
                }}
                value={eventType}
              >
                {eventTypes.map(event => <Select.Option value={event.value} key={event.value}>{event.title}</Select.Option>)}
            </Select>
            Date:
            <DatePicker.RangePicker
                style={{ marginLeft: 10 }}
                // @ts-ignore
                value={date}
                // @ts-ignore
                onChange={(date: any[], dateFormat: string[]) => {
                    setDate(date);
                    getEvents({dateRange: dateFormat})
                }}
            />

            <Table columns={getTableColumns()}
                   dataSource={events}
                   pagination={false}
                   rowKey="id"
                   style={{paddingTop: 20}} />

            <Pagination
                className="table-pagination"
                total={total}
                current={page}
                hideOnSinglePage={false}
                pageSize={pageSize}
                onChange={(page: number) => getEvents({page})}
                showTotal={(total: any, range: any) => {
                    return (
                        <>
                            <div className="total-text">
                                <span className="f-bold">{range[0]}</span>-
                                <span className="f-bold">{range[1]}</span> of
                                <span className="f-bold"> {total}</span>
                            </div>
                            <Select style={{marginLeft: 10}}
                                    value={pageSize}
                                    onChange={(pageSize: number) => getEvents({pageSize})}
                            >
                                <Select.Option value={10}>10 / page</Select.Option>
                                <Select.Option value={25}>25 / page</Select.Option>
                            </Select>
                        </>
                    )
                }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentActivity);