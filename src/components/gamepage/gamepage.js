import './gamepage.css';
import React, { useState, useEffect } from 'react';
import { Game } from '../game/game.js';
import { GameHeader } from '../gameheader/gameheader.js';
import { LogoImage } from '../logoimage/logoimage.js';

export const GamePage = () => {
    const themes = [
        ["bull.png", "cow.png", "🐂", "🐄"],
        ["swan.png", "flamingo.png", "🦢", "🦩"],
        ["zebra.png", "giraffe.png", "🦓", "🦒"],
        ["monkey.png", "orangutan.png", "🐒", "🦧"]
    ];
    const [theme, setTheme] = useState(themes[0]);
    const themeProps = {
        theme,
        themes,
        setTheme
    }

    const [guessLength, setGuessLength] = useState(4);
    const [repeatedLetters, setRepeatedLetters] = useState(false);
    const [allowEndInS, setAllowEndInS] = useState(false);
    const [hardcoreMode, setHardcoreMode] = useState(false);
    const gameProps = {
        guessLength,
        setGuessLength,
        repeatedLetters,
        setRepeatedLetters,
        allowEndInS,
        setAllowEndInS,
        hardcoreMode,
        setHardcoreMode
    }

    return (
        <>
            <GameHeader gameProps={gameProps}/>
            <LogoImage theme={theme} />
            <Game themeProps={themeProps} gameProps={gameProps} />
        </>
    );
};