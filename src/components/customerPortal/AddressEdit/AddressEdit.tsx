import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {AddressEditProps, AddressEditState} from "../../../interfaces/user";
import {Input, Button, Typography, Form} from 'antd';
import './AddressEdit.scss';


class AddressEdit extends React.Component<AddressEditProps, AddressEditState> {
    constructor(props: AddressEditProps) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <div className="address-info">
                <Typography.Title level={5}>Home</Typography.Title>
                <div className="text-info">Test Date</div>
                <div className="text-info">Test Address</div>
                <div className="formatted">Formatted</div>
                <div className="btn-container">
                    <Button>Edit</Button><Button>Delete</Button>
                </div>
                <Form.Item>
                    <Input type="radio" checked={true} /> Primary Address
                </Form.Item>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
    }
};

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressEdit)

