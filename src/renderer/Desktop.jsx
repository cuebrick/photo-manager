import React from 'react';
import Files from '../module/Files.js';

const files = new Files();

export default class Desktop extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			dirList: []
		}
	}
	
	
	componentDidMount(){
		let pathList = files.getDirectoryList();
		let list = [];
		// console.log(pathList);
		pathList.map((item, index) => {
			list.push({
				id : index,
				path: item.path,
				name: files.getFolderName(item.path),
				files: files.getFileList(item.path),
			})
			console.log(list);
		});
		this.setState({dirList: list})
	}
	
	render(){
		return(
			<div className="container">
				{
					this.state.dirList.map((data, index) => {
						return (
							<div className="photo-group" key={index}>
								<div className="group-ui">
									<h5>{data.name}</h5>
								</div>
								{
									data.files.map((fileName, index) => {
										console.log('---',fileName);
										return <img src={data.path + '\\' + fileName} key={index} alt="--"/>
									})
								}
							</div>
						)
					})
				}
				
			</div>
		)
	}
}