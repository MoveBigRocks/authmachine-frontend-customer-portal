import {
    Typography,
    Input,
    Button,
    Col,
    Row,
    Card,
    Divider,
    Space,
    Modal,
    Select,
    Image,
    notification
} from 'antd';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from '../../../redux/reducer';
import {LinkOutlined} from '@ant-design/icons';
import {DisconnectOutlined} from '@ant-design/icons';
import './LoginOptions.scss';
import helpers from '../../../helpers';
import {usersActions} from "../../../redux/actions/usersActions";
import {ISocialByUser} from "../../../interfaces/socialsByUser";
import {ILoginOptionsProps, IQRCodeProps} from "../../../interfaces/customerPortal/loginOptions";
import {userActions} from "../../../redux/actions/userActions";
import {mainActions} from "../../../redux/actions/mainActions";
import {tfaActions} from '../../../redux/actions/tfaActions';

import AppleDownload from '../../../staticfiles/images/tfa/apple.png';
import GoogleDownload from '../../../staticfiles/images/tfa/google.png';
import QR from '../../../staticfiles/images/tfa/qr.png';
import {IPhone} from "../../../interfaces/phone";

const {Option} = Select


const QRCode = ({token, changeToken, submitToken}: IQRCodeProps) => {
    return (
        <Space direction="vertical">
            <Typography.Text>Download Google Authenticator app to your
                smartphone</Typography.Text>
            <Space direction="horizontal" style={{marginBottom: 10}}>
                <Image src={AppleDownload}/>
                <Image src={GoogleDownload}/>
            </Space>
            <Typography.Text>Scan QR-code by your Google Authenticator</Typography.Text>
            <Image src={QR} width={150} style={{margin: '10px 0'}}/>
            <Typography.Text>Enter token generated by Google Authenticator below</Typography.Text>
            <Space direction="vertical" size={20}>
                <Input value={token} onChange={changeToken} placeholder="Enter token"
                       style={{width: 200}}/>
                <Button onClick={submitToken} type="primary">Submit Token</Button>
            </Space>
        </Space>
    )
}

