import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom'
import button from '../es/components/button'
import buttonCopy from '../es/components/buttonCopy'
ReactDOM.render(
    (
    <Router>
		  <Route path="/button" component={button}/>
		  <Route path="/buttonCopy" component={buttonCopy}/>
    </Router>
    ), document.getElementById('app')
);
