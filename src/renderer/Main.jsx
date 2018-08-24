import React from 'react';
import { Link } from 'react-router-dom';

export default class Main extends React.Component{
	render(){
		return(
			<div>
				<h1>Photo Manager</h1>
				<div className="main-contents">
					<p>Photo Manager 는 여러 곳에 나뉘어 있는 여러분의 사진을 한 곳에서 모아 보고 관리할 수 있도록 만들어진 프로그램 입니다.</p>
				</div>
			</div>
		)
	}
}