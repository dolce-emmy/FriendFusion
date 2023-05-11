import ImageCollection from '../models/imageSchema.js';
import cloudinary from 'cloudinary';

// get single image by Id
export const getSingleImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await ImageCollection.findById(id);

        res.status(200).json({ success: true, images: image });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

// upload a single image 

export const createImage = async (req, res) => {
// logic to add more than one file

  const { file } = req.files;
  const fileName = new Date().getTime() + '-' + file.name;
  const contentType = file.mimetype //'image/png'
  const extension = contentType.split('/')[1] // 'png'
  // 123454321234-new-size.png => extension
  const fileNameWithoutExtension= fileName.replace('.'+extension ,'')

  // console.log
    const result = cloudinary.v2.uploader.upload(
        file.tempFilePath,
        // 123454321234-new-size.png
        { public_id: fileNameWithoutExtension }
    );

    result
        .then(async (data) => {
            //console.log(data);
            // console.log(data.secure_url);
            const createdImage = await ImageCollection.create({
              name:fileName,
              size: data.bytes,
              url: data.secure_url,
              contentType: data.format,
              // userId: req.user._id,
          });
    
          res.status(201).json({ success: true, images: createdImage });
        })
        .catch((err) => {
            res.status(400).json({ success: false, message: err.message });
        });

    // res.status(500).json({ success: false, message: "Something went wrong" });
};

// upload multiple image 

export const createMultipleImages = async (req, res) => {
    try {
        console.log(req.files);
      const { file } = req.files;
      const createdImages = [];
  
      // Loop through all the files
      for (const item of file) {
        const fileName = new Date().getTime() + '-' + item.name;
        const contentType = item.mimetype //'image/png'
        const extension = contentType.split('/')[1] // 'png'
        const fileNameWithoutExtension = fileName.replace('.'+extension ,'');
  
        const result = await cloudinary.v2.uploader.upload(
          item.tempFilePath,
          { public_id: fileNameWithoutExtension }
        );
            console.log(result);
        const createdImage = await ImageCollection.create({
          name:fileName,
          size: result.bytes,
          url: result.secure_url,
          contentType: result.format,
          // userId: req.user._id,
        });
  
        createdImages.push(createdImage);
      }
  
      res.status(201).json({ success: true, images: createdImages });
    } catch (error) {
        console.log(error.message);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };
  