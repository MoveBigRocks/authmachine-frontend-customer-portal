import React, {useEffect} from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Alert, Spin, Space} from "antd";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {ActivateFinishProps} from "../../interfaces/auth/activateFinish";


const ActivateFinish = ({status, message, finishActivation, match}: ActivateFinishProps) => {
    const {token} = match.params;
    const loading = !status && message === "";

    useEffect(() => {
        finishActivation(token);
    }, [finishActivation, token]);

    return (
        <div className="form-container">
            <div className="form-content">
                <img src={Logo} alt="AuthMachine" className="logo" />
                <Space size="middle" className="d-flex-cc" >
                    {loading && <Spin size="large" spinning={loading} />}
                    {!loading && (
                        status ? (
                            <Alert
                              style={{width: "100%"}}
                              message="Registration was finished!"
                              description="Congratulations! Your account is successfully activated! You can log in now."
                              type="success"
                              showIcon
                            />
                        ) : (
                            <Alert
                              style={{width: "100%"}}
                              message="Error!"
                              description={message}
                              type="error"
                              showIcon
                            />
                        )
                    )}

                </Space>

            </div>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {operationStatus, message} = state.user;
    return {
        status: operationStatus,
        message,
    }
};

const mapDispatchToProps = {
    finishActivation: userActions.finishActivation,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateFinish);
