import './linkpopup.css';
import './linkpopup-mobile.css';
import React, { useState, useEffect } from 'react';

export const LinkPopup = ({ gameProps }) => {
    const [wordList, setWordList] = useState([]);
    const [customWord, setCustomWord] = useState("");
    const [customRestriction, setCustomRestriction] = useState("--");
    const [customRestrictionVisibility, setCustomRestrictionVisibility] = useState("hidden");
    const [customLink, setCustomLink] = useState("");
    const [allowCopy, setAllowCopy] = useState(false);

    useEffect(() => {
        import('../EOWL/allWords')
        .then((module) => {
            const { allWords } = module;
            setWordList(allWords);
        })
        .catch((err) => console.error("Error importing words:", err));
    }, []);

    const restrictGuess = (msg) => {
        setAllowCopy(false);
        setCustomRestriction(msg);
        setCustomRestrictionVisibility("visible");
    }

    const hasRepeatingLetters = (word) => {
        const uniqueLetters = new Set(word.toUpperCase());
        return uniqueLetters.size !== word.length;
    };

    const createCustomLink = () => {
        if (customWord.length != gameProps.guessLength) {
            restrictGuess(`Guess must be ${gameProps.guessLength} letters long!`);
            return;
        }
        if (!/^[A-Za-z]*$/.test(customWord)) {
            restrictGuess("Guess must contain only letters!");
            return;
        }
        if (hasRepeatingLetters(customWord) && !gameProps.repeatedLetters) {
            restrictGuess("Guess must contain unique letters. No repeats!");
            return;
        }
        if (customWord.endsWith("S") && !gameProps.allowEndInS) {
            restrictGuess("Guess cannot end in an 'S'!");
            return;
        }
        if (!wordList.includes(customWord.toLowerCase()) && !gameProps.hardcoreMode) {
            restrictGuess(`Guess must be a real word!`);
            return;
        }

        setAllowCopy(true);
        let link = `http://localhost:3001/?w=${encryptToNumber(customWord)}&gpgl=${gameProps.guessLength}&gprl=${gameProps.repeatedLetters}&gpas=${gameProps.allowEndInS}&gphm=${gameProps.hardcoreMode}`;
        setCustomLink(link);
        setCustomRestrictionVisibility("hidden");
    }

    const encryptToNumber = (word) => {
        const offset = Math.floor(Math.random() * 10);
        const obfuscatedCodes = word.split('').map(char => {
            const charCode = char.charCodeAt(0) + offset;
            return String(charCode).padStart(3, '0');
        });
        
        const prefix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${offset}${obfuscatedCodes.join('')}`;
    };

    const copyLinkToClipboard = () => {
        if (!allowCopy) { return; }
        navigator.clipboard.writeText(customLink)
            .then(() => {
                console.log("Link copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy link: ", err);
            });
    }

    const handleSubmitCustomWord = (e) => {
        if (e.key === 'Enter') {
            createCustomLink();
        }
    };

    return (
        <>
            <div className='linkpopup'>
                <h1 className='popup-name'>Custom Link</h1>
                <input 
                    className='input-box-custom-word' 
                    placeholder={"CUSTOM"} 
                    onChange={(e) => setCustomWord(e.target.value.toLocaleUpperCase())} 
                    value={customWord.toUpperCase()} 
                    onKeyPress={handleSubmitCustomWord}
                    maxLength={gameProps.guessLength}
                    type='text'
                    pattern="[A-Za-z]">
                </input>
                <div className='guess-restrictions' style={{visibility: customRestrictionVisibility}}>
                    {customRestriction}
                </div>
                <div className='button-custom-word' 
                     onClick={copyLinkToClipboard} 
                     style={{cursor: `${allowCopy ? 'pointer' : 'not-allowed'}`, 
                             backgroundColor: `${allowCopy ? 'black' : 'dimgray'}`,
                             textDecoration: `${allowCopy ? 'none' : 'line-through'}`}}>
                    COPY LINK
                </div>
            </div>
        </>
    );
};