import React from 'react';
import {Link} from "react-router-dom";

export default class Navigation extends React.Component{
	constructor(){
		super();
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
				<ul className={"menu" + cssShow}>
					<li><Link to="/desktop">Desktop</Link></li>
					<li><Link to="/settings">Settings</Link></li>
				</ul>
			</nav>
		)
	}
}