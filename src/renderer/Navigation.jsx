import React from 'react';
import {Link} from "react-router-dom";

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
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Tooltip from '@material-ui/core/Tooltip';

const theme = createMuiTheme({
	typography: {
		fontSize: 12
	},
	overrides: {
		MuiListItem: {
			gutters: {
				paddingLeft: 0
			}
		},
		MuiDivider: {
			root: {
				backgroundColor: 'rgba(255,255,255,0.1)'
			}
		},
		MuiListItemText: {
			root: {
				padding: 0,
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
			isShow : false
		}
	}


	menuIconClicked(){
		this.setState({isShow:!this.state.isShow});
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
							<ListItem button component={Link} to="/desktop">
								<ListItemIcon>
									<DesktopWindowsIcon />
								</ListItemIcon>
								<ListItemText primary="Desktop" />
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemIcon>
									<CameraAltIcon />
								</ListItemIcon>
								<Tooltip title="D://Photo" placement="right">
									<ListItemText primary="Photo" />
								</Tooltip>
								<ListItemSecondaryAction>
									<Switch />
								</ListItemSecondaryAction>
							</ListItem>
							<Divider />
							<ListItem button component={Link} to="/add-storage">
								<ListItemIcon>
									<AddAPhotoIcon />
								</ListItemIcon>
								<ListItemText primary="Add Storage" />
							</ListItem>
							<ListItem button component={Link} to="/settings">
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
