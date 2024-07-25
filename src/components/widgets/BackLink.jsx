import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useNavigationHistory } from './Navigator';

const BackLink = ({ backlink, force = false }) => {
    const navigate = useNavigate();
    const goBack = (e) => {
        if(!force) {
            e.preventDefault();
            navigate(-1);
        }
    };

    // const { history, removeLastEntry } = useNavigationHistory();

    // const previousUrl = !force && (history.length > 1) && (history[history.length - 1] != history[history.length - 2])
    // ?  history[history.length - 2]
    // : backlink;

    // const handleClick = () => {
    //     if (history.length > 1) {
    //         removeLastEntry();
    //         removeLastEntry();
    //     }
    // };

    return (
        <NavLink to={backlink} onClick={goBack} style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
            <FontAwesomeIcon icon={all.faArrowLeft}/>
        </NavLink>
    );
};

export default BackLink;