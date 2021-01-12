import React from "react";
import "antd/dist/antd.css";
import {Router, Switch, Route} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import Error404 from "../../pages/Error404";
import {Spin} from "antd";
import {RootState} from "../../redux/reducer";
import {connect} from "react-redux";
import helpers from "../../helpers";
import SignIn from "../../pages/Auth/SignIn/SignIn";
import {AuthProps, AuthState} from "../../interfaces/auth";


const links = {
    signIn: "",
};

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }


    render() {
        const {loading, match} = this.props;
        const {path} = match;

        return (
            <Router history={history}>
                <div className="customer-portal">
                    <Spin tip="Loading..." spinning={loading}>
                        <Switch>
                            <Route exact path={helpers.getPagePath(path, links.signIn)} component={SignIn}/>

                            <Route path="**" exact={true} component={Error404} />
                        </Switch>

                    </Spin>
                </div>
            </Router>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        loading: state.main.loading,
    }
};

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
