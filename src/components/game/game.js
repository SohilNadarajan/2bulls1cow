import './game.css';
import './game-mobile.css';
import React, { useState, useEffect } from 'react';
import { GuessRow } from '../guessrow/guessrow';
import { allWords } from '../EOWL/allWords';
import Confetti from 'react-dom-confetti';

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 5000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export const Game = ({ themeProps, gameProps }) => {
    const [placeholder, setPlaceholder] = useState("GUESS");
    const [word, setWord] = useState("");
    const [customUsed, setCustomUsed] = useState(false);
    const [wordList, setWordList] = useState([]);
    const [allGuesses, setAllGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [guessRestriction, setGuessRestriction] = useState("--");
    const [guessRestrictionVisibility, setGuessRestrictionVisibility] = useState("hidden");
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const wParam = params.get('w');
        if (wParam) { setWord(decryptFromNumber(wParam).toUpperCase()); }
        else { setCustomUsed(true); }

        const gpgl = parseInt(params.get('gpgl'), 10) || 4;
        const gprl = params.get('gprl') === 'true' ? true : false;
        const gpas = params.get('gpas') === 'true' ? true : false;
        const gphm = params.get('gphm') === 'true' ? true : false;

        gameProps.setGuessLength(gpgl);
        gameProps.setRepeatedLetters(gprl);
        gameProps.setAllowEndInS(gpas);
        gameProps.setHardcoreMode(gphm);
    }, []);

    const decryptFromNumber = (number) => {
        const prefix = number.slice(0, 3);
        const offset = parseInt(number[3]);
        const obfuscatedCodes = number.slice(4).match(/.{1,3}/g);
        return obfuscatedCodes.map(code => String.fromCharCode(parseInt(code) - offset)).join('');
    };

    useEffect(() => {
        import('../EOWL/allWords')
        .then((module) => {
            const { allWords } = module;
            setWordList(allWords);
            if (customUsed) {
                setWord(getRandomWord());
            }
            setAllGuesses([]);
            setGameOver(false);
            setCustomUsed(true);
        })
        .catch((err) => console.error("Error importing words:", err));
    }, [gameProps.guessLength, gameProps.repeatedLetters, gameProps.allowEndInS, gameProps.hardcoreMode]);

    const getRandomWord = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomWord;
        do {
            if (gameProps.hardcoreMode) {
                randomWord = Array.from({ length: gameProps.guessLength }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
            } else {
                randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            }
        } while (randomWord.length !== gameProps.guessLength 
              || hasRepeatingLetters(randomWord) && !gameProps.repeatedLetters
              || randomWord.endsWith("s") && !gameProps.allowEndInS);
        return randomWord.toLocaleUpperCase();
    };

    const restrictGuess = (msg) => {
        setGuessRestriction(msg);
        setGuessRestrictionVisibility("visible");
    }

    const applyGuess = () => {
        if ("BULL" == guess) {
            themeProps.setTheme(themeProps.themes[0]);
        }
        if ("SWAN" == guess) {
            themeProps.setTheme(themeProps.themes[1]);
        }
        if ("ZEBRA" == guess) {
            themeProps.setTheme(themeProps.themes[2]);
        }
        if ("MONKEY" == guess) {
            themeProps.setTheme(themeProps.themes[3]);
        }

        if (guess.length != gameProps.guessLength) {
            restrictGuess(`Guess must be ${gameProps.guessLength} letters long!`);
            return;
        }
        if (!/^[A-Za-z]*$/.test(guess)) {
            restrictGuess("Guess must contain only letters!");
            return;
        }
        if (hasRepeatingLetters(guess) && !gameProps.repeatedLetters) {
            restrictGuess("Guess must contain unique letters. No repeats!");
            return;
        }
        if (guess.endsWith("S") && !gameProps.allowEndInS) {
            restrictGuess("Guess cannot end in an 'S'!");
            return;
        }
        if (!wordList.includes(guess.toLowerCase()) && !gameProps.hardcoreMode) {
            restrictGuess(`Guess must be a real word!`);
            return;
        }

        setAllGuesses((prevGuesses) => [...prevGuesses, guess]);
        setGuessRestrictionVisibility("hidden");
        setGuess("");
    };

    const resetGame = () => {
        import('../EOWL/allWords')
        .then((module) => {
            const { allWords } = module;
            setWord(getRandomWord());
        })
        .catch((err) => console.error("Error importing words:", err));
        setAllGuesses([]);
        setGameOver(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            applyGuess();
        }
    };

    const hasRepeatingLetters = (guess) => {
        const uniqueLetters = new Set(guess.toUpperCase());
        return uniqueLetters.size !== guess.length;
    };

    return (
        <>
            <div className='game'>
                {!gameOver &&
                <input 
                    className='input-box' 
                    placeholder={placeholder} 
                    onChange={(e) => setGuess(e.target.value.toLocaleUpperCase())} 
                    value={guess.toUpperCase()} 
                    onKeyPress={handleKeyPress}
                    maxLength={gameProps.guessLength}
                    type='text'
                    pattern="[A-Za-z]">
                </input>}
                {gameOver && 
                <div className='button' onClick={resetGame}>PLAY AGAIN</div>}
                <Confetti active={ gameOver } config={ config }/>
                <div className='guess-restrictions' style={{visibility: guessRestrictionVisibility}}>
                    {guessRestriction}
                </div>
            </div>
            {allGuesses.slice().reverse().map((guess, index) => (
                <GuessRow 
                    key={index} 
                    index={index} 
                    word={word} 
                    guess={guess} 
                    setGameOver={setGameOver}
                    theme={themeProps.theme}
                />
            ))}
        </>
    );
};