const LoginOptions = (props: ILoginOptionsProps) => {
    const {
        googleAuthenticatorValue, getGoogleAuthenticatorValue, socialsByUser, getSocialsByUser,
        disconnectSocialAccount, socialLink, getSocialLink, setPageTitle, pinCodeData, getPinCode,
        pinCodeVerifyData, verifyPinCode, tokenVerifyData, verifyToken, phones, googleAuthenticatorTested,
        getBackupCodes, backupCodes, disablePinCode, sendDisablePinData, clearVerificationState,
        disableGoogleAuthenticator, disableGoogleAuthData, getUser,
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEnterManually, setIsEnterManually] = useState(false);
    const [isVerifyPhone, setIsVerifyPhone] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [token, setToken] = useState('');
    const [isDisableTFAShowing, setIsDisableTFAShowing] = useState(false);
    const [isBackupCodesShowing, setIsBackupCodesShowing] = useState(false);
    const [reSetup, setReSetup] = useState(false);
    const [disable2FAInputValue, setDisable2FAInputValue] = useState('');


    useEffect(() => {
        return clearVerificationState;
    }, []);

    useEffect(() => {
        if (backupCodes.length > 0) {
            setIsBackupCodesShowing(true);
        }
    }, [backupCodes]);

    useEffect(() => {
        if (disableGoogleAuthData.success != null) {
            if (disableGoogleAuthData.success) {
                notification.success({
                    message: 'Success!',
                    description: '2FA was disabled.'
                });
                setIsDisableTFAShowing(false);
                getUser('me');
            } else {
                notification.error({
                    message: 'Error!',
                    description: disableGoogleAuthData.message
                });
            }
        }
    }, [disableGoogleAuthData])

    useEffect(() => {
        if (sendDisablePinData.success != null) {
            if (sendDisablePinData.success) {
                setIsDisableTFAShowing(true);
            } else {
                notification.error({
                    message: 'Error!',
                    description: sendDisablePinData.message
                });
            }
        }
    }, [sendDisablePinData]);

    useEffect(() => {
        getGoogleAuthenticatorValue()
    }, [getGoogleAuthenticatorValue])

    useEffect(() => setPageTitle("Login Options"), [setPageTitle])

    useEffect(() => {
        getSocialsByUser()
    }, [getSocialsByUser])

    useEffect(() => {
        if (socialLink !== "") {
            helpers.setValueInLocalStorage("connectionType", "connect");
            window.location.replace(socialLink);
        }
    }, [socialLink]);

    useEffect(() => {
        if (pinCodeData.success != null) {
            if (pinCodeData.success) {
                setIsVerifyPhone(true);
            } else {
                notification.error({
                    message: 'Error!',
                    description: pinCodeData.message
                })
            }
        }
    }, [pinCodeData]);

    useEffect(() => {
        if (pinCodeVerifyData.success != null) {
            if (pinCodeVerifyData.success) {
                setIsModalVisible(false);
                setIsVerifyPhone(false);
                setIsVerified(true);
            } else {
                notification.error({
                    message: 'Error!',
                    description: pinCodeVerifyData.message
                });

                console.log('wef');
            }
        }
    }, [pinCodeVerifyData]);

    useEffect(() => {
        if (tokenVerifyData.success != null) {
            if (tokenVerifyData.success) {
                notification.success({
                    message: 'Success!',
                    description: 'The token was verified successfully.'
                })
                tokenVerifyData.success = null;
                setReSetup(false);
                setIsVerified(false);
            } else {
                notification.error({
                    message: 'Error!',
                    description: tokenVerifyData.message
                })
            }

            setToken('');
        }
    }, [tokenVerifyData]);

    const showModal = (reSetup: boolean = false) => {
        if (reSetup) {
            setReSetup(true);
            setIsVerified(false);
            clearVerificationState();
        }
        setIsModalVisible(true);
    }

    const handlePhoneVerifying = () => {
        if (code.length === 6) {
            verifyPinCode(phoneNumber, code)
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'The length of the code must be 6.'
            });
        }
    }

    const handlePhoneSubmitting = () => {
        let re = /^\D*(\d\D*){9,14}$/

        if (phoneNumber) {
            if (re.test(phoneNumber)) {
                getPinCode(phoneNumber)
            } else {
                notification.warning({
                    message: 'Warning!',
                    description: 'Phone number is incorrect.'
                });
            }
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'Phone number is empty.'
            });
        }
    }

    const resendCode = () => {
        handlePhoneSubmitting()
        notification.success({
            message: 'Success!',
            description: 'Code has been sent again.'
        });
    }

    const submitToken = () => {
        if (token) {
            verifyToken(token);
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'Token is empty.'
            });
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsVerifyPhone(false);
        setPhoneNumber('');
    }

    const handlerEnterManually = () => setIsEnterManually(prevState => !prevState);

    const changePhoneNumberBySelect = (value: string) => setPhoneNumber(value);
    const changePhoneNumberByInput = (event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value);
    const changeCode = (event: ChangeEvent<HTMLInputElement>) => setCode(event.target.value);
    const changeToken = (event: ChangeEvent<HTMLInputElement>) => setToken(event.target.value);

    const disableTFA = () => {
        if (disable2FAInputValue.length === 6) {
            disableGoogleAuthenticator(disable2FAInputValue);
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'Pin code is incorrect.'
            });
        }
    }


    return (
        <>
            <Typography.Title level={3} style={{marginBottom: "1.5rem"}}>Login Options</Typography.Title>
            <Typography.Title level={5} style={{marginBottom: "1.5rem"}}>
                {socialsByUser.length > 0 ? 'Social Accounts' : 'Here are no social accounts'}
            </Typography.Title>

            <Row gutter={[32, 32]}>
                {
                    socialsByUser.map((s: ISocialByUser, index: number) => (
                        <Col sm={24} md={24} lg={12} xl={10} key={index}>
                            <Card>
                                {s.isConnected && <div className="check">&#10003;</div>}
                                <Row justify="space-around" align="middle">
                                    <Col>
                                        <Row align="middle">
                                            <Col>
                                                <img src={helpers.getIconByProvider(s.provider)} width={25}
                                                     alt={s.provider}
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
                                                    onClick={() => disconnectSocialAccount(s.accountId)}
                                                    shape="round" icon={<DisconnectOutlined/>} size='small'>
                                                Disconnect
                                            </Button>
                                        }
                                        {
                                            !s.isConnected &&
                                            <Button type="primary"
                                                    shape="round"
                                                    onClick={() => getSocialLink(s.provider, "connect")}
                                                    icon={<LinkOutlined/>}
                                                    size='small'>
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

            <Space direction="vertical">
                <Typography.Title level={5}>Two-factor Authentication</Typography.Title>
                {
                    !googleAuthenticatorTested &&
                    <>
                        {
                            !isVerified && !googleAuthenticatorValue &&
                            <Typography.Text>Google Authenticator is disabled on this AuthMachine
                                instance</Typography.Text>

                        }
                        {
                            !isVerified && googleAuthenticatorValue &&

                            <>
                                <Typography.Text>AuthMachine supports Google Authenticator as a method of Two-Factor
                                    Authentication
                                    (2FA)</Typography.Text>

                                <Button onClick={() => showModal()} style={{marginTop: 25}} type="primary">
                                    Enable Two-factor Authorization
                                </Button>
                            </>
                        }
                        {
                            isVerified && <QRCode submitToken={submitToken} changeToken={changeToken} token={token}/>
                        }
                    </>
                }

                {(googleAuthenticatorTested && isVerified && reSetup) &&
                <QRCode submitToken={submitToken} changeToken={changeToken} token={token}/>}

                {
                    googleAuthenticatorTested &&
                    <>
                        <Typography.Text>You have set up two-factor authentication using Google
                            Authenticator</Typography.Text>
                        <Typography.Text>Phone numbers which you can use to reset your 2FA:</Typography.Text>
                        <ul>
                            {
                                phones.map((p: IPhone, index: number) => (
                                    <li value={p.value} key={index}>{p.value}</li>
                                ))
                            }
                        </ul>
                        <Typography.Text>You can:</Typography.Text>
                        <Space direction="vertical">
                            {
                                isDisableTFAShowing &&
                                <>
                                    <Input style={{minWidth: 320}}
                                           placeholder="Please enter the PIN code we sent to your phone"
                                           value={disable2FAInputValue}
                                           onChange={e => setDisable2FAInputValue(e.target.value)}/>
                                    <Button onClick={disableTFA}
                                            style={{marginBottom: 20}} type="primary">Submit</Button>
                                </>
                            }
                            {
                                !isDisableTFAShowing &&
                                <Button onClick={() => disablePinCode()}>Disable two-factor
                                    authentication</Button>
                            }
                            <Button onClick={() => showModal(true)}>Re-setup two-factor authentication</Button>
                            {
                                isBackupCodesShowing &&
                                <Row style={{marginTop: 20}}>
                                    {
                                        backupCodes.map((code: number, index: number) => (
                                            <Col key={index}>
                                                <Typography.Text code={true}>{code}</Typography.Text>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            }
                            {
                                !isBackupCodesShowing &&
                                <Button onClick={() => getBackupCodes()}>Get backup codes</Button>
                            }
                        </Space>
                    </>
                }
            </Space>

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
                                    <Select onChange={changePhoneNumberBySelect} style={{width: "100%"}}
                                            placeholder="Select phone number" allowClear>
                                        {
                                            phones.map((p: IPhone, index: number) => (
                                                <Option value={p.value} key={index}>{p.value}</Option>
                                            ))
                                        }
                                    </Select>
                                }
                                {
                                    isEnterManually &&
                                    <Input onChange={changePhoneNumberByInput} placeholder="Enter Phone Number"/>
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
                        <Typography.Text style={{fontSize: "1rem"}}>AuthMachine sent verification code
                            to {helpers.hidePhone(phoneNumber)},
                            please enter it below</Typography.Text>

                        <Row>
                            <Col span={24} style={{margin: "8px 0"}}>
                                <Input onChange={changeCode} placeholder="Enter code"/>
                            </Col>
                        </Row>

                        <Button onClick={resendCode} type="link" style={{marginLeft: -12}}>Resend code</Button>
                    </>
                }
            </Modal>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    const {googleAuthenticatorValue, socialsByUser} = state.users;
    const {
        pinCodeData,
        pinCodeVerifyData,
        tokenVerifyData,
        backupCodes,
        sendDisablePinData,
        disableGoogleAuthData
    } = state.tfa;
    const {socialLink} = state.user;
    const {user} = state.user;

    return {
        googleAuthenticatorValue,
        socialsByUser,
        socialLink,
        pinCodeData,
        pinCodeVerifyData,
        tokenVerifyData,
        phones: user?.phoneNumbers || [],
        googleAuthenticatorTested: user?.googleAuthenticatorTested || false,
        backupCodes,
        sendDisablePinData,
        disableGoogleAuthData,
    }
};

const mapDispatchToProps = {
    getGoogleAuthenticatorValue: usersActions.getGoogleAuthenticatorValue,
    getSocialsByUser: usersActions.getSocialsByUser,
    disconnectSocialAccount: userActions.disconnectSocialAccount,
    getSocialLink: userActions.getSocialLink,
    setPageTitle: mainActions.setPageTitle,
    getPinCode: tfaActions.getPinCode,
    verifyPinCode: tfaActions.verifyPinCode,
    verifyToken: tfaActions.verifyToken,
    getBackupCodes: tfaActions.getBackupCodes,
    disablePinCode: tfaActions.disablePinCode,
    clearVerificationState: tfaActions.clearVerificationState,
    disableGoogleAuthenticator: tfaActions.disableGoogleAuthenticator,
    getUser: usersActions.getUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginOptions);