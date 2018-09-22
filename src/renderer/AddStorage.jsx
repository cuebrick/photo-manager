import React from 'react';
import fs from "fs";

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const {dialog} = require('electron').remote;

export default class AddStorage extends React.Component{
	
	constructor(props){
		super(props);
		this.selectDirectory = this.selectDirectory.bind(this);
		this.listUpDirectory = this.listUpDirectory.bind(this);
		this.getFolderName = this.getFolderName.bind(this);
		this.state = {
			directoryList : []
		}
	}
	
	selectDirectory(){
		let selectedDirList = dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections']
		});
		this.listUpDirectory(selectedDirList);
	}
	
	listUpDirectory(dirList){
		console.log(dirList);
		if(dirList)
			this.setState({directoryList: dirList});
		
		/*fs.readdir('./.tmp/photo/samples/', (err, dir) => {
			for(let path of dir){
				console.log(path);
			}
		});*/
	}
	
	getFolderName(path){
		return path.split('\\').pop();
	}
	
	render(){
		return(
			<div className="container">
				<Button variant="fab" color="primary" aria-label="Add" onClick={this.selectDirectory}>
					<AddIcon />
				</Button>
				
				<List>
					{
						this.state.directoryList.map((path, index) => {
							return (
								<ListItem key={index}>
									<ListItemAvatar>
										<Avatar>
											<FolderIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={this.getFolderName(path)}
										secondary={path}
									/>
									<ListItemSecondaryAction>
										<IconButton aria-label="Delete">
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)
						})
					}
					
				</List>
			</div>
		)
	}
}