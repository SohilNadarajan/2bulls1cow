import './infopopup.css';
import './infopopup-mobile.css';
import React, { useState, useEffect } from 'react';

export const InfoPopup = () => {
    return (
        <>
            <div className='infopopup'>
                <h1 className='popup-name'>How to Play</h1>
                <p className='popup-text'><em>Bulls and Cows</em> is a code-breaking game that requires you to make guesses to discover the hidden word. Guess the word over time by using the positional clues revealed after each guess.</p>
                <ul className='popup-list'>
                    <li>The hidden word has four unique letters</li>
                    <li>Guesses must have four unique letters</li>
                    <li>Guesses must be valid English words</li>
                    <li>Each guess reveals the number of matching letters with <b>BULLS 🐂</b> and <b>COWS 🐄</b></li>
                    <li>An exact positional match is a <b>BULL 🐂</b>, meaning a letter in your guess is in the same position as a letter in the hidden word</li>
                    <li>A partial positional match is a <b>COW 🐄</b>, meaning a letter in your guess is in the hidden word but not in the same position as your guess</li>
                    <li>Guesses with no matching letters are indicated by one of these: 🙂‍↔️, 🙅‍♂️, 💩, 🤷‍♂️</li>
                </ul>
                <p className='popup-text'>For example, if the hidden word were <b>RACK</b>...</p>
                <ul className='popup-list'>
                    <li>The guess <b>CANE</b> has 1 bull (<b>A</b>) and 1 cow (<b>C</b>)</li>
                    <li>The guess <b>LACE</b> has 2 bulls (<b>A</b> and <b>C</b>) and 0 cows</li>
                    <li>The guess <b>RACK</b> has 4 bulls</li>
                </ul>
                <p className='popup-text'>Happy guessing! 🐂 🐂 🐄</p>
            </div>
        </>
    );
};