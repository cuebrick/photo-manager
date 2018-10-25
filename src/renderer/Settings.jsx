import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';

export default class Settings extends React.Component{
	constructor(props){
		super(props);
		this.handleThemeChange = this.handleThemeChange.bind(this);
		this.handleSwitchChange = this.handleSwitchChange.bind(this);
		this.state = {
			theme : 'dark',
			showEXIF: false
		}
	}
	
	handleThemeChange(e){
		console.log('handleThemeChange: ', e.target.value);
		this.setState({theme: e.target.value})
	}
	
	handleDeleteChip(e){
		console.log(e);
	}
	
	handleSwitchChange(e){
		let key =  e.target.value;
		this.setState({[key]: !this.state[key]})
	}
	
	render(){
		return(
			<div className="container">
				<h1>Settings</h1>
				<h2>Themes</h2>
				<div className="setting-contents">
					<RadioGroup
						aria-label="Gender"
						name="themes"
						value={this.state.theme}
						onChange={this.handleThemeChange}
					>
						<FormControlLabel value="dark" control={<Radio />} label="Dark Theme" />
						<FormControlLabel value="light" control={<Radio />} label="Light Theme" />
					</RadioGroup>
				</div>
				<h2>Tags</h2>
				<div className="setting-contents">
					{/*Create your first tag.*/}
					<Chip label="Sample Tag Name" color="secondary" onDelete={this.handleDeleteChip} variant="outlined" />
					<Chip label="Sample Tag Name" color="secondary" onDelete={this.handleDeleteChip} variant="outlined" />
				</div>
				<h2>Display</h2>
				<div className="setting-contents">
					<FormControlLabel
						control={
							<Switch
								checked={this.state.showEXIF}
								onChange={this.handleSwitchChange}
								value="showEXIF"
							/>
						}
						label="Show EXIF information"
					/>
				</div>
			</div>
		)
	}
}
