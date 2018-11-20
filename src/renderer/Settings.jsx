import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';

const theme = createMuiTheme({
	overrides: {
		MuiTypography: {
			body1: {
				color: "inherit"
			},
			title: {
				color: "inherit"
			},
			subheading: {
				color: "inherit"
			}
		},
		MuiDivider: {
			root: {
				backgroundColor: 'rgba(255,255,255,0.1)'
			}
		},
	},
});

export default class Settings extends React.Component{
	constructor(props){
		super(props);
		this.handleThemeChange = this.handleThemeChange.bind(this);
		this.handleSwitchChange = this.handleSwitchChange.bind(this);
		this.state = {
			theme : 'dark',
			showEXIF: false,
			showGroupTitle: true,
			showTag: true,
			autoCache: true
		}
	}
	
	handleThemeChange(e){
		console.log('handleThemeChange: ', e.target.value);
		this.setState({theme: e.target.value})
	}
	
	handleSwitchChange(e){
		let key =  e.target.value;
		this.setState({[key]: !this.state[key]})
	}
	
	render(){
		return(
			<MuiThemeProvider theme={theme}>
				<div className="container">
					<Typography variant="title">Settings</Typography>
					
					<Divider />
					
					<Typography variant="subheading">Themes</Typography>
					<div className="setting-contents">
						<RadioGroup row
							aria-label="theme"
							name="themes"
							value={this.state.theme}
							onChange={this.handleThemeChange}
						>
							<FormControlLabel
								value="dark"
								control={<Radio />}
								label="Dark Theme"
							/>
							<FormControlLabel
								value="light"
								control={<Radio />}
								label="Light Theme"
							/>
						</RadioGroup>
					</div>
					
					<Divider />
					
					<Typography variant="subheading">Display</Typography>
					<div className="setting-contents">
						<FormGroup>
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
							<FormControlLabel
								control={
									<Switch
										checked={this.state.showGroupTitle}
										onChange={this.handleSwitchChange}
										value="showGroupTitle"
									/>
								}
								label="Show title of photo group"
							/>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.showTag}
										onChange={this.handleSwitchChange}
										value="showTag"
									/>
								}
								label="Show tag on photo view"
							/>
						</FormGroup>
					</div>
					
					<Divider />
					
					<Typography variant="subheading">Image Cache</Typography>
					<div className="setting-contents">
						<FormControlLabel
							control={
								<Switch
									checked={this.state.autoCache}
									onChange={this.handleSwitchChange}
									value="autoCache"
								/>
							}
							label="Auto Cache"
						/>
						<Button variant="contained" size="small">
							<CachedIcon />
							Rebuild Cache
						</Button>
					</div>
					
					<Divider />
				</div>
			</MuiThemeProvider>
		)
	}
}
