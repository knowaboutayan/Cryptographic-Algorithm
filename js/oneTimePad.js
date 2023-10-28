const plaintext = document.getElementById('plain_text'); // Reference to the plaintext input element
const keytext = document.getElementById('key_text'); // Reference to the key input element
const ciphertext = document.getElementById('cipher_text'); // Reference to the ciphertext element
const alphabet = "abcdefghijklmnopqrstuvwxyz";

//findinindex of a character alphabet
let indexOfChar = char => {
    for (let i = 0; i < alphabet.length; i++) {
        if (char == alphabet[i]) return i;
    }
}

let cipher = (text,key) => {
    let cipherText = ''; // Modify this line
    // Ensure both text and key are lowercase and without spaces
    text = String(text).trim().split(" ").join("").toLowerCase();
    key=randomKey(plaintext.value)//generate random key
    for (let i = 0; i < text.length; i++) {
        let index = (indexOfChar(text[i])) ^ (indexOfChar(key[i]));
        cipherText += alphabet[index % 26];
    }
 // Display the decrypted plaintext
    ciphertext.innerHTML=cipherText.toLocaleUpperCase(); // Modify this line
}
//randomkey
let randomKey = (text) => {
    let genareteKey=''
    for(let i=0;i<text.length;i++){
        genareteKey+=alphabet[(Math.floor(Math.random()*100))%26];
    }
    keytext.value=genareteKey;
    return genareteKey;
}
