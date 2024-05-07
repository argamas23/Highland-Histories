
const Archive = require('../models/Archive');

exports.getArchiveById = async (req, res) => {
    try {
      // In a real app, you'd fetch the archive from the database using the ID:
      // const archive = await Archive.findById(req.params.id);
      const archive = { id: req.params.id, title: "Sample Archive", content: "..." }; // Placeholder
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
        const archive = new Archive({
            title: req.body.title,
            caption: req.body.caption,
            categories: JSON.parse(req.body.categories),
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            filename: req.file.filename
        });
        await archive.save();
        res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
};
  
  exports.getArchivesByFeature = async (req, res) => {
    try {
      // In a real app, you'd fetch archives from the database based on the feature:
      // const archives = await Archive.find({ feature: req.query.feature });
      const archives = [{ id: 1, title: "Feature Archive", content: "Content with feature", feature: req.query.feature }]; // Placeholder
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
        const userId = req.params.userId; // Assuming you have a way to identify users
        const uploads = await Archive.find({ user: userId });
        res.json(uploads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateArchive = async (req, res) => {
    try {
        const updatedArchive = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedArchive);
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
 
  