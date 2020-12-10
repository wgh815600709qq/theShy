import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom'
import button from '../components/button'
import buttonCopy from '../components/buttonCopy'
ReactDOM.render(
    (
    <Router history={hashHistory}>
		<Route path="/button" component={button}/>
		<Route path="/buttonCopy" component={buttonCopy}/>
    </Router>
    ), document.getElementById('app')
);
