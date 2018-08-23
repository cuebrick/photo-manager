import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Settings from './Settings';
import Desktop from "./Desktop";

const routing = (
	<BrowserRouter>
		<Switch>
			<Route path="settings" component={Settings} />
			<Route path="desktop" component={Desktop} />
			<Route component={Main} />
		</Switch>
	</BrowserRouter>
);

render(routing, document.getElementById('app'));