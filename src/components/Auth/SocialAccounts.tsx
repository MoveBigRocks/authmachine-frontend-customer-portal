import React, { useEffect } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { usersActions } from "../../redux/actions/usersActions";
import { SocialInterface } from '../../interfaces/socials';

import Amazon from "../../staticfiles/images/social-icons/amazon.svg";
import Facebook from "../../staticfiles/images/social-icons/facebook.svg";
import Github from "../../staticfiles/images/social-icons/github.svg";
import Google from "../../staticfiles/images/social-icons/google.svg";
import LinkedIn from "../../staticfiles/images/social-icons/linkedin.svg";
import OAuth from "../../staticfiles/images/social-icons/oauth.svg";
import OpenId from "../../staticfiles/images/social-icons/openid.svg";
import Paypal from "../../staticfiles/images/social-icons/paypal.svg";
import SalesForce from "../../staticfiles/images/social-icons/salesforce.svg";
import Twitter from "../../staticfiles/images/social-icons/twitter.svg";
import WindowsLive from "../../staticfiles/images/social-icons/windowslive.svg";
import helpers from "../../helpers";


const SocialAccounts = ({socials, getSocials, type}: any) => {
    useEffect(() => {
        getSocials();
    }, [getSocials]);

    const getIconByProvider = (name: string) => {
        switch (name) {
            case 'amazon':
                return Amazon;
            case 'facebook':
                return Facebook;
            case 'github':
                return Github;
            case 'google':
                return Google;
            case 'linkedin':
                return LinkedIn;
            case 'oauth':
                return OAuth;
            case 'openid':
                return OpenId;
            case 'paypal':
                return Paypal;
            case 'salesforce':
                return SalesForce;
            case 'twitter':
                return Twitter;
            case 'windowslive':
                return WindowsLive;
        }
    }

    return (
        <>
            {socials.length > 0 && <div className="socials">
                {socials.map((s: SocialInterface) => (
                    // <Link to={s.url}>
                        <Button size="large" key={s.id}><img style={{marginRight: 10}} src={getIconByProvider(s.provider)} alt={s.name}/>
                            {type === 'login' ? 'Login' : 'Sign up'} with {helpers.getTitleWithUpper(s.name)}
                        </Button>
                    // </Link>
                ))}
            </div>}
        </>
    )
};

const mapStateToProps = (state: any) => {
    const {socials} = state.users;
    return {
        socials,
    }
};

const mapDispatchToProps = {
    getSocials: usersActions.getSocials,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialAccounts);