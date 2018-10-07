import fs from 'fs';

export default class Files {
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