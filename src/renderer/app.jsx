import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Settings from './Settings';
import Desktop from "./Desktop";
import NotFound from "./NotFound";
import Navigation from "./Navigation";


const routing = (
	<MemoryRouter>
		<div className="wrapper">
			<Navigation />
			<Switch>
				<Route path="/settings" component={Settings} />
				<Route path="/desktop" component={Desktop} />
				<Route component={Main} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</MemoryRouter>
);

render(routing, document.getElementById('app'));