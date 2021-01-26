import React, {useEffect} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {Link} from "react-router-dom";
import {Row, Col, Avatar, Typography, Button} from "antd";
import {MyProfileProps} from "../../../interfaces/customerPortal/myProfile";
import {usersActions} from "../../../redux/actions/usersActions";
import {EditFilled, UserOutlined} from "@ant-design/icons";
import "./MyProfile.scss";
import {UserInterface} from "../../../interfaces/user";
import {mainActions} from "../../../redux/actions/mainActions";

const getUserLocation = (user: UserInterface | null) => {
    if (user?.addresses) {
        let address = user.addresses.filter(a => a.primary);
        if (address.length > 0) {
            return `${address[0].streetAddress}, ${address[0].region}`;
        } else if (user.addresses.length > 0) {
            return `${user.addresses[0].streetAddress}, ${user.addresses[0].region}`;
        } else {
            return "";
        }
    } else {
        return "";
    }
}

export const MyProfile = ({user, getUser, setPageTitle}: MyProfileProps) => {
    useEffect(() => getUser("me"), [getUser]);

    useEffect(() => setPageTitle("My Profile"), [setPageTitle]);

    return (
        <div className="my-profile">
            <Row justify="space-between" gutter={[20, 20]}>
                <Col>
                    <Row>
                        <Col>
                            {
                                user?.avatar
                                    ? <Avatar src={user?.avatar} size={50}/>
                                    : <Avatar icon={<UserOutlined/>} size={50}/>
                            }
                        </Col>
                        <Col>
                            <Typography.Title level={2} style={{
                                marginBottom: 0,
                                marginLeft: 15
                            }}>{user?.username}</Typography.Title>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Link to="/customer-portal/profile-edit">
                        <Button className="edit-btn">
                            <EditFilled size={25}/> Edit
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="details-table" style={{paddingTop: 20, maxWidth: 800}}>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col sm={6}>Full Name</Col>
                        <Col sm={11}>{user?.displayName}</Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col sm={6}>Location</Col>
                        <Col sm={11}>{getUserLocation(user)}</Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col sm={6}>Nick Name</Col>
                        <Col sm={11}>{user?.nickName}</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    const {user} = state.users;
    return {user};
};

const mapDispatchToProps = {
    getUser: usersActions.getUser,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

