import React from 'react';
import fs from "fs";

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const remote = require('electron').remote;

export default class AddStorage extends React.Component{
	
	constructor(props){
		super(props);
		this.saveList = this.saveList.bind(this);
		this.selectDirectory = this.selectDirectory.bind(this);
		this.listUpDirectory = this.listUpDirectory.bind(this);
		this.state = {
			savedList : [],
			selectedList : []
		}
	}
	
	getSavedList(){
		let list = JSON.parse(localStorage.getItem('directories'));
		if(list){
			this.setState({savedList : list})
		}
	}
	
	saveList(){
		if(this.state.selectedList.length){
			let list = this.state.savedList.concat(this.state.selectedList);
			localStorage.setItem('directories', JSON.stringify(list));
		}
	}
	
	selectDirectory(){
		let selectedDirList = remote.dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections']
		});
		this.listUpDirectory(selectedDirList);
	}
	
	openFolder(path){
		remote.shell.openItem(path);
	}
	
	listUpDirectory(newList){
		if(newList){
			let list = [...this.state.selectedList];
			newList.map((dir) => {
				if( list.indexOf(dir) === -1 ){
					list.push(dir);
				}
			});
			this.setState({selectedList: list});
		}
		
		/*fs.readdir('./.tmp/photo/samples/', (err, dir) => {
			for(let path of dir){
				console.log(path);
			}
		});*/
	}
	
	getFolderName(path){
		return path.split('\\').pop();
	}
	
	removeFolder(path){
		let list = [...this.state.selectedList];
		let index = list.indexOf(path);
		list.splice(index, 1);
		this.setState({selectedList: list});
	}
	
	componentDidMount(){
		this.getSavedList();
	}
	
	render(){
		return(
			<div className="container">
				<Button variant="fab" color="primary" aria-label="Save" onClick={this.saveList}>
					<SaveIcon />
				</Button>
				
				<Button variant="fab" color="primary" aria-label="Add" onClick={this.selectDirectory}>
					<AddIcon />
				</Button>
				
				<List>
					{
						this.state.savedList.map((path, index) => {
							return (
								<ListItem key={index} button onClick={() => this.openFolder(path)}>
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
										<IconButton aria-label="Delete" onClick={() => this.removeFolder(path)}>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)
						})
					}
				</List>
				
				<Divider />
				
				<List>
					{
						this.state.selectedList.map((path, index) => {
							return (
								<ListItem key={index} button onClick={() => this.openFolder(path)}>
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
										<IconButton aria-label="Delete" onClick={() => this.removeFolder(path)}>
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