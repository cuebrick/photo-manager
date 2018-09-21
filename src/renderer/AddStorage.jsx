import React from 'react';
import {dialog} from 'electron-remote';
import fs from "fs";


export default class AddStorage extends React.Component{
	constructor(props){
		super(props);
		/*fs.readdir('./.tmp/photo/samples/', (err, dir) => {
			for(let path of dir){
				console.log(path);
			}
		});*/
	}
	
	selectDirectory(){
		// let remote = require('remote');
		// let dialog = remote.require('electron').dialog;
		dialog.showOpenDialog({
			properties: ['openDirectory']
		})
	}
	
	render(){
		return(
			<div className="container">
				<button onClick={this.selectDirectory}>Add Folder</button>
			</div>
		)
	}
}