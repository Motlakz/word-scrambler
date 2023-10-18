const inputFields = document.querySelectorAll('.box');
const resetButton = document.getElementById('resetButton');

// Add an event listener to the Reset button
resetButton.addEventListener('click', function() {
    // Clear all input fields and focus on the first input element
    inputFields.forEach((input) => {
        input.value = '';
    });
    inputFields[0].focus();
});

inputFields.forEach((input, index) => {
    input.addEventListener('input', function() {
        if (this.value.length === 1) {
            // If a character is entered, focus on the next input box
            const nextIndex = index + 1;
            if (nextIndex < inputFields.length) {
                inputFields[nextIndex].focus();
            }
        } else if (this.value.length === 0) {
            // If the input is empty, revert focus to the previous input
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputFields[prevIndex].focus();
            }
        }
    });
});
