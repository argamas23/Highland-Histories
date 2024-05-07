
const Archive = require('../models/Archive');

exports.getArchiveById = async (req, res) => {
  try {
      const archive = await Archive.findById(req.params.id);
      if (!archive) {
          return res.status(404).json({ message: 'Archive not found' });
      }
      res.json(archive);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


  exports.uploadArchive = async (req, res) => {
    try {
        
        const newArchive = new Archive({
            userId: req.body.userId,
            title: req.body.title,
            caption: req.body.caption,
            categories: JSON.parse(req.body.categories),
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            filename: req.file.filename
        });
    //     await archive.save();
    //     res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    // } catch (error) {
    //     res.status(500).json({ message: 'File upload failed', error });
    // }
    const savedArchive = await newArchive.save();
        res.json({ message: "File uploaded successfully", filename: req.file.filename, archive: savedArchive });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
// exports.getArchivesByFeature = async (req, res) => {
//   try {
//       const archives = await Archive.find();
//       res.json(archives);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };

exports.getArchivesByFeature = async (req, res) => {
  try {
      const archives = await Archive.find({ feature: req.query.feature });
      res.json(archives);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
  
  // exports.updateArchive = async (req, res) => {
  //   try {
  //     // In a real app, you'd update the archive in the database:
  //     // const archive = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //     const updatedArchive = { id: req.params.id, ...req.body }; // Placeholder
  //     res.json(updatedArchive);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  
  // exports.deleteArchive = async (req, res) => {
  //   try {
  //     // In a real app, you'd delete the archive from the database:
  //     // const archive = await Archive.findByIdAndRemove(req.params.id);
  //     // Placeholder response:
  //     res.json({ message: `Archive with id ${req.params.id} deleted.` });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  
  exports.getUserUploads = async (req, res) => {
    try {
        const uploads = await Archive.find({ userId: req.query.userId });
        // const userId = req.params.userId; 
        // const uploads = await Archive.find({ user: userId });
        res.json(uploads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.updateArchive = async (req, res) => {
//     try {
//         const updatedArchive = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedArchive);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.updateArchive = async (req, res) => {
  try {
      const updatedArchive = await Archive.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      res.json(archive);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.deleteArchive = async (req, res) => {
    try {
        await Archive.findByIdAndRemove(req.params.id);
        res.json({ message: `Archive with id ${req.params.id} deleted.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
  