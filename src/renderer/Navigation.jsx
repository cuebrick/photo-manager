import React from 'react';
import {Link} from "react-router-dom";
import Files from '../module/Files.js';

import { withStyles, MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import SettingsIcon from '@material-ui/icons/Settings';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FolderIcon from '@material-ui/icons/Folder';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Tooltip from '@material-ui/core/Tooltip';

const files = new Files();

const theme = createMuiTheme({
	typography: {
		fontSize: 12
	},
	overrides: {
		MuiListItem: {
		},
		MuiDivider: {
			root: {
				backgroundColor: 'rgba(255,255,255,0.1)'
			}
		},
		MuiListItemText: {
			root: {
				cursor: "default"
			}
		},
		MuiTypography : {
			subheading : {
				color: "inherit"
			}
		},
		MuiListItemIcon: {
			root: {
				color: "inherit"
			},
		},
	},
});

export default class Navigation extends React.Component{
	constructor(props){
		super(props);
		this.menuIconClicked = this.menuIconClicked.bind(this);

		this.state = {
			isShow : true,
			savedList : []
		}
	}


	menuIconClicked(){
		this.setState({isShow:!this.state.isShow});
	}
	
	displaySavedList(list){
		this.setState({savedList: list});
	}
	
	componentDidMount(){
		let list = files.getDirectoryList();
		this.displaySavedList(list);
	}
	
	render(){
		let cssShow = (this.state.isShow) ? ' active' : ''
		return(
			<MuiThemeProvider theme={theme}>
				<nav className={cssShow}>
					<div className={"menu-icon" + cssShow} onClick={this.menuIconClicked}>
						<div className="menu-bar" />
					</div>
					<div className={"menu" + cssShow}>
						<List>
							<Divider />
							<ListItem button component={Link} to="/desktop" disableGutters>
								<ListItemIcon>
									<DesktopWindowsIcon />
								</ListItemIcon>
								<ListItemText primary="Desktop" />
							</ListItem>
							<Divider />
							{
								(this.state.savedList.length) &&
									this.state.savedList.map((itemData, index) => {
										return (
											<ListItem key={index} disableGutters>
												<ListItemIcon>
													<FolderIcon />
												</ListItemIcon>
												<Tooltip title={itemData.path} placement="right">
													<ListItemText primary={files.getFolderName(itemData.path)} />
												</Tooltip>
												<ListItemSecondaryAction>
													<Switch />
												</ListItemSecondaryAction>
											</ListItem>
										)
									})
							}
							<Divider />
							<ListItem button component={Link} to="/add-storage" disableGutters>
								<ListItemIcon>
									<AddAPhotoIcon />
								</ListItemIcon>
								<ListItemText primary="Add Storage" />
							</ListItem>
							<Divider />
							<ListItem button component={Link} to="/settings" disableGutters>
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText primary="Settings" />
							</ListItem>
							<Divider />
						</List>
					</div>
				</nav>
			</MuiThemeProvider>
		)
	}
}
