import React from 'react';

export default class Desktop extends React.Component{
	render(){
		return(
			<div className="container">
				<div className="photo-group">
					<div className="group-ui">
						<h5>This is group name</h5>
					</div>
					<img src="sample-photo/pixabay/dawn-3358468_1920.jpg" alt="dawn"/>
					<img src="sample-photo/pixabay/fall-foliage-3705550_1920.jpg" alt="fall foliage"/>
					<img src="sample-photo/pixabay/road-1072823_1920.jpg" alt="road"/>
					<img src="sample-photo/pixabay/terminalia-catappa-2137221_1920.jpg" alt="terminalia catappa"/>
					<img src="sample-photo/pixabay/wheat-3506758_1920.jpg" alt="wheat"/>
				</div>
			</div>
		)
	}
}