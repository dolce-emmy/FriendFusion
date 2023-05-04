import ImageCollection from "../models/imageSchema.js";

// get single image by Id
export const getSingleImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await ImageCollection.findById(id);

    res.status(200).json({ success: true, data: images });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// create a new image
export const createImage = async (req, res) => {
  try {
    const { fileName, fileSize, filePath, contentType } = req.body;
    const { _id } = req.user;
    const createdImage = await ImageCollection.create({
      fileName,
      fileSize,
      filePath,
      contentType,
      userId: _id,
    });
    res.status(201).json({ success: true, data: createdImage });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
