const fs = require('fs');
const path = require('path');
const filePath = path.join('../public/', 'data.json');

fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        throw err
    }
    export const data = content;
    console.log(data);
})