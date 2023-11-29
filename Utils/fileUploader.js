const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const fileUploader = async (e)=>{
    console.log(e)
    let Data;
    // return e
    await cloudinary.uploader.upload(e, async (error, data) => {
        if (data) {
            fs.unlinkSync(e);
            console.log(data)
            const url = await data.secure_url
            Data = data
        //   return ("url")
        }
        // console.log(data)
  
        
        // SignupController(req,res)
      //   res.json({
      //     message: "image upload",
      //     data,
      //   });
        ///delete file
        
        // console.log(data, "imfile")
        // return (data)
       
      });
     return Data
}

module.exports = {
    fileUploader
}