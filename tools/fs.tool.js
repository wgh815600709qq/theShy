const path = require('path');
const fs   = require('fs');
/*
 * 获取文件目录下所有文件、文件夹信息
 * @dirPath 源文件路径
 * 
 */
const getDirInfo = (dirPath) => {
    const results = [];
    const mapDir = (dirPath, directoryIndex = 0) => {
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            files.forEach((item) => {
                const fPath = path.join(dirPath, item);
                const stat = fs.statSync(fPath);
                if (stat.isDirectory()) {
                    results.push({
                        path: fPath,
                        name: item,
                        type: 'directory',
                        index: directoryIndex
                    })
                    mapDir(fPath, directoryIndex + 1)
                } else if (stat.isFile()) {
                    results.push({
                        path: fPath,
                        name: item,
                        type: 'file',
                        index: directoryIndex
                    })
                }
            })
        }
    }
    mapDir(dirPath)
    return results
}

/***
 * 获取文件夹下的一级子文件夹集合
 */
const getFirstLevelSonDirs = (dirPath) => {
    const dirInfo = getDirInfo(dirPath);
    const firstLevelSonDirs = dirInfo.filter(item => 
        item.index === 0 && item.type === 'directory'
    ).map(it => it.name)
    return firstLevelSonDirs
}

// console.log(getDirInfo(path.join(__dirname, '../es')))
// console.log(getFirstLevelSonDirs(path.join(__dirname, '../es')))


module.exports = {
    getDirInfo,
    getFirstLevelSonDirs
}