const path = require('path');
const fs   = require('fs');
const cssFilesPath = [];
const mapDir = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    files.forEach((item, index) => {
        const fPath = path.join(dirPath, item);
        const stat = fs.statSync(fPath);
        console.log('item', item)
        if (stat.isDirectory()) {
            mapDir(fPath)
        } else if (stat.isFile()) {
            cssFilesPath.push(fPath)
        }
    })
}
mapDir(path.join(__dirname, '../es'))