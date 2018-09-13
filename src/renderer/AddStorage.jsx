import React from 'react';
import fs from "fs";

export default class AddStorage extends React.Component{
	constructor(props){
		super(props);
		fs.readdir('./.tmp/photo/samples/', (err, dir) => {
			for(let path of dir){
				console.log(path);
			}
		});
	}
	render(){
		return(
			<div className="container">

			</div>
		)
	}
}