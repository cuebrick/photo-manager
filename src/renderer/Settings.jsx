import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

export default class Settings extends React.Component{
	constructor(props){
		super(props);
		this.handleThemeChange = this.handleThemeChange.bind(this);
		this.state = {
			theme : 'dark'
		}
	}
	
	handleThemeChange(e){
		console.log('handleThemeChange: ', e.target.value);
		this.setState({theme: e.target.value})
	}
	
	render(){
		return(
			<div className="container">
				<h1>Settings</h1>
				<h2>Themes</h2>
				<div className="setting-contents">
					<RadioGroup
						aria-label="Gender"
						name="gender1"
						value={this.state.theme}
						onChange={this.handleThemeChange}
					>
						<FormControlLabel value="dark" control={<Radio />} label="Dark Theme" />
						<FormControlLabel value="light" control={<Radio />} label="Light Theme" />
					</RadioGroup>
				</div>
				<h2>Tags</h2>
			</div>
		)
	}
}
