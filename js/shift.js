const plainText = document.getElementById("plain_text");
const cipherText = document.getElementById("cipher_text");
const key = document.getElementById('key_text');

// Define character sets and the transformation function

// Lowercase alphabet
const alphabate = "abcdefghijklmnopqrstuvwxyz";
// Space character
const space = " ";
// Numeric characters
const num = "1234567890";
// Special characters
const specialChar = "!@#$%^&*),(_+-=|{}[]~`></?/':;.\"";

/**
 * Encrypts the provided plain text using the Caesar cipher method.
 */
const cipher = () => {
    console.log("Cipher button clicked");
    let newText = "";

    // Get the input text and shifting key
    const inputText = plainText.value;
    const shiftingKey = key.value;

    // Iterate through the input text and apply the transformation
    for (let i = 0; i < inputText.length; i++) {
        newText += transform(inputText[i], Number(shiftingKey));
    }

    // Display the encrypted text in uppercase
    cipherText.innerHTML = newText.toUpperCase();
};

/**
 * Transforms a character based on the Caesar cipher with a given key.
 * @param {string} text - The character to transform.
 * @param {number} key - The shifting key for the Caesar cipher.
 * @returns {string} The transformed character.
 */
const transform = (text, key = 3) => {
    // Iterate through special characters, alphabet, numbers, and space
    for (let i = 0; i < specialChar.length; i++) {
        if (text === alphabate[i]) {
            return alphabate[(i + key) % alphabate.length];
        } else if (text === alphabate[i].toUpperCase()) {
            return '~' + alphabate[(i + key) % alphabate.length];
        } else if (num.includes(text)) {
            return num[(num.indexOf(text) + key) % num.length];
        } else if (text === specialChar[i]) {
            return specialChar[(i + key) % specialChar.length];
        } else if (text === space) {
            return '<:>';
        }
    }
    // If the character is not found in the predefined sets, return it as is
    return text;
};