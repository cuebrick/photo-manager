import React from 'react';
import {Link} from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
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
		padding: 10
	},
	icon: {
		marginRight: 0
	},
	itemText: {
		color: '#999',
		padding: '0 10px'
	}
};

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
					<List>
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