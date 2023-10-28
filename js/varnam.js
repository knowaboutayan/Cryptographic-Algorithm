const plaintext = document.getElementById('plain_text'); // Reference to the plaintext input element
const keytext = document.getElementById('key_text'); // Reference to the key input element
const ciphertext = document.getElementById('cipher_text'); // Reference to the ciphertext element
const alphabet = "abcdefghijklmnopqrstuvwxyz";

let modifyKey = (text, key) => {
    let count = key.length;
    while (key.length < text.length) {
        key += key[key.length % count];
    }
    console.log(key.length);
    return key;
}

let indexOfChar = char => {
    for (let i = 0; i < alphabet.length; i++) {
        if (char == alphabet[i]) return i;
    }
}

let cipher = (text, key) => {
    let cipherText = ''; // Modify this line

    // Ensure both text and key are lowercase and without spaces
    text = String(text).trim().split(" ").join("").toLowerCase();
    key = modifyKey(text, String(key).trim().split(" ").join("").toLowerCase());

    for (let i = 0; i < text.length; i++) {
        let index = (indexOfChar(text[i])) ^ (indexOfChar(key[i]));
        cipherText += alphabet[index % 26];
    }
 // Display the decrypted plaintext
    ciphertext.innerHTML=cipherText.toLocaleUpperCase(); // Modify this line
}

 