// Get references to HTML elements
const plaintext = document.getElementById("plain_text");
const keytext = document.getElementById("key_text");
const keyIndex = document.getElementById("key_index");
const inputMat = document.getElementById("input_matrix");
const ciphertext = document.getElementById("cipher_text");
// Define the alphabet used for encryption
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let modifyText = (text, index) => {
    // Remove spaces and ensure the text length is a multiple of the index
    text = text.trim().split(" ").join(""); // Remove spaces
    if (text.length % index != 0) {
        while (text.length % index !== 0)
            text += "x";
    }
    // Split the text into subgroups of the specified index
    let tempText = [];
    for (let i = 0; i < text.length; i += index) {
        tempText.push(text.substr(i, index));
    }
    return tempText;
}
// Function to find the index of a character in the alphabet
let indexOfChar = (char) => {
    for (let i in alphabet) {
        if (alphabet[i] == char) {
            return i;
        }
    }
}


// Function to perform matrix multiplication
let matrixMultiply = (text, key, index) => {
    text = [text]
    let tempcipher = new Array(text.length);

    for (let i = 0; i < text.length; i++) {
        tempcipher[i] = new Array(index);
        for (let j = 0; j < index; j++) {
            tempcipher[i][j] = 0;

            for (let k = 0; k < index; k++) {
                // Calculate the element in the resulting matrix
                tempcipher[i][j] += Number(indexOfChar(String(text[i][k])))/*we can also use text[i][k]*/ * Number(key[k][j]);
            }
            // Apply modulo 26 to the result for encryption
        }
    }
    console.log(tempcipher);
    return tempcipher[0];
}

// Function to convert PlainText to cipher text
let plainToCipher = (plainText, key, keyDim) => {
    let ciphertext = '';
    console.log(plainText);
    console.log(key)
    let indexOfCipher = plainText.map(subPlainText => matrixMultiply(subPlainText, key, keyDim));

    for (let i in indexOfCipher) {
        for (let j in indexOfCipher[i]) {
            // Convert the index back to a character using the alphabet
            ciphertext += alphabet[indexOfCipher[i][j] % 26];
        }
    }
    return ciphertext;
}

// Initialize a flag to track if the matrix is displayed
let dispMat = false;

// Function to create the key matrix based on the given index
let createKeyMatrix = (keytext, index) => {
    // Check if key kength is same as index^2
    if (dispMat == true) {
        document.getElementById('mattable').remove();
        dispMat = false;
    }

    if (index * index == keytext.length) {
        let key = new Array();
        // Create a table to display the key matrix
        let table = document.createElement('table');
        inputMat.appendChild(table);
        table.id = 'mattable';
        dispMat = true;
        // Generate input fields for the key matrix
        let keyindex = 0;
        for (let i = 0; i < index; i++) {
            let row = document.createElement('tr');
            table.appendChild(row);
            key[i] = new Array();
            for (let j = 0; j < index; j++) {
                let inputField = document.createElement('input');
                row.appendChild(inputField);
                inputField.setAttribute('type', 'number');
                inputField.setAttribute('id', `k${i}${j}`);
                inputField.setAttribute('value', `${indexOfChar(keytext[keyindex])}`);
                inputField.setAttribute('placeholder', `K${i}${j}`);
                inputField.readOnly='true'
                key[i][j] = indexOfChar(keytext[keyindex]);
                keyindex++;
            }
            let nextLine = document.createElement('br');
            row.appendChild(nextLine);
        }
        return key;
    }
}
//key input and key index value error handeler
let keyInputErrorHandeler = (keyText, index) => {
    if (keyText.length != index * index && keyText.length > 0) {
        document.getElementById("keyInputError").style.cssText += 'color:red;'
        document.getElementById("keyInputError").innerHTML = "key length should be equal to square of index value";
        ciphertext.innerHTML = ""
        return 1;
    }
    else if (keyText.length == index * index) {

        document.getElementById("keyInputError").style.cssText += 'color:green;'
        document.getElementById("keyInputError").innerHTML = "Valid Key";

        return 0;
    }
    else {
        document.getElementById("keyInputError").style.cssText += 'color:crimson;'
        document.getElementById("keyInputError").innerHTML = "Key input  can not be empty";
        cipher.innerHTML = ""
        return 1;
    }
}

// Function to initiate the encryption process
let cipher = (plainText, keyText, keyDim) => {
    //key index error handeler
    keyInputErrorHandeler(keyText, keyDim)
    // Remove spaces, convert to lowercase, and modify the input text
    plainText = String(plainText).trim().split(' ').join("").toLowerCase();
    keyText= String(keyText).trim().split(' ').join("").toLowerCase();
    //plaintext modification
    plainText = modifyText(plainText, Number(keyDim));
    // Generate the key matrix from user input
    let key = createKeyMatrix(keyText, keyDim);//assign the return value to the key 
    // Display the cipher text on the HTML page
    ciphertext.innerHTML = plainToCipher(plainText, key, keyDim).toUpperCase();
}
