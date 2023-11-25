// HTML elements used in the code
const plaintext = document.getElementById('plain_text'); // Reference to the plaintext input element
const key = document.getElementById('key_text'); // Reference to the key input element
const matrixDisp = document.getElementById('matrix'); // Reference to the matrix display element

// Constants
const alphabet = "abcdefghiklmnopqrstuvwxyz"; // The English alphabet with 'j' omitted
const nun = "1234567890"; // Digits from 1 to 0

// Function to remove duplicate characters from a string
let dublicateRemove = (text) => {
    let tempText = "";
    for (let i = 0; i < text.length; i++) {
        let j = 0;
        for (j = 0; j < i; j++) {
            if (text[j] == text[i])//checking if the character exist previouly in the text
                break;//if yes then terminate the loop
        }
        if (i == j)
            tempText += text[i];
    }
    return tempText;
}

// Function to create a Playfair grid (5x5 matrix) based on the key
let dispMat = false;
let makingGrid = (key) => {
    // Remove duplicates from the key and combine it with the alphabet
    let temp1DGrid = dublicateRemove(key + alphabet.split(' ').join(''));
    let temp5DGrid = [];
    let count = 0;
    if (dispMat == true) 
        document.getElementById('grid').remove(); //remove the old showing matrix
    
    let createTable = document.createElement('table');// matrix table created
    matrixDisp.appendChild(createTable);
    createTable.id = "grid";
    dispMat = true;
    for (let i = 0; i < 5; i++) {
        let row = document.createElement('tr')
        createTable.appendChild(row)
        temp5DGrid[i] = [];
        for (let j = 0; j < 5; j++) {
            temp5DGrid[i][j] = temp1DGrid[count];
            let input = document.createElement('input');
            row.appendChild(input);
            input.setAttribute('value', `${temp1DGrid[count]}`)

            input.readOnly = 'true'
            count++;
        }
    }
    return temp5DGrid;
}

// Function to modify the plaintext before encryption
//making the plainText as even length 
let modifyText = (plainText) => {
    for (let i = 0; i < plainText.length; i++) {
        if (plainText[(2 * i) % plainText.length] == plainText[(2 * i + 1) % plainText.length]) {
            plainText = plainText.replace(plainText[2 * i], plainText[2 * i] + 'x');
        }
    }
    if (plainText.length % 2 != 0) {
        plainText += 'x';
    }
    return plainText;
}

// Function to convert a pair of characters using the Playfair cipher
let playFairConvert = (char1, char2, grid) => {

    let i1 = 0, i2 = 0, j1 = 0, j2 = 0;

    // Find the positions of the characters in the Playfair grid
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (grid[i][j] == char1) {
                i1 = i;
                j1 = j;
            }
            if (grid[i][j] == char2) {
                i2 = i;
                j2 = j;
            }
        }
    }
    // Apply Playfair rules to determine the replacement characters
    if (i1 === i2) {
        return (grid[i1][(j1 + 1) % 5] + grid[i1][(j2 + 1) % 5]);
    } else if (j1 === j2) {
        return (grid[(i1 + 1) % 5][j1] + grid[(i2 + 1) % 5][j2]);
    } else {
        return (grid[i1][j2] + grid[i2][j1]);
    }
}

// Main function for encrypting plaintext using the Playfair cipher
let cipher = (plainText, key) => {
    let cipheText = "";
    // Convert the key to lowercase and remove spaces
    plainText = String(plainText).trim().split(' ').join("").toLowerCase();
    key = String(key).trim().split(' ').join("").toLowerCase();
    plainText = modifyText(plainText); // Modify the plaintext
    let grid = makingGrid(key); // Generate the Playfair grid
    for (let i = 0; i < plainText.length; i += 2) {
        // Convert digraphs and append to ciphertext
        cipheText += playFairConvert(plainText[i], plainText[i + 1], grid);
    }
    document.getElementById('cipher_text').innerHTML = cipheText.toUpperCase(); // Display the resulting ciphertext
}