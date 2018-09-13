import React from 'react';
import {Link} from "react-router-dom";

import { withStyles, createMuiTheme } from '@material-ui/core/styles';
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

const styles = {
	item: {
		// color: '#999',
		padding: 10
	},
	icon: {
		marginRight: 0
	},
	itemText: {
		// color: '#9db2cc',
		padding: '0 10px'
	}
};

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	typography: {
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		color: '#fff'
	},
	overrides: {
		ListItem: { // Name of the component ⚛️ / style sheet
			root: { // Name of the rule
				color: 'white', // Some CSS
			},
		},
	},
});

class Navigation extends React.Component{
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
			<nav className={cssShow}>
				<div className={"menu-icon" + cssShow} onClick={this.menuIconClicked}>
					<div className="menu-bar" />
				</div>

				<div className={"menu" + cssShow}>
					<List theme={theme}>
						<ListItem button component={Link} to="/desktop" className={this.props.classes.item}>
							<ListItemIcon className={this.props.classes.icon}>
								<CameraAltIcon />
							</ListItemIcon>
							<ListItemText primary="Desktop" className={this.props.classes.itemText} />
							<ListItemSecondaryAction>
								<Switch />
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />
						<ListItem button component={Link} to="/add-storage" className={this.props.classes.item}>
							<ListItemIcon className={this.props.classes.icon}>
								<AddAPhotoIcon />
							</ListItemIcon>
							<ListItemText primary="Add Storage" className={this.props.classes.itemText} />
							<ListItemSecondaryAction>
								<Switch />
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button component={Link} to="/settings" className={this.props.classes.item}>
							<ListItemIcon className={this.props.classes.icon}>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary="Settings" className={this.props.classes.itemText} />
							<ListItemSecondaryAction>
								<Switch />
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</div>
			</nav>
		)
	}
}

export default withStyles(styles)(Navigation);