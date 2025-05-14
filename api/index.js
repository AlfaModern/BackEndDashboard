
const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

cloudinary.config({
  cloud_name: 'dbhibiqhu',
  api_key: '497715359544696',
  api_secret: 'Zan3z3omhUegxs9o7fI6CCjH26M'
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/list-images', async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:dashboard AND resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
    res.json(result.resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete-image', async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    res.json({ success: result.result === 'ok' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
