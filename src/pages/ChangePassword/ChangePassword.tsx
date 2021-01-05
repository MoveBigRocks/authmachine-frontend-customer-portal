import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {withRouter} from "react-router-dom";
import {eventActions} from "../../redux/actions/eventActions";
import {ChangePasswordState, ChangePasswordProps} from "../../interfaces/customerPortal/changePassword";
import {Typography, Form, Input, Button} from "antd";
import {PasswordInput} from "antd-password-input-strength";

const {Password} = Input;

class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {

    constructor(props: ChangePasswordProps) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    }

    componentDidMount() {

    }


    render() {

        return (
            <>
                <Helmet>
                    <title>Change Password</title>
                </Helmet>
                <Typography.Title level={4} style={{marginBottom: "1.5rem"}}>Change Password</Typography.Title>
                <Form layout="vertical">
                    <Form.Item label="Old Password" name="oldPassword">
                        <Password placeholder="Enter old password" />
                    </Form.Item>
                    <Form.Item label="New Password" name="newPassword">
                        <PasswordInput settings={{height: 6, alwaysVisible: true, colorScheme: {levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#000"], noLevel: "lightgrey"}}}
                                       inputProps={{
                                           size: 'large'
                                       }} />
                        {/*<Password placeholder="Enter new password" />*/}
                        {/*<Progress steps={4} percent={50} style={{width: "100%"}} />*/}
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                        <Password placeholder="Confirm new password" />
                    </Form.Item>
                    <Button type="primary">
                        Save New Password
                    </Button>
                </Form>
            </>
        )
    }
}


const mapDispatchToProps = {
    getEvents: eventActions.getEvents,
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(ChangePassword))

