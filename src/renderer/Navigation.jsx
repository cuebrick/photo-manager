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
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Tooltip from '@material-ui/core/Tooltip';

/*const styles = createStyles({
	root: {
		colorPrimary: '#fff'
	},
	icon: {
		marginRight: 0
	},
	item: {
		color: '#999',
		padding: 10,
		cursor: 'default'
	},
	itemText: {
		color: '#9db2cc',
		padding: '0 10px'
	}
});*/

const theme = createMuiTheme({
	overrides: {
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
						<ListItem button component={Link} to="/desktop">
							<ListItemIcon>
								<CameraAltIcon />
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
					</List>
				</div>
			</nav>
			</MuiThemeProvider>
		)
	}
}
