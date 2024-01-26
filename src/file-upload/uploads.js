import multer from 'multer';
import {v4 as uuidv4} from 'uuid'
import { AppError } from '../utils/AppError.js';
const fileUpload=()=>{
    const storage=multer.diskStorage({})
    function fileFilter(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new AppError("images only",401),false);
    }
    }
    const upload= multer({storage,fileFilter});
    return upload;
}
export const singleUpload=(fieldname)=>{
    return fileUpload().single(fieldname);
}
export const arrayUpload=(fieldname)=>{
    return fileUpload().array(fieldname);
}
export const fieldUpload=(fieldname)=>{
    return fileUpload().fields(fieldname);
}