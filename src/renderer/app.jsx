import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './Main';
import Settings from './Settings';

const routing = (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Main} />
			<Route path="settings" component={Settings} />
		</Switch>
	</BrowserRouter>
);

render(routing, document.getElementById('app'));