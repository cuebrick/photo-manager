import React from 'react';
import fs from "fs";

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const {dialog} = require('electron').remote;

export default class AddStorage extends React.Component{
	
	constructor(props){
		super(props);
		/*fs.readdir('./.tmp/photo/samples/', (err, dir) => {
			for(let path of dir){
				console.log(path);
			}
		});*/
	}
	
	static selectDirectory(){
		let selectedDirList = dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections']
		});
		console.log(selectedDirList);
	}
	
	render(){
		return(
			<div className="container">
				<Button variant="fab" color="primary" aria-label="Add" onClick={AddStorage.selectDirectory}>
					<AddIcon />
				</Button>
			</div>
		)
	}
}