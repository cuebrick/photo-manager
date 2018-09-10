import React from 'react';
import {Link} from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';


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
			<nav className={cssShow}>
				<div className={"menu-icon" + cssShow} onClick={this.menuIconClicked}>
					<div className="menu-bar"></div>
				</div>

				<div className={"menu" + cssShow}>
					<ul>
						<li><Link to="/desktop">Desktop</Link></li>
						<li><Link to="/settings">Settings</Link></li>

						<li><Link to="/add-storage">Add Storage</Link></li>
					</ul>
					<List>
						<ListItem>
							<ListItemIcon>
								<WifiIcon />
							</ListItemIcon>
							<ListItemText primary="Wi-Fi" />
							<ListItemSecondaryAction>
								<Switch />
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<BluetoothIcon />
							</ListItemIcon>
							<ListItemText primary="Bluetooth" />
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
