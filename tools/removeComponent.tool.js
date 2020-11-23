const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');

inquirer.prompt({
    type: 'input',
    message: '删除的组件名',
    name: 'componentName',
}).then((data) => {
    const componentName = data.componentName;
    const packagePath = path.resolve(rootPath, `./components/${componentName}`);
    const isExist = fs.existsSync(packagePath);
    if (!isExist) {
        console.warn(`组件[${componentName}]不存在.`);
        return
    } else {
        (function deleteFolderRecursive(url) {
            var files = [];
            /**
             * 判断给定的路径是否存在
             */
            if (fs.existsSync(url)) {
                /**
                 * 返回文件和子目录的数组
                 */
                files = fs.readdirSync(url);
                files.forEach(function (file, index) {
    
                    var curPath = path.join(url, file);
                    /**
                     * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
                     */
                    if (fs.statSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
    
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                /**
                 * 清除文件夹
                 */
                fs.rmdirSync(url);
            } else {
                console.log("给定的路径不存在，请给出正确的路径");
            }
        })(packagePath)
        console.log(`组件[${componentName}]已清除.`)
    }   
})