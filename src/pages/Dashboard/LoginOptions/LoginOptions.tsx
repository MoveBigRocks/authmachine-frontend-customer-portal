import {Typography, Input, Button, Col, Row, Card, Divider, Space, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {LinkOutlined} from '@ant-design/icons';
import './LoginOptions.scss';
import helpers from '../../../helpers'
import {usersActions} from "../../../redux/actions/usersActions";
import {ISocialByUser} from "../../../interfaces/socialsByUser";

const {Option} = Select;


const LoginOptions = ({
                          googleAuthenticatorValue,
                          getGoogleAuthenticatorValue,
                          getSocialsByUser,
                          socialsByUser,
                      }: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEnterManually, setIsEnterManually] = useState(false);
    const [isVerifyPhone, setIsVerifyPhone] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        getGoogleAuthenticatorValue();
    }, [getGoogleAuthenticatorValue]);

    useEffect(() => {
        getSocialsByUser();
    }, [getSocialsByUser]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handlePhoneVerifying = () => {
        setIsModalVisible(false);
        setIsVerifyPhone(false);
        setIsVerified(true);
    };

    const handlePhoneSubmitting = () => {
        setIsVerifyPhone(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsVerifyPhone(false);
    };

    const handlerEnterManually = () => {
        setIsEnterManually(prevState => !prevState)
    };


    return (
        <>
            <Typography.Title level={3} style={{marginBottom: "1.5rem"}}>Login Options</Typography.Title>
            <Typography.Title level={5} style={{marginBottom: "1.5rem"}}>Social Accounts</Typography.Title>

            <Row gutter={[32, 32]}>
                {socialsByUser.map((s: ISocialByUser, index: number) => (
                    <Col sm={24} md={24} lg={12} xl={10} key={index}>
                        <Card>
                            {
                                s.isConnected &&
                                <div className="check">&#10003;</div>
                            }
                            <Row justify="space-around" align="middle">
                                <Col>
                                    <Row align="middle">
                                        <Col>
                                            <img src={helpers.getIconByProvider(s.provider)} width={25}
                                                 style={{marginRight: 15}}/>
                                        </Col>
                                        <Col>
                                            <Typography.Title
                                                level={5}
                                                style={{marginBottom: 0}}>{helpers.getTitleWithUpper(s.provider)}</Typography.Title>
                                            {/*<Typography.Text type="secondary">facebook.com/john.doe</Typography.Text>*/}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    {
                                        s.isConnected &&
                                        <Button style={{background: "#fafafa", color: "#595959", border: "none"}}
                                                type="primary"
                                                shape="round" icon={<LinkOutlined/>} size='small'>
                                            Disconnect
                                        </Button>
                                    }
                                    {
                                        !s.isConnected &&
                                        <Button type="primary" shape="round" icon={<LinkOutlined/>} size='small'>
                                            Connect
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider/>
            {
                !isVerified &&
                <Space direction="vertical">
                    <Typography.Title level={5}>Two-factor Authentification</Typography.Title>
                    <Typography.Text>Google Authenticator is disabled on this AuthMachine instance</Typography.Text>
                </Space>
            }
            {
                !isVerified && googleAuthenticatorValue &&
                <Space direction="vertical">
                    <Typography.Title level={5}>Two-factor Authentification</Typography.Title>
                    <Typography.Text>AuthMachine supports Google Authenticator as a method of Two-Factor Authentication
                        (2FA)</Typography.Text>

                    <Button onClick={showModal} style={{marginTop: 25}} type="primary">
                        Enable Two-factor Authorization
                    </Button>
                </Space>
            }
            {
                isVerified &&
                <Space direction="vertical">
                    <Typography.Title level={5}>Two-factor Authentification</Typography.Title>
                    <Typography.Text>Download Google Authentificator app to your smartphone</Typography.Text>
                    <Typography.Text>Scan QR-code by your Google Authentificator</Typography.Text>
                    <Typography.Text>Enter token generated by Google Authentificator below</Typography.Text>
                    <Space direction="vertical" size={20}>
                        <Input placeholder="Enter token" style={{width: 200}}/>
                        <Button type="primary">Submit Token</Button>
                    </Space>
                </Space>
            }


            <Modal title="Phone Number Verification"
                   visible={isModalVisible}
                   onOk={isVerifyPhone ? handlePhoneVerifying : handlePhoneSubmitting}
                   onCancel={handleCancel}
                   okText={(isVerifyPhone ? 'Verify' : 'Submit') + ' Phone Number'}
            >
                {
                    !isVerifyPhone &&
                    <>
                        <Typography.Text style={{fontSize: "1rem"}}>Phone Number</Typography.Text>

                        <Row>
                            <Col span={24} style={{margin: "8px 0"}}>
                                {
                                    !isEnterManually &&
                                    <Select style={{width: "100%"}}
                                            placeholder="Select phone number" allowClear>
                                        <Option value="1">+1456654462</Option>
                                    </Select>
                                }
                                {
                                    isEnterManually &&
                                    <Input placeholder="Enter Phone Number"/>
                                }
                            </Col>
                        </Row>

                        <Button onClick={handlerEnterManually} type="link" style={{marginLeft: -12}}>
                            {isEnterManually ? 'Select from Existing' : 'Enter Manually'}
                        </Button>
                    </>
                }
                {
                    isVerifyPhone &&
                    <>
                        <Typography.Text style={{fontSize: "1rem"}}>AuthMachine sent verification code to
                            843-XXX-XX36, please enter it below</Typography.Text>

                        <Row>
                            <Col span={24} style={{margin: "8px 0"}}>
                                <Input placeholder="Enter code"/>
                            </Col>
                        </Row>

                        <Button type="link" style={{marginLeft: -12}}>Resend code</Button>
                    </>
                }
            </Modal>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    const {googleAuthenticatorValue, socialsByUser} = state.users;
    return {
        googleAuthenticatorValue,
        socialsByUser,
    }
};

const mapDispatchToProps = {
    getGoogleAuthenticatorValue: usersActions.getGoogleAuthenticatorValue,
    getSocialsByUser: usersActions.getSocialsByUser,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginOptions);