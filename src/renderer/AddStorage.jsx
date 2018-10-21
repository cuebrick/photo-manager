import React from 'react';
import Files from '../module/Files.js'

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

const files = new Files();

export default class AddStorage extends React.Component{
	
	constructor(props){
		super(props);
		this.handleSaveList = this.handleSaveList.bind(this);
		this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
		this.listUpDirectory = this.listUpDirectory.bind(this);
		this.state = {
			isChanged : false,
			savedList : [],
			selectedList : []
		}
	}
	
	dedup(list){
		let hashTable = {};
		return list.filter(function (item) {
			let key = JSON.stringify(item.path);
			let match = Boolean(hashTable[key]);
			
			return (match ? false : hashTable[key] = true);
		});
	}
	
	listUpDirectory(pathList){
		if(pathList){
			// let list = this.deduplicate(this.state.selectedList, newList);
			let list = [];
			pathList.map((path) => {
				list.push({
					path: path,
					alias: files.getFolderName(path),
					ext: {jpg: true, png: true, gif: true}
				})
			});
			let len1 = this.state.selectedList.length;
			list = this.state.selectedList.concat(list);
			list = this.dedup(list);
			let len2 = list.length;
			if(len1 < len2){
				this.displayChanged(true);
			}
			this.displaySelectedList(list);
		}
	}
	
	/**
	 * 저장되어 있던 폴더중 삭제함.
	 * @param path
	 */
	removeSavedFolder(path){
		let list = [...this.state.savedList];
		let index = list.findIndex((item) => {
			return item.path === path;
		});
		console.log('index:', index);
		if(index > -1){
			// TO DO : confirm dialog
			list.splice(index, 1);
			this.setState({savedList: list});
			this.displayChanged(true);
			console.log('removeSavedFolder---', this.state.savedList);
		}
	}
	
	displaySavedList(list){
		this.setState({savedList: list});
	}
	
	displaySelectedList(list){
		this.setState({selectedList: list});
	}
	
	displayChanged(bool){
		this.setState({isChanged: bool});
	}
	
	handleSelectDirectory(){
		let pathList = remote.dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections']
		});
		this.listUpDirectory(pathList);
	}
	
	handleSaveList(){
		let list = this.state.savedList.concat(this.state.selectedList);
		list = this.dedup(list);
		files.saveDirectoryList(list);
		this.displaySavedList(list);
		this.displaySelectedList([]);
		this.displayChanged(false);
	}
	
	handleOpenFolder(path){
		remote.shell.openItem(path);
	}
	
	/**
	 * 새로 선택한 폴더 중에서 삭제함.
	 * @param path
	 */
	handleRemoveSelectedFolder(path){
		let list = [...this.state.selectedList];
		let index = list.indexOf(path);
		list.splice(index, 1);
		this.setState({selectedList: list});
	}
	
	componentDidMount(){
		let list = files.getDirectoryList();
		this.displaySavedList(list);
	}
	
	componentDidUpdate(){
	
	}
	
	componentWillUnmount(){
		if(this.state.isChanged){
			let result = confirm('Save changes to the Storage before moving?');
			if(result){
				this.handleSaveList();
			}
		}
	}
	
	render(){
		return(
			<MuiThemeProvider theme={theme}>
				<div className="container">
					<Button variant="fab" color="primary" aria-label="Add" onClick={this.handleSelectDirectory}>
						<AddIcon />
					</Button>
					
					<Button disabled={!this.state.isChanged} variant="fab" color="primary" aria-label="Save" onClick={this.handleSaveList}>
						<SaveIcon />
					</Button>
					<List>
						{
							( this.state.savedList.length ) ?
								this.state.savedList.map((itemData, index) => {
									return (
										<ListItem key={index} button onClick={() => this.handleOpenFolder(itemData.path)}>
											<ListItemAvatar>
												<Avatar>
													<FolderIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={files.getFolderName(itemData.path)}
												secondary={itemData.path}
											/>
											<ListItemSecondaryAction>
												<IconButton aria-label="Delete" onClick={() => this.removeSavedFolder(itemData.path)}>
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									)
								})
								:
								<Typography variant="display1" align="center" gutterBottom>
									새로운 폴더를 등록해 보세요.
								</Typography>
						}
					</List>
					
					<Divider />
					
					<List>
						{
							this.state.selectedList.map((itemData, index) => {
								return (
									<ListItem key={index} button onClick={() => this.handleOpenFolder(itemData.path)}>
										<ListItemAvatar>
											<Avatar>
												<FolderIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={files.getFolderName(itemData.path)}
											secondary={itemData.path}
										/>
										<ListItemSecondaryAction>
											<IconButton aria-label="Delete" onClick={() => this.handleRemoveSelectedFolder(itemData.path)}>
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