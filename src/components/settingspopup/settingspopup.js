import './settingspopup.css';
import React, { useState, useEffect } from 'react';

export const SettingsPopup = ({ gameProps }) => {
    return (
        <>
            <div className='infopopup'>
                <h1 className='popup-name'>Settings</h1>
                <p className='popup-text'>Number of Letters</p>
                <div id="group1" className='radio-button-group'>
                    <div className='radio-div' onClick={() => gameProps.setGuessLength(4)} >
                        <input 
                            type="radio" 
                            value="value1" 
                            name="group1" 
                            checked={gameProps.guessLength === 4} 
                            onChange={() => gameProps.setGuessLength(4)} 
                        />
                        4 letter word
                    </div>
                    <div className='radio-div' onClick={() => gameProps.setGuessLength(5)} >
                        <input 
                            type="radio" 
                            value="value2" 
                            name="group1" 
                            checked={gameProps.guessLength === 5} 
                            onChange={() => gameProps.setGuessLength(5)} 
                        />
                        5 letter word
                    </div>
                    <div className='radio-div' onClick={() => gameProps.setGuessLength(6)} >
                        <input 
                            type="radio" 
                            value="value2" 
                            name="group1" 
                            checked={gameProps.guessLength === 6} 
                            onChange={() => gameProps.setGuessLength(6)} 
                        />
                        6 letter word
                    </div>
                </div>
                <p className='popup-text'>Repeated Letters</p>
                <div id="group2" className='radio-button-group'>
                    <div className='radio-div' onClick={() => gameProps.setRepeatedLetters(false)}>
                        <input 
                            type="radio" 
                            value="value1" 
                            name="group2" 
                            checked={gameProps.repeatedLetters === false} 
                            onChange={() => gameProps.setRepeatedLetters(false)}
                        />
                        Disallow repeated letters
                    </div>
                    <div className='radio-div' onClick={() => gameProps.setRepeatedLetters(true)}>
                        <input 
                            type="radio" 
                            value="value2" 
                            name="group2" 
                            checked={gameProps.repeatedLetters === true} 
                            onChange={() => gameProps.setRepeatedLetters(true)}
                        />
                        Allow repeated letters
                    </div>
                </div>
                <p className='popup-text'>Allow Words Ending in '<b>S</b>'</p>
                <div id="group3" className='radio-button-group'>
                    <div className='radio-div' onClick={() => gameProps.setAllowEndInS(false)}>
                        <input 
                            type="radio" 
                            value="value1" 
                            name="group3" 
                            checked={gameProps.allowEndInS === false} 
                            onChange={() => gameProps.setAllowEndInS(false)}
                        />
                        Disallow words ending in 'S'
                    </div>
                    <div className='radio-div' onClick={() => gameProps.setAllowEndInS(true)}>
                        <input 
                            type="radio" 
                            value="value2" 
                            name="group3" 
                            checked={gameProps.allowEndInS === true} 
                            onChange={() => gameProps.setAllowEndInS(true)}
                        />
                        Allow words ending in 'S'
                    </div>
                </div>
                <p className='popup-text'>Hardcode Mode: Random Sequence of Letters</p>
                <div id="group4" className='radio-button-group'>
                    <div className='radio-div' onClick={() => gameProps.setHardcoreMode(false)}>
                        <input 
                            type="radio" 
                            value="value1" 
                            name="group4" 
                            checked={gameProps.hardcoreMode === false} 
                            onChange={() => gameProps.setHardcoreMode(false)}
                        />
                        Disable
                    </div>
                    <div className='radio-div' onClick={() => gameProps.setHardcoreMode(true)}>
                        <input 
                            type="radio" 
                            value="value2" 
                            name="group4" 
                            checked={gameProps.hardcoreMode === true} 
                            onChange={() => gameProps.setHardcoreMode(true)}
                        />
                        Enable
                    </div>
                </div>
            </div>
        </>
    );
};