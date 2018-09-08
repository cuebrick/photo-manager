import React from 'react';
import {Link} from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Settings extends React.Component{
	render(){
		return(
			<div className="container">
				<h1>Settings</h1>
				<h2>Storage</h2>
				<h3>Add storage</h3>
				<div>
					<TextField
						id="name"
						label="Path in this device."
						margin="normal"
					/>
					<Button variant="contained" color="primary">
						Add folder
					</Button>
				</div>
				<h4>Saved location</h4>
				<div>
					<ul>
						<li>C:\Users\user\Desktop\Works\PhotoManager</li>
						<li>D:\Photo</li>
						<li>C:\Users\user\Pictures</li>
					</ul>
				</div>
			</div>
		)
	}
}
