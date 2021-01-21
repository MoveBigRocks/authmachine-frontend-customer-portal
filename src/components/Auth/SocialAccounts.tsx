import React, { useEffect } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { usersActions } from "../../redux/actions/usersActions";
import { SocialInterface } from '../../interfaces/socials';
import helpers from "../../helpers";


const SocialAccounts = ({socials, getSocials, type}: any) => {
    useEffect(() => {
        getSocials();
    }, [getSocials]);


    return (
        <>
            {socials.length > 0 && <div className="socials">
                {socials.map((s: SocialInterface) => (
                    // <Link to={s.url}>
                        <Button size="large"><img style={{marginRight: 10}} src={helpers.getIconByProvider(s.name)} alt={s.name}/>
                            {type === 'login' ? 'Login' : 'Sign up'} with {s.name}
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