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
    message,
    notification
} from 'antd'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {connect} from "react-redux"
import {RootState} from '../../../redux/reducer'
import {LinkOutlined} from '@ant-design/icons'
import {DisconnectOutlined} from '@ant-design/icons'
import './LoginOptions.scss'
import helpers from '../../../helpers'
import {usersActions} from '../../../redux/actions/usersActions'
import {tfaActions} from '../../../redux/actions/tfaActions'

import {ISocialByUser} from '../../../interfaces/socialsByUser'
import {ILoginOptions} from '../../../interfaces/customerPortal/loginOptions'

import AppleDownload from '../../../staticfiles/images/tfa/apple.png'
import GoogleDownload from '../../../staticfiles/images/tfa/google.png'
import QR from '../../../staticfiles/images/tfa/qr.png'
import {IPhone} from "../../../interfaces/phone";


const {Option} = Select


const LoginOptions = ({
                          googleAuthenticatorValue, getGoogleAuthenticatorValue,
                          socialsByUser, getSocialsByUser,
                          pinCodeData, getPinCode,
                          pinCodeVerifyData, verifyPinCode,
                          tokenVerifyData, verifyToken,
                          phones, googleAuthenticatorTested,
                      }: ILoginOptions) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isEnterManually, setIsEnterManually] = useState(false)
    const [isVerifyPhone, setIsVerifyPhone] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState('')
    const [code, setCode] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        getGoogleAuthenticatorValue()
    }, [getGoogleAuthenticatorValue])

    useEffect(() => {
        getSocialsByUser()
    }, [getSocialsByUser])

    useEffect(() => {
        if (pinCodeData.success != null) {
            if (pinCodeData.success) {
                setIsVerifyPhone(true)
            } else {
                notification.error({
                    message: 'Error!',
                    description: pinCodeData.message
                })
            }
        }
    }, [pinCodeData])

    useEffect(() => {
        if (pinCodeData.success != null) {
            if (pinCodeVerifyData.success) {
                setIsModalVisible(false)
                setIsVerifyPhone(false)
                setIsVerified(true)
            } else {
                notification.error({
                    message: 'Error!',
                    description: pinCodeVerifyData.message
                })
            }
        }
    }, [pinCodeVerifyData])

    useEffect(() => {
        if (tokenVerifyData.success != null) {
            if (tokenVerifyData.success) {
                notification.success({
                    message: 'Success!',
                    description: 'The token was verified successfully.'
                })
                tokenVerifyData.success = null;
            } else {
                notification.error({
                    message: 'Error!',
                    description: tokenVerifyData.message
                })
            }

            setToken('')
        }
    }, [tokenVerifyData])


    const showModal = () => setIsModalVisible(true)

    const handlePhoneVerifying = () => {
        if (code) {
            verifyPinCode(phoneNumber, code)
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'Code is empty.'
            })
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
                })
            }
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'Phone number is empty.'
            })
        }
    }

    const resendCode = () => {
        handlePhoneSubmitting()
        notification.success({
            message: 'Success!',
            description: 'Code has been sent again.'
        })
    }

    const submitToken = () => {
        if (token) {
            verifyToken(token)
        } else {
            notification.warning({
                message: 'Warning!',
                description: 'Token is empty.'
            })
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false)
        setIsVerifyPhone(false)
        setPhoneNumber('')
    }

    const handlerEnterManually = () => setIsEnterManually(prevState => !prevState)

    const changePhoneNumberBySelect = (value: string) => setPhoneNumber(value)
    const changePhoneNumberByInput = (event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)
    const changeCode = (event: ChangeEvent<HTMLInputElement>) => setCode(event.target.value)
    const changeToken = (event: ChangeEvent<HTMLInputElement>) => setToken(event.target.value)


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
                                                shape="round" icon={<DisconnectOutlined/>} size='small'>
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

            <Space direction="vertical">
                <Typography.Title level={5}>Two-factor Authentification</Typography.Title>
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

                                <Button onClick={showModal} style={{marginTop: 25}} type="primary">
                                    Enable Two-factor Authorization
                                </Button>
                            </>
                        }
                        {
                            isVerified &&
                            <>
                                <Typography.Text>Download Google Authentificator app to your
                                    smartphone</Typography.Text>
                                <Space direction="horizontal" style={{marginBottom: 10}}>
                                    <Image src={AppleDownload}/>
                                    <Image src={GoogleDownload}/>
                                </Space>
                                <Typography.Text>Scan QR-code by your Google Authentificator</Typography.Text>
                                <Image src={QR} width={150} style={{margin: '10px 0'}}/>
                                <Typography.Text>Enter token generated by Google Authentificator below</Typography.Text>
                                <Space direction="vertical" size={20}>
                                    <Input value={token} onChange={changeToken} placeholder="Enter token"
                                           style={{width: 200}}/>
                                    <Button onClick={submitToken} type="primary">Submit Token</Button>
                                </Space>
                            </>
                        }
                    </>
                }

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
                            <Button type="primary">Disable two-factor authentication</Button>
                            <Button type="primary">Re-setup two-factor authentication</Button>
                            <Button type="primary">Get backup codes</Button>
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
                        <Typography.Text style={{fontSize: "1rem"}}>AuthMachine sent verification code to
                            843-XXX-XX36, please enter it below</Typography.Text>

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
    const {googleAuthenticatorValue, socialsByUser} = state.users
    const {pinCodeData, pinCodeVerifyData, tokenVerifyData} = state.tfa
    const {user} = state.user;

    return {
        googleAuthenticatorValue,
        socialsByUser,
        pinCodeData,
        pinCodeVerifyData,
        tokenVerifyData,
        phones: user?.phoneNumbers || [],
        googleAuthenticatorTested: user?.googleAuthenticatorTested || false
    }
};

const mapDispatchToProps = {
    getGoogleAuthenticatorValue: usersActions.getGoogleAuthenticatorValue,
    getSocialsByUser: usersActions.getSocialsByUser,
    getPinCode: tfaActions.getPinCode,
    verifyPinCode: tfaActions.verifyPinCode,
    verifyToken: tfaActions.verifyToken,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginOptions);