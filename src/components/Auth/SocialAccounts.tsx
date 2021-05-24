import React, {useEffect} from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { usersActions } from "../../redux/actions/usersActions";
import { SocialInterface } from '../../interfaces/socials';
import helpers from "../../helpers";
import {userActions} from "../../redux/actions/userActions";


const SocialAccounts = ({socials, getSocials, type, socialLink, getSocialLink}: any) => {
    useEffect(() => {
        getSocials();
    }, [getSocials]);

    useEffect(() => {
        if (socialLink !== "") {
            helpers.setValueInLocalStorage("connectionType", "login");
            window.location.replace(socialLink);
        }
    }, [socialLink]);

    const btnClasses = {

    }

    return (
        <>
            {socials.length > 0 &&
                <div className="socials">
                    {socials.map((s: SocialInterface) => (
                        <Button className={`social-btn ${helpers.getSocialBtnClasses(s.provider)}`} size="large" key={s.id} onClick={() => getSocialLink(s.provider)}>
                            <img style={{marginRight: 10}} src={helpers.getIconByProvider(s.provider)} alt={s.name}/>
                            {type === "login" ? "Sign In" : "Register"} With {helpers.getTitleWithUpper(s.name)}
                        </Button>
                    ))}
                </div>
            }
        </>
    )
};

const mapStateToProps = (state: any) => {
    const {socials} = state.users;
    const {socialLink} = state.user;
    return {
        socials,
        socialLink,
    }
};

const mapDispatchToProps = {
    getSocials: usersActions.getSocials,
    getSocialLink: userActions.getSocialLink,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialAccounts);
