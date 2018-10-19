import React from 'react';
import Typography from '@material-ui/core/Typography';

export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
		this.state = {
			isClicked : false
		}
	}
	clickHandler(){
		this.setState({isClicked: true});
	}
	render(){
		return(
			<div className="container">
			{
				this.state.isClicked === false &&
				<div className="main-splash" onClick={this.clickHandler}>
					<Typography variant="display1" align="center">Photo Manager</Typography>
				</div>
			}
			</div>
		)
	}
}