import {Typography, Form, Input, Button, Col, Row, Card, Divider} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";


const LoginOptions = () => {
    return (
        <>
            <Typography.Title level={4} style={{marginBottom: "1.5rem"}}>Login Options</Typography.Title>
            <Typography.Title level={5} style={{marginBottom: "1.5rem"}}>Social Accounts</Typography.Title>


            <Row justify="space-between">
                <Col className="gutter-row">
                    <Card style={{ width: 300 }}>
                        <Typography.Title level={5}>Facebook</Typography.Title>
                        <Typography.Text type="secondary">facebook.com/john.doe</Typography.Text>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: 300 }}>
                        <Typography.Title level={5}>Facebook</Typography.Title>
                        <Typography.Text type="secondary">facebook.com/john.doe</Typography.Text>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: 300 }}>
                        <Typography.Title level={5}>Facebook</Typography.Title>
                        <Typography.Text type="secondary">facebook.com/john.doe</Typography.Text>
                    </Card>
                </Col>
            </Row>

            <Divider></Divider>

            <Typography.Title level={5}>Two-factor Authentification</Typography.Title>
            <Typography.Text style={{marginBottom: "1.5rem"}}>AuthMachine supports Google Authenticator as a method of Two-Factor Authentication (2FA)</Typography.Text>
            <Row>
                <Col span={8}>
                    <Button type="primary" block>
                      Enable Two-factor Authorization
                    </Button>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
};


const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions);

