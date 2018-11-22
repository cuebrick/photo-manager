import React from 'react';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider/Divider";
import Chip from "@material-ui/core/Chip/Chip";
import Button from '@material-ui/core/Button';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

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
		MuiInput: {
			root: {
				color: "inherit"
			}
		}
	},
});

export default class Tag extends React.Component{
	
	handleDeleteChip(e){
		console.log(e);
	}
	
	render(){
		return(
			<MuiThemeProvider theme={theme}>
				<div className="container">
					<Typography variant="title">Tags</Typography>
					
					<Divider />
					<Typography variant="subheading">Add Tag</Typography>
					<div className="setting-contents">
						
						<TextField
							id="outlined-bare"
							placeholder="Make your tag"
							margin="normal"
							variant="outlined"
						/>
						<Button variant="contained" size="small">
							<LabelOutlinedIcon />
							Add
						</Button>
					</div>
					
					<Divider />
					
					<Typography variant="subheading">Tags List</Typography>
					<div className="setting-contents">
						{/*Create your first tag.*/}
						<Chip label="Sample Tag Name" color="secondary" onDelete={this.handleDeleteChip} variant="outlined" />
						<Chip label="Sample Tag Name" color="secondary" onDelete={this.handleDeleteChip} variant="outlined" />
					</div>
					
					<Divider />
				</div>
			</MuiThemeProvider>
		)
	}
}