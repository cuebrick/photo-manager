import fs from 'fs';

export default class Files {
	getDirectoryList(){
		return JSON.parse(localStorage.getItem('directories'));
	}
	saveDirectoryList(list){
		if(list){
			localStorage.setItem('directories', JSON.stringify(list));
		}else{
			new Error('폴더 저장 중 오류가 발생했습니다.')
		}
	}
	getFileList(path){
		let list = [];
		fs.readdir(path, (err, dir) => {
			for(let filePath of dir){
				list.push(filePath);
			}
		});
		return list;
	}
}