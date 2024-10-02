import './gameheader.css';
import React, { useState, useEffect } from 'react';
import { InfoPopup } from '../infopopup/infopopup';
import { SettingsPopup } from '../settingspopup/settingspopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear, faLink } from '@fortawesome/free-solid-svg-icons';
import { LinkPopup } from '../linkpopup/linkpopup';

export const GameHeader = ({ gameProps }) => {
    const [isScreenVisible, setIsScreenVisible] = useState(false);
    const [isInfoPopupVisible, setIsInfoPopupVisible] = useState(false);
    const [isLinkPopupVisible, setIsLinkPopupVisible] = useState(false);
    const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);

    const infoPopup = () => {
        setIsScreenVisible(true);
        setIsInfoPopupVisible(true);
    };

    const linkPopup = () => {
        setIsScreenVisible(true);
        setIsLinkPopupVisible(true);
    };

    const settingsPopup = () => {
        setIsScreenVisible(true);
        setIsSettingsPopupVisible(true);
    };

    const disableScreen = () => {
        setIsScreenVisible(false);
        setIsInfoPopupVisible(false);
        setIsLinkPopupVisible(false);
        setIsSettingsPopupVisible(false);
    };

    return (
        <>
            {isScreenVisible && <div className='cover-screen' onClick={() => disableScreen()}></div>}
            {isInfoPopupVisible && <InfoPopup />}
            {isLinkPopupVisible && <LinkPopup gameProps={gameProps}/>}
            {isSettingsPopupVisible && <SettingsPopup gameProps={gameProps}/>}
            <div className='game-header'>
                <div className='header-icon' onClick={() => infoPopup()}><FontAwesomeIcon icon={faCircleInfo} /></div>
                <div className='header-icon' onClick={() => linkPopup()}><FontAwesomeIcon icon={faLink} /></div>
                <div className='header-icon' onClick={() => settingsPopup()}><FontAwesomeIcon icon={faGear} /></div>
            </div>
        </>
    );
};