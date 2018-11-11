import React from 'react';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
	overrides: {
	
	},
});

export default class Tag extends React.Component{
	render(){
		return(
			<MuiThemeProvider theme={theme}>
				<div className="container">
				
				</div>
			</MuiThemeProvider>
		)
	}
}