import './guessrow.css';
import './guessrow-mobile.css';

export const GuessRow = ({ index, word, guess, setGameOver, theme }) => {
    const zeroEmojis = ["🙂‍↔️", "🙅‍♂️", "💩", "🤷‍♂️"];

    const evaluateGuess = (word, guess) => {
        let bulls = 0;
        let cows = 0;
    
        const wordLetters = Array.from(word);
        const guessLetters = Array.from(guess);
    
        const bullsTracker = Array(word.length).fill(false);
        const cowsTracker = Array(guess.length).fill(false);
    
        for (let i = 0; i < guess.length; i++) {
          if (guessLetters[i] === wordLetters[i]) {
            bulls += 1;
            bullsTracker[i] = true;
            wordLetters[i] = null;
          }
        }
    
        for (let i = 0; i < guess.length; i++) {
          if (!bullsTracker[i]) {
            const letterIndex = wordLetters.indexOf(guessLetters[i]);
            if (letterIndex !== -1) {
              cows += 1;
              wordLetters[letterIndex] = null;
              cowsTracker[i] = true;
            }
          }
        }

        if (bulls == 0 && cows == 0) {
            return zeroEmojis[index % zeroEmojis.length];
        }
        if (bulls == word.length) {
            setGameOver(true);
        }
    
        return theme[2].repeat(bulls) + theme[3].repeat(cows);
    }

    return (
        <>
            <div className='guessrow'>
                <div className='guess-container'>
                    <div className='guess'>{guess}</div>
                </div>
                <div className='result-container'>
                    <div className='result'>{evaluateGuess(word, guess)}</div>
                </div>
            </div>
        </>
    );
};