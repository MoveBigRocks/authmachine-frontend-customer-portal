import React, { useEffect } from "react";
import {connect} from "react-redux";
import {RootState} from "../../redux/reducer";
import {SitesEnabledProps} from "../../interfaces/customerPortal/sitesEnabled";
import SiteItem from "../../components/customerPortal/SiteItem/SiteItem";
import { Row, Col } from "antd";
import {applicationActions} from "../../redux/actions/applicationActions";
import {mainActions} from "../../redux/actions/mainActions";

export const SitesEnabled = ({applications, getApplications, setPageTitle}: SitesEnabledProps) => {

    useEffect(() => getApplications(), [getApplications]);

    useEffect(() => setPageTitle("Sites Enabled"), [setPageTitle]);

    return (
        <>
            <p style={{fontSize: 18}}>Sites where you can authenticate using AuthMachine:</p>
            <Row gutter={16}>
                {applications.map((s) => (
                    <Col key={s.id} className="gutter-row" span={12} style={{marginBottom: 16}}>
                        <SiteItem item={s} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    const {applications} = state.application;
    return {
        applications,
    }
};

const mapDispatchToProps = {
    getApplications: applicationActions.getApplications,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesEnabled);