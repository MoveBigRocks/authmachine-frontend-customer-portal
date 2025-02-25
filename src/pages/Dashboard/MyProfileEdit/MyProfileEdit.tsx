import React, {createRef} from "react";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {Row, Col, Avatar, Typography, Button, Form, Input, Upload} from "antd";
import {MyProfileEditProps, MyProfileEditState} from "../../../interfaces/customerPortal/myProfile";
import {usersActions} from "../../../redux/actions/usersActions";
import "./MyProfileEdit.scss";
import {DeleteFilled, PlusOutlined, UserOutlined, CloseOutlined, CloudUploadOutlined} from "@ant-design/icons";
import {GroupInterface} from "../../../interfaces/group";
import Address from "../../../components/CustomerPortal/Address/Address";
import {mainActions} from "../../../redux/actions/mainActions";
import {AddressInterface} from "../../../interfaces/address";
import AddressEdit from "../../../components/CustomerPortal/AddressEdit/AddressEdit";

const defaultAddress = {
    formatted: "",
    locality: "",
    postalCode: "",
    primary: false,
    region: "",
    streetAddress: "",
    type: "",
    country: "",
};

class MyProfileEdit extends React.Component<MyProfileEditProps, MyProfileEditState> {
    private formRef = createRef<any>();

    constructor(props: MyProfileEditProps) {
        super(props);
        this.state = {
            updated: false,
            showEditAddressModal: false,
            editedAddress: defaultAddress,
        }
    }

    componentDidUpdate(prevProps: Readonly<MyProfileEditProps>, prevState: Readonly<MyProfileEditState>, snapshot?: any) {
        if (this.formRef.current) {
            // @ts-ignore
            const username = this.getUserProperty("username");
            const email = this.getUserPrimaryEmail();
            const nickName = this.getUserProperty("nickName");
            const fullName = this.getUserProperty("fullName");
            this.formRef.current.setFieldsValue({
                username,
                email,
                nickName,
                fullName,
            });
        }
    }

    componentDidMount() {
        const {getUser, getGroups, setPageTitle} = this.props;
        getUser("me");
        getGroups();
        setPageTitle("Edit Profile");
    }

    getUserProperty = (propName: string, type: string = "string") => {
        const {user} = this.props;
        let returnedValue: any = (type === "list") ? [] : (type === "boolean") ? false : "";
        if (user !== null && user.hasOwnProperty(propName)) {
            if (propName === "groups") {
                returnedValue = user.groups.map(g => g.id);
            } else {
                // @ts-ignore
                returnedValue = user[propName];
            }
        }
        return returnedValue;
    }

    getUserPrimaryEmail = () => {
        const {user} = this.props;
        if (user !== null) {
            if (user.emails.length > 0) {
                let primaryEmail = user.emails.filter((e: any) => e.primary);
                if (primaryEmail.length > 0) {
                    return primaryEmail[0].value;
                } else if (primaryEmail.length === 0) {
                    return user.emails[0].value;
                }
            }
        }
        return ""
    }

    updateUserPrimaryEmail = (e: any) => {
        const {value} = e.target;
        const {user} = this.props;
        let emails = (user !== null) ? user.emails : [];
        emails.map((e: any) => {
            if (e.primary) e.value = value;
            return e;
        });
        this.updateUserState("emails", emails);
    }

    updateUserState(propName: string, value: any) {
        const {user, setUser} = this.props;
        if (user !== null) {
            // @ts-ignore
            user[propName] = value;
            setUser(user);
            this.setState({updated: true});
        }
    }

    updateUserProperty = (value: any, propName: string) => {
        let {user, setUser, groups} = this.props;
        if (typeof (value) === "object" && !Array.isArray(value)) value = value.target.value;
        if (user !== null) {
            // @ts-ignore
            user[propName] = (propName === "groups") ? groups.filter(g => value.includes(g.id)) : value;
            setUser(user);
            this.setState({updated: true});
        }
    }

    getPrimaryEmails = () => {
        const {user} = this.props;
        let emails: any[] = [];
        if (user !== null) {
            emails = user.emails;
            emails = emails.filter((e: GroupInterface) => e.primary);
            if (emails.length === 0 && user.emails.length > 0) {
                return [user.emails[0]]
            }
        }
        return emails
    }

    getAdditionalEmails = () => {
        const {user} = this.props;
        let emails: any[] = [];
        let primaryEmail;
        let mainEmail: { id: string; };
        if (user !== null) {
            emails = user.emails;
            primaryEmail = emails.filter((e: GroupInterface) => e.primary);
            if (primaryEmail.length > 0) {
                mainEmail = primaryEmail[0];
            } else if (primaryEmail.length === 0) {
                mainEmail = emails[0];
            }
            return emails.filter((e: GroupInterface) => e.id !== mainEmail?.id);
        } else {
            return emails
        }
    }

    getPhoneNumbers = () => {
        const {user} = this.props;
        return (user !== null) ? user.phoneNumbers : [];
    }

    removeAdditionalEmail = (emailIndex: number) => {
        const primaryEmails = this.getPrimaryEmails();
        let emails = this.getAdditionalEmails();

        emails.splice(emailIndex, 1);
        this.updateUserState("emails", [...primaryEmails, ...emails]);
    }

    editAdditionalEmail = (emailIndex: number, value: string) => {
        const primaryEmails = this.getPrimaryEmails();
        let emails = this.getAdditionalEmails();

        emails = emails.map((email, key) => {
            if (key === emailIndex) email.value = value;
            return email;
        });
        this.updateUserState("emails", [...primaryEmails, ...emails]);
    }

    removePhoneNumber = (numberIndex: number) => {
        let phoneNumbers = this.getPhoneNumbers();

        phoneNumbers.splice(numberIndex, 1);
        this.updateUserState("phoneNumbers", phoneNumbers);
    }

    editPhoneNumber = (numberIndex: number, value: string) => {
        let phoneNumbers = this.getPhoneNumbers();

        phoneNumbers = phoneNumbers.map((phone, key) => {
            if (key === numberIndex) phone.value = value;
            return phone;
        });
        this.updateUserState("phoneNumbers", phoneNumbers);
    }

    renderAdditionalEmails = () => {
        const emails = this.getAdditionalEmails();
        if (emails.length > 0) {
            return emails.map((email, key: number) => (
                <Col sm={24} className="d-flex" style={{marginBottom: 10}} key={key}>
                    <Row className="d-flex-justify">
                        <Col sm={22}>
                            <Input value={email.value}
                                   onChange={(e) => this.editAdditionalEmail(key, e.target.value)}/>
                        </Col>
                        <Col sm={2}>
                            <DeleteFilled className="hover-cursor"
                                          style={{marginLeft: 10}}
                                          onClick={() => this.removeAdditionalEmail(key)}/>
                        </Col>
                    </Row>
                </Col>
            ))
        } else {
            return <div className="empty-container">Emails list is empty</div>;
        }

    }

    addEmail = () => {
        const {user} = this.props;
        let emails = user?.emails;
        emails?.push({
            value: "",
            type: null,
            primary: false
        })
        this.updateUserState("emails", emails);
    }

    addPhoneNumber = () => {
        const {user} = this.props;
        let phoneNumbers = user?.phoneNumbers;
        phoneNumbers?.push({
            value: "",
            type: null
        })
        this.updateUserState("phoneNumbers", phoneNumbers);
    }

    renderPhoneNumbers = () => {
        const phones = this.getPhoneNumbers();
        if (phones.length > 0) {
            return phones.map((phone, key: number) => (
                <Col sm={24} className="d-flex" style={{marginBottom: 10}} key={key}>
                    <Row className="d-flex-justify">
                        <Col sm={22}>
                            <Input value={phone.value}
                                   onChange={(e) => this.editPhoneNumber(key, e.target.value)}/>
                        </Col>
                        <Col sm={2}>
                            <DeleteFilled className="hover-cursor"
                                          style={{marginLeft: 10}}
                                          onClick={() => this.removePhoneNumber(key)}/>
                        </Col>
                    </Row>
                </Col>
            ))
        } else {
            return <div className="empty-container">Phones list is empty</div>;
        }
    }

    onFinish = () => this.props.updateUser();

    // @ts-ignore
    uploadFile = ({fileList}) => {
        if (fileList.length > 0) {
            this.props.uploadUserPhoto(fileList[0].originFileObj, "avatar", true);
        }
    };

    deleteAvatar = (e: any) => {
        e.preventDefault();
        this.props.deleteAvatar();
    }

    deleteAddress = (address: AddressInterface) => {
        const {user} = this.props;
        let addresses = user?.addresses;
        addresses = addresses?.filter((a: AddressInterface) => a !== address);
        this.updateUserState("addresses", addresses);
    }

    editAddress = (editedAddress: AddressInterface = defaultAddress) => this.setState({
        showEditAddressModal: true,
        editedAddress
    });

    addAddresses = () => this.setState({showEditAddressModal: true, editedAddress: defaultAddress});

    hideModal = () => this.setState({showEditAddressModal: false});

    saveAddress = (updatedAddress: AddressInterface) => {
        const {user} = this.props;
        const {editedAddress} = this.state;
        let isFound = false;
        let addresses = user?.addresses;
        addresses = addresses?.map((a: AddressInterface) => {
            if (a === editedAddress && !isFound) {
                a = Object.assign(editedAddress, updatedAddress);
                isFound = true;
            }
            return a;
        });
        if (!isFound) addresses?.push(updatedAddress);
        this.updateUserState("addresses", addresses);
        this.hideModal();
    }

    render() {
        const {user} = this.props;
        const {editedAddress, showEditAddressModal} = this.state;

        return (
            <div className="my-profile-edit">
                <Typography.Title style={{margin: "20px 0"}} level={5}>Main Details</Typography.Title>
                <Form labelCol={{span: 6}}
                      wrapperCol={{span: 10}}
                      ref={this.formRef}
                      onFinish={this.onFinish}
                      className="user-form"
                      layout="horizontal">
                    <Form.Item label="Avatar" name="avatar">
                        <div className="avatar-container">
                            <Row gutter={[10, 10]} align="middle">
                                    <Col>
                                        {
                                            user?.avatar
                                                ? <Avatar src={user?.avatar} size={42}/>
                                                : <Avatar icon={<UserOutlined/>} size={42}/>
                                        }
                                    </Col>
                                <Col>
                                    <Upload onChange={this.uploadFile} beforeUpload={() => false}
                                            showUploadList={false}>
                                        <Button type="primary" style={{marginLeft: 15}} icon={<CloudUploadOutlined/>}>
                                            Upload New Avatar
                                        </Button>
                                    </Upload>
                                </Col>
                                <Col>
                                    {
                                        user?.avatar &&
                                        <Button icon={<CloseOutlined/>}
                                                style={{marginLeft: 15}}
                                                onClick={this.deleteAvatar}>Delete</Button>
                                    }
                                </Col>
                            </Row>

                            <div className="description">JPG, GIF, PNG, 256x256 pixels</div>
                        </div>
                    </Form.Item>
                    <Form.Item label="Email" name="email" required>
                        <Input placeholder="Enter email"
                               onChange={(e) => this.updateUserPrimaryEmail(e)}/>
                    </Form.Item>
                    <Form.Item label="Username" name="username"
                               rules={[{required: true, message: "Please input your username"}]}>
                        <Input placeholder="Enter username"
                               name="username"
                               onChange={(e) => this.updateUserProperty(e, "username")}/>
                    </Form.Item>
                    <Form.Item label="Full Name" name="fullName">
                        <Input placeholder="Enter full name"
                               onChange={(e) => this.updateUserProperty(e, "fullName")}/>
                    </Form.Item>
                    <Form.Item label="Nick Name" name="nickName">
                        <Input placeholder="Enter nick name"
                               onChange={(e) => this.updateUserProperty(e, "nickName")}/>
                    </Form.Item>
                    <Form.Item label="Additional Email">
                        {this.renderAdditionalEmails()}
                        <Button type="link" className="p-0" onClick={this.addEmail}>
                            <PlusOutlined/> Add Email
                        </Button>
                    </Form.Item>
                    <Form.Item label="Phone">
                        {this.renderPhoneNumbers()}
                        <Button type="link" className="p-0" onClick={this.addPhoneNumber}>
                            <PlusOutlined/> Add Phone
                        </Button>
                    </Form.Item>
                    <Row>
                        <Col span={15}>
                            <Typography.Title style={{margin: "20px 0"}} level={5} className="d-flex-justify">
                                Address information
                                <Button type="link" className="p-0" onClick={this.addAddresses}><PlusOutlined/> Add
                                    Address</Button>
                            </Typography.Title>
                            <div className="address-info-container">
                                {user?.addresses.length === 0 &&
                                <div className="empty-container">Addresses list is empty</div>}
                                {user?.addresses.map(a =>
                                    <Address key={a.id} address={a} editAddress={this.editAddress}
                                             deleteAddress={this.deleteAddress}/>)}
                            </div>
                            <Button type="primary" htmlType="submit">Save Profile Changes</Button>
                        </Col>
                    </Row>
                </Form>
                <AddressEdit visible={showEditAddressModal} address={editedAddress} onCancel={this.hideModal}
                             saveAddress={this.saveAddress}/>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    const {user, groups} = state.users;
    return {user, groups};
};

const mapDispatchToProps = {
    getUser: usersActions.getUser,
    setUser: usersActions.setUser,
    getGroups: usersActions.getGroups,
    setPageTitle: mainActions.setPageTitle,
    updateUser: usersActions.updateUser,
    uploadUserPhoto: usersActions.uploadUserPhoto,
    deleteAvatar: usersActions.deleteAvatar,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileEdit);

