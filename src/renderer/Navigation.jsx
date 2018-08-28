import React from 'react';
import {Link} from "react-router-dom";

export default class Navigation extends React.Component{
	render(){
		return(
			<nav>
				<ul>
					<li><Link to="/desktop">Desktop</Link></li>
				</ul>
				<ul>
					<li><Link to="/settings">Settings</Link></li>
				</ul>
			</nav>
		)
	}
}