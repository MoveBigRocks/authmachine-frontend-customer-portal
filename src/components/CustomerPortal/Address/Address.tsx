import React from "react";
import {AddressProps} from "../../../interfaces/user";
import {Checkbox, Button, Typography} from "antd";
import "./Address.scss";

const Address = ({address, deleteAddress, editAddress}: AddressProps) => {
    return (
        <div className="address-info">
            <Typography.Title level={5}>{address?.type}</Typography.Title>
            <div className="text-info">{address?.streetAddress}</div>
            <div className="text-info">
                {address.region && `${address.region}, `}
                {address.locality && `${address.locality}, `}
                {address.postalCode && `${address.postalCode} `}
            </div>
            {address.formatted && <div className="formatted">Formatted</div>}
            <div className="btn-container">
                <Button onClick={() => editAddress(address)}>Edit</Button>
                <Button onClick={() => deleteAddress(address)}>Delete</Button>
            </div>
            <Checkbox checked={address?.primary}>
                Primary Address
          </Checkbox>
        </div>
    )
};

export default Address;