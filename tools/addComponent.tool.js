const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');


// 包结构
// |-- button                                 |-- 按钮组件目录
//    |   |-- button.tsx                         |   |-- 按钮组件主要实现代码
//    |   |-- index.md                           |   |-- 组件说明文档
//    |   |-- index.tsx                          |   |-- 暴露组件以及相关属性等
//    |   |-- demo                               |   |-- 组件demo说明文档目录
//    |   |   |-- basic.md                       |   |   |-- 按组件各个功能划分写demo文档
//    |   |-- __tests__                          |   |-- 组件单元测试目录
//    |   |   |-- index.test.tsx                 |   |   |-- 组件单元测试文件
//    |   |-- style                              |   |-- 组件样式目录
//    |       |-- index.less                     |       |-- 主要样式定义
//    |       |-- index.tsx                      |       |-- 暴露样式文件
//    |       |-- mixin.less                     |       |-- 所有组件定义less的mixin统一在mixin.less文件
inquirer.prompt({
    type: 'input',
    name: 'componentName',
    message: '新增的组件名'
}).then((data) => {
    const componentName = data.componentName;
    const packagePath = path.resolve(rootPath, `./components/${componentName}`);
    const isExist = fs.existsSync(packagePath);
    if (isExist) {
        console.warn(`组件[${componentName}] is already exist`);
        return
    } else {
        fs.mkdirSync(packagePath);
        fs.writeFileSync(path.resolve(packagePath, `./${componentName}.tsx`),`// ${componentName}组件主要实现代码`);
        fs.writeFileSync(path.resolve(packagePath, `./${componentName}.config.ts`), `// 组件定义配置 \n export default { \n\n }`);
        fs.writeFileSync(path.resolve(packagePath, './index.md'),`# ${componentName}组件说明文档`);
        fs.writeFileSync(path.resolve(packagePath, './index.tsx'), `// 暴露组件以及相关属性`);
        fs.mkdirSync(path.resolve(packagePath, './demo'));
        fs.writeFileSync(path.resolve(packagePath, './demo/basic.md'), '# 按组件的各个功能划分写demo文件');
        fs.mkdirSync(path.resolve(packagePath, './__tests__'));
        fs.writeFileSync(path.resolve(packagePath, './__tests__/index.test.tsx'), '// 单元测试入口');
        fs.mkdirSync(path.resolve(packagePath, './style'));
        fs.writeFileSync(path.resolve(packagePath, './style/index.less'),'// 主要样式定义');
        fs.writeFileSync(path.resolve(packagePath, './style/index.tsx'), '// 暴露样式文件');
        fs.writeFileSync(path.resolve(packagePath, './style/mixin.less'), '// 所有组件定义less的mixin统一在mixin.less文件');
        console.log(`组件[${componentName}] created finish`);
    }   
})