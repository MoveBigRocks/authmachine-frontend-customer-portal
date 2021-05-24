import React from "react";
import {useHistory} from "react-router-dom";
import "./BackIcon.scss";

const BackIcon = ({display}: { display: boolean }) => {
    let history = useHistory();
    return display ? (
        <div className="back-icon" onClick={() => history.goBack()}>
            <div className="back-svg">
                <svg className="back-svg" width="9" height="14" viewBox="0 0 9 14" fill="black"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.78616 1.75495V0.374591C8.78616 0.254949 8.64866 0.188877 8.5558 0.262091L0.505801 6.54959C0.437405 6.60278 0.382062 6.67089 0.343992 6.74872C0.305923 6.82656 0.286133 6.91206 0.286133 6.9987C0.286133 7.08534 0.305923 7.17084 0.343992 7.24868C0.382062 7.32651 0.437405 7.39462 0.505801 7.44781L8.5558 13.7353C8.65044 13.8085 8.78616 13.7425 8.78616 13.6228V12.2424C8.78616 12.155 8.74509 12.071 8.67723 12.0175L2.24866 6.99959L8.67723 1.97995C8.74509 1.92638 8.78616 1.84245 8.78616 1.75495Z"
                        fill="black" fill-opacity="0.85"/>
                </svg>
            </div>
            <div className="back-title">Back</div>
        </div>
    ) : null;
}

export default BackIcon;
