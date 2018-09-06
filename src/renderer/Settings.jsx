import React from 'react';
import {Link} from 'react-dom';

export default class Settings extends React.Component{
	render(){
		return(
			<div className="container">
				<h1>Settings</h1>
				<h2>Storage</h2>
				<h3>Add storage</h3>
				<div>
					<input type="text"/>
					<button>Add</button>
				</div>
			</div>
		)
	}
}