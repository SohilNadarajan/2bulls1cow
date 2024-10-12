import './gameheader.css';
import './gameheader-mobile.css';
import React, { useState, useEffect } from 'react';
import { InfoPopup } from '../infopopup/infopopup';
import { FlagPopup } from '../flagpopup/flagpopup';
import { SettingsPopup } from '../settingspopup/settingspopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear, faLink, faFlag } from '@fortawesome/free-solid-svg-icons';
import { LinkPopup } from '../linkpopup/linkpopup';

export const GameHeader = ({ gameProps }) => {
    const [isScreenVisible, setIsScreenVisible] = useState(false);
    const [isInfoPopupVisible, setIsInfoPopupVisible] = useState(false);
    const [isFlagPopupVisible, setIsFlagPopupVisible] = useState(false);
    const [isLinkPopupVisible, setIsLinkPopupVisible] = useState(false);
    const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);

    const infoPopup = () => {
        setIsScreenVisible(true);
        setIsInfoPopupVisible(true);
    };

    const flagPopup = () => {
        setIsScreenVisible(true);
        setIsFlagPopupVisible(true);
    }

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
        setIsFlagPopupVisible(false);
        setIsLinkPopupVisible(false);
        setIsSettingsPopupVisible(false);
    };

    return (
        <>
            {isScreenVisible && <div className='cover-screen' onClick={() => disableScreen()}></div>}
            {isInfoPopupVisible && <InfoPopup />}
            {isFlagPopupVisible && <FlagPopup gameProps={gameProps} disableScreen={disableScreen}/>}
            {isLinkPopupVisible && <LinkPopup gameProps={gameProps}/>}
            {isSettingsPopupVisible && <SettingsPopup gameProps={gameProps}/>}
            <div className='game-header'>
                <div className='header-icon' onClick={() => infoPopup()}><FontAwesomeIcon icon={faCircleInfo} /></div>
                <div className='header-icon' onClick={() => flagPopup()}><FontAwesomeIcon icon={faFlag} /></div>
                <div className='header-icon' onClick={() => linkPopup()}><FontAwesomeIcon icon={faLink} /></div>
                <div className='header-icon' onClick={() => settingsPopup()}><FontAwesomeIcon icon={faGear} /></div>
            </div>
        </>
    );
};