import React from 'react';
import fs from "fs";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const theme = createMuiTheme({
	overrides: {
		MuiDivider: {
			root: {
				backgroundColor: 'rgba(255,255,255,0.1)'
			}
		},
		MuiAvatar: {
			colorDefault: {
				backgroundColor: 'rgba(92, 167, 255, 0.1)',
				color: '#3fa4cc'
			}
		},
		MuiTypography: {
			subheading: {
				color: "inherit"
			},
			colorTextSecondary: {
				color: "#777"
			}
		},
		MuiIconButton: {
			root: {
				color: "#ffbc81"
			}
		}
	},
});

export default class AddStorage extends React.Component{
	
	constructor(props){
		super(props);
		this.saveList = this.saveList.bind(this);
		this.handleSaveList = this.handleSaveList.bind(this);
		this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
		this.listUpDirectory = this.listUpDirectory.bind(this);
		this.state = {
			disableSave : true,
			savedList : [],
			selectedList : []
		}
	}
	
	getSavedList(){
		let list = JSON.parse(localStorage.getItem('directories'));
		if(list){
			return list;
		}else{
			return [];
		}
	}
	
	saveList(list){
		// console.log('savedList:', this.state.list);
		// localStorage.clear();
		if(list){
			localStorage.setItem('directories', JSON.stringify(list));
		}
	}
	
	handleSaveList(){
		let list = this.deduplicate(this.state.savedList, this.state.selectedList);
		list = this.state.savedList.concat(list);
		this.saveList(list);
		this.displaySavedList(list);
		this.displaySelectedList([]);
		this.displayDisableSave(true);
	}
	
	deduplicate(base, target){
		let list = (target) ? [...target] : [...base];
		let unique = [];
		list.map((dir) => {
			if( base.indexOf(dir) === -1 ){
				unique.push(dir);
			}
		});
		return unique;
	}
	
	displaySavedList(list){
		this.setState({savedList: list});
	}
	
	displaySelectedList(list){
		this.setState({selectedList: list});
	}
	
	displaySavedList(list){
		this.setState({savedList : list})
	}
	
	displayDisableSave(bool){
		this.setState({disableSave: bool});
	}
	
	handleSelectDirectory(){
		let selectedDirList = remote.dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections']
		});
		this.listUpDirectory(selectedDirList);
	}
	
	handleOpenFolder(path){
		remote.shell.openItem(path);
	}
	
	listUpDirectory(newList){
		if(newList){
			let list = this.deduplicate(this.state.selectedList, newList);
			list = this.state.selectedList.concat(list);
			this.displaySelectedList(list);
			this.displayDisableSave(false);
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
	
	removeSavedFolder(path){
		let list = [...this.state.savedList];
		let index = list.indexOf(path);
		if(index > -1){
			// TO DO : confirm dialog
			list.splice(index, 1);
			this.setState({savedList: list});
			console.log('removeSavedFolder---', this.state.savedList);
			this.displayDisableSave(false);
		}
	}
	
	handleRemoveSelectedFolder(path){
		let list = [...this.state.selectedList];
		let index = list.indexOf(path);
		list.splice(index, 1);
		this.setState({selectedList: list});
	}
	
	componentDidMount(){
		let list = this.getSavedList();
		this.displaySavedList(list);
	}
	
	componentDidUpdate(){
	
	}
	
	render(){
		return(
			<MuiThemeProvider theme={theme}>
				<div className="container">
					<Button variant="fab" color="primary" aria-label="Add" onClick={this.handleSelectDirectory}>
						<AddIcon />
					</Button>
					
					<Button disabled={this.state.disableSave} variant="fab" color="primary" aria-label="Save" onClick={this.handleSaveList}>
						<SaveIcon />
					</Button>
					
					<List>
						{
							this.state.savedList.map((path, index) => {
								return (
									<ListItem key={index} button onClick={() => this.handleOpenFolder(path)}>
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
											<IconButton aria-label="Delete" onClick={() => this.removeSavedFolder(path)}>
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
									<ListItem key={index} button onClick={() => this.handleOpenFolder(path)}>
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
											<IconButton aria-label="Delete" onClick={() => this.handleRemoveSelectedFolder(path)}>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								)
							})
						}
					</List>
				</div>
			</MuiThemeProvider>
		)
	}
}