import { SiteItemProps } from "../../../interfaces/customerPortal/sitesEnabled";
import React from "react";
import "./SiteItem.scss";
import { Meta } from "antd/lib/list/Item";
import { Card } from "antd";
import {BorderOutlined, RightOutlined} from "@ant-design/icons";

export default function SiteItem(props: SiteItemProps) {
    const {name, siteUrl, loginUrl} = props.item;
    const redirectUrl = (loginUrl !== null && loginUrl !== "") ? loginUrl : siteUrl;
    return (
        <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
            <Card className="site-item">
                <Meta
                    avatar={<div className="avatar"><BorderOutlined style={{fontSize: '36px'}} /></div> }
                    title={name}
                    description={siteUrl}
                />
                <RightOutlined className="right-arrow" />
            </Card>
        </a>
    )
}