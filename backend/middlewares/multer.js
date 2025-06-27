import multer from "multer";
// image come from frontend , multer middleware put that img in public folder for sometime
// store image in public folder and after uploading to cloudinary , we delete from public folder(unlink)
const storage=multer.diskStorage({
// destination= public folder in backend
// cb=call back
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    // filename = original name
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

export const upload=multer({storage})