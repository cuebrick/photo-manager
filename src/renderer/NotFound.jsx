import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component{
	render(){
		return(
			<div>
				<h1>Application Error</h1>
				<div className="contents">
					<p>Error type : Request view not found.</p>
				</div>
			</div>
		)
	}
}