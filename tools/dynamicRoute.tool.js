"use strict";

const path = require('path');
const fs = require('fs');
const { getDirInfo } = require('./fs.tool');

const componentPath = path.resolve(__dirname, '../components');

const createRouterFile = () => {
    // Below `/build` directory, we will append the dymanic router file before building dev enviroment.
    const result = getRoute();
    const dynamicImport = result.map(it => `import ${it} from '../components/${it}'`).join('\n');
    const routes = result.map(it => `\t\t<Route path="/${it}" component={${it}}/>`).join('\n');
    let content = '';
    content += `import { Router, Route, hashHistory } from 'react-router';\n`;
    content += `import ReactDOM from 'react-dom'\n`;
    content += dynamicImport;
    content += 
`
ReactDOM.render(
    (
    <Router history={hashHistory}>
${routes}
    </Router>
    ), document.getElementById('app')
);
`
    const routePath = path.resolve(__dirname, '../build/Router.js');
    fs.writeFileSync(routePath, content);
    console.log('finish')
}

const getRoute = () => {
    const dirInfo = getDirInfo(componentPath);
    return dirInfo
        .filter(it => it.type === 'directory' && !it.name.startsWith('_') && it.index === 0)
        .map(it => it.name)
}
module.exports = {
    createRouterFile
}

/**
 *
    import { Router, Route, hashHistory } from 'react-router';

    render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
    ), document.getElementById('app'));
 *  
 */
