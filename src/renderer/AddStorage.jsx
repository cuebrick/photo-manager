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
		this.getFolderName = this.getFolderName.bind(this);
		this.state = {
			isChanged : false,
			savedList : [],
			selectedList : []
		}
	}
	
	handleSaveList(){
		let list = this.deduplicate(this.state.savedList, this.state.selectedList);
		// list = this.state.savedList.concat(list);
		files.saveDirectoryList(list);
		this.displaySavedList(list);
		this.displaySelectedList([]);
		this.displayChanged(false);
	}
	
	deduplicate(base, target){
		let list = (target) ? [...target] : [...base];
		let unique = base;
		/*list.map((itemData) => {
			if( list.indexOf(itemData.path) === -1 ){
				unique.push(dir);
			}
		});*/
		return unique;
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
		let selectedDirList = remote.dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections']
		});
		this.listUpDirectory(selectedDirList);
	}
	
	handleOpenFolder(path){
		remote.shell.openItem(path);
	}
	
	listUpDirectory(pathList){
		if(pathList){
			// let list = this.deduplicate(this.state.selectedList, newList);
			let list = [];
			pathList.map((path, index) => {
				console.log(path);
				// return;
				list.push({
					path: path,
					alias: this.getFolderName(path),
					ext: {jpg: true, png: true, gif: true}
				})
			});
			list = this.state.selectedList.concat(list);
			this.displaySelectedList(list);
			this.displayChanged(true);
		}
	}
	
	getFolderName(path){
		return path.split('\\').pop();
	}
	
	/**
	 * 저장되어 있던 폴더중 삭제함.
	 * @param path
	 */
	removeSavedFolder(path){
		let list = [...this.state.savedList];
		let index = list.indexOf(path);
		if(index > -1){
			// TO DO : confirm dialog
			list.splice(index, 1);
			this.setState({savedList: list});
			this.displayChanged(true);
			console.log('removeSavedFolder---', this.state.savedList);
		}
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
												primary={this.getFolderName(itemData.path)}
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
											primary={this.getFolderName(itemData.path)}
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