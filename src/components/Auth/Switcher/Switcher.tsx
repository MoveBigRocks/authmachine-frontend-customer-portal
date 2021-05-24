import React from "react";
import "./Switcher.scss";
import {Link} from "react-router-dom";
import SwitcherProps from "../../../interfaces/auth/switcher";

const Switcher = (props: SwitcherProps) => {
    return (
        <Link to={props.link}>
            {(props.active) ?
                (
                    <div className="active">{props.title}</div>
                ) : (
                    <div className="sign-link">{props.title}</div>
                )
            }
        </Link>
    )
};

export default Switcher;
