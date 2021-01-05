import React from 'react';
import {Typography} from 'antd';
import './AddressDetail.scss';
import {AddressInterface} from "../../../interfaces/address";


const AddressDetail = (address: AddressInterface) => {
    return (
        <div className="address-info">
            <Typography.Title level={5}>{address?.type}</Typography.Title>
            <div className="text-info">{address?.streetAddress}</div>
            <div className="text-info">
                {address.region &&  `${address.region}, `}
                {address.locality && `${address.locality}, `}
                {address.postalCode && `${address.postalCode} `}
            </div>
            {address.formatted && <div className="formatted">Formatted</div>}
            {address.primary && <div className="primary f-bold">Primary</div>}
        </div>
    )
}

export default AddressDetail;

