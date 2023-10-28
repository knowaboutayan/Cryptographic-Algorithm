// Define the plaintext message and encryption key
let plaintext = document.getElementById('plain_text')
let key = document.getElementById('key_text');
const ciphertext = document.getElementById("cipher_text");
const method = document.getElementById('action');
// Define the alphabet for reference
let alpha = "abcdefghijklmnopqrstuvwxyz";

// Define a function to find the index of a character in the alphabet
let indexOfChar = (char) => {
    for (let i = 0; i < alpha.length; i++) {
        if (alpha[i] == char) {
            return i;
        }
    }
}

// Define the cipher function to encrypt the plaintext using the key
let cipher = (plainText, algo, key) => {
    plainText = String(plainText).trim().split(' ').join("").toLowerCase();
    key= String(key).trim().split(' ').join("").toLowerCase();
    let cipherText = [];
    let newKey = [];
    let count1 = 0;
    let count=0
    console.log(plainText[0])

    // Generate a new key based on the length of the plaintext
    switch (algo) {

        case 'v':
            while (count < plainText.length) {
                newKey.push(key[count % key.length]);
                count++;
            }
            break;
        case 'a':
        
            while (count < plainText.length) {
                if (count < key.length) {
                    newKey.push(key[count%key.length]);
                    
                }
                else {
                    newKey.push(plainText[count%plainText.length])
                }
                count++
            }
            break;
    }
    console.log(newKey)
    newKey = newKey.join("");
    // Encrypt the plaintext character by character
    for (let i = 0; i < plainText.length; i++) {
        let index = (indexOfChar(plainText[i]) + indexOfChar(newKey[i])) % 26;
        cipherText.push(alpha[index]);
    }
    ciphertext.innerHTML = cipherText.join("").toUpperCase(); // Return the encrypted text
}

// Call the cipher function and print the result
// This line doesn't relate to the cipher function.

