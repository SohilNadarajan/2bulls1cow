import './flagpopup.css';
import './flagpopup-mobile.css';
import React, { useState, useEffect } from 'react';

export const FlagPopup = ({ gameProps, disableScreen }) => {
    const [surrender, setSurrender] = useState("");
    const [surrenderRestrictionVisibility, setSurrenderRestrictionVisibility] = useState("hidden");
    const [allowSurrender, setAllowSurrender] = useState(false);

    const checkSurrender = (e) => {
        if (e != "I GIVE UP") {
            setAllowSurrender(false);
            setSurrenderRestrictionVisibility("visible");
            return;
        }

        setAllowSurrender(true);
        setSurrenderRestrictionVisibility("hidden");
    }

    const handleSubmitSurrender = (e) => {
        setSurrender(e.target.value.toLocaleUpperCase())
        checkSurrender(e.target.value.toLocaleUpperCase());
    };

    const surrenderGame = () => {
        if (!allowSurrender) { return; }
        gameProps.setGiveUp(true);
        disableScreen();
    }

    return (
        <>
            <div className='flagpopup'>
                <h1 className='popup-name'>Give Up?</h1>
                <input 
                    className='input-box-surrender' 
                    placeholder={"I GIVE UP"} 
                    onChange={(e) => handleSubmitSurrender(e)} 
                    value={surrender.toUpperCase()} 
                    onKeyPress={(e) => { if (e.key == 'Enter') { surrenderGame(); }}}
                    maxLength={9}
                    type='text'
                    pattern="[A-Za-z]">
                </input>
                <div className='guess-restrictions' style={{visibility: surrenderRestrictionVisibility}}>
                    Type in "I GIVE UP"
                </div>
                <div className='button-surrender' 
                     onClick={surrenderGame} 
                     style={{cursor: `${allowSurrender ? 'pointer' : 'not-allowed'}`, 
                             backgroundColor: `${allowSurrender ? 'black' : 'dimgray'}`,
                             textDecoration: `${allowSurrender ? 'none' : 'line-through'}`}}>
                    SURRENDER
                </div>
            </div>
        </>
    );
};