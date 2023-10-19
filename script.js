const inputFields = document.querySelectorAll('.box');
const resetButton = document.getElementById('resetButton');
const textInput = document.getElementById('text');
const triesElement = document.querySelector('.tries');
const dots = document.querySelectorAll('.dots .circle-fill');
const failsElement = document.querySelector('.fails');
        
let attempts = 0;
const maxAttempts = 5;
let originalWord = '';

// Predefined words
const validWords = ["apple", "banana", "cherry", "defs", "easter", "grapes", "helper", "indigo", "jockey", "keys"];

        
function updateTries() {
    triesElement.textContent = `Tries: ${attempts}/${maxAttempts}`;
}

function resetDots() {
    dots.forEach(dot => dot.classList.remove('purple-dot'));
}

function shuffleWord(word) {
    const wordChars = word.split('');

    for (let i = wordChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
            [wordChars[i], wordChars[j]] = [wordChars[j], wordChars[i]];
        }
    return wordChars.join('');
}

function findIncorrectLetters(currentWord, originalWord) {
    let incorrectLetters = 0;

    for (let i = 0; i < originalWord.length; i++) {
        if (currentWord[i] !== originalWord[i]) {
            incorrectLetters++;
        }
    }
    return incorrectLetters;
}

function getMistakes(currentWord, originalWord) {
    const mistakes = [];

    for (let i = 0; i < originalWord.length; i++) {
        if (currentWord[i] !== originalWord[i]) {
            mistakes.push(currentWord[i]);
        }
    }
    return mistakes.join('');
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < attempts) {
            dot.classList.add('purple-dot'); // Turn the dot purple for each attempt
        } else {
            dot.classList.remove('purple-dot'); // Remove purple dot class for unused attempts
        }
    });
}

resetButton.addEventListener('click', () => {
    inputFields.forEach(input => input.value = '');
    textInput.value = '';
    attempts = 0;
    updateTries();
    resetDots();
    failsElement.textContent = 'Mistakes: ';
    inputFields[0].focus();
});

const randomButton = document.querySelector('.random');

randomButton.addEventListener('click', () => {
    if (attempts < maxAttempts) {
        attempts++;
        updateTries();
        updateDots();
        const randomIndex = Math.floor(Math.random() * validWords.length);
        originalWord = validWords[randomIndex];
        const shuffledWord = shuffleWord(originalWord);
        textInput.placeholder = shuffledWord;
    } else {
        alert('You have reached the maximum number of tries.');
        inputFields.forEach(input => input.disabled = true);
    }
});

inputFields.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        if (event.inputType === "insertText" && input.value.length === 1) {
            const nextIndex = index + 1;
            if (nextIndex < inputFields.length) {
                inputFields[nextIndex].focus();
            }
        } else if (event.inputType === "deleteContentBackward" && input.value.length === 0) {
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputFields[prevIndex].focus();
            }
        }
        const currentWord = Array.from(inputFields, input => input.value).join('');
        const incorrectLetters = findIncorrectLetters(currentWord, originalWord);
        updateDots();
        failsElement.textContent = `Mistakes: ${getMistakes(currentWord, originalWord)}`;
        if (incorrectLetters === 0 && currentWord.length === originalWord.length) {
            inputFields.forEach(input => input.disabled = true);
            alert('🎉 Success');
            randomButton.click();
            clearInputFields();
            inputFields.forEach(input => input.disabled = false);
        }
    });
});

function clearInputFields() {
    inputFields.forEach(input => input.value = '');
}

randomButton.click();
