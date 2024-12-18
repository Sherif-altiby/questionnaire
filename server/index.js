import express from "express";
import { PORT , MONGODBURL} from "./config.js";
import mongoose from "mongoose";
import  cors  from 'cors'
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { Questionaire } from "./models/questionaireModel.js";
import { Image } from "./models/imageModal.js";

const app = express();

app.use(cors());

app.use(express.json())

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

app.use('/uploads', express.static(path.resolve('uploads')));

const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      name: req.file.originalname,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newImage.save();

    const allImages = await Image.find().sort({ createdAt: 1 });

    if (allImages.length > 1) {
      const imageToDelete = allImages[0]; 
      const imagePath = path.resolve(imageToDelete.imageUrl);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await Image.deleteOne({ _id: imageToDelete._id });
    }

    res.status(200).json({
      message: 'Image uploaded and previous image deleted successfully',
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the image' });
  }
});

app.get('/image', async (req, res) => {
  try {
    const latestImage = await Image.findOne().sort({ createdAt: -1 });

    if (!latestImage) {
      return res.status(404).json({ message: 'No image found' });
    }

    res.status(200).json({
      message: 'Latest image fetched successfully',
      image: latestImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the image' });
  }
});

app.get('/', (req, res) => {
   console.log(req);

   return res.status(200).send('Welcome to index')
})

app.post('/questionaire', async (req, res) => {
    
    try{

        const newQuestionaire = {
            title: req.body.title
        }

        const questionaire = await Questionaire.create(newQuestionaire);
 
        return res.status(201).send(questionaire)
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

});


// get all questionaires
app.get('/questionaire', async (req, res) => {
     
    try{

        const questionaires = await Questionaire.find({})

        return res.status(200).json( questionaires )

    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})

// get single questionaire using id
app.get('/questionaire/:id', async (req, res) => {
     
    try{

        const { id } = req.params;

        const questionaire = await Questionaire.findById(id )

        return res.status(200).json( questionaire )

    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

});


// update questionaire    
app.put("/questionaire/:id", async (req, res) => {
    
    const { id } = req.params;
    const newRating = req.body;  
  
    try {
       const updatedQuestionnaire = await Questionaire.findByIdAndUpdate(
        id,
        { $push: { rating: newRating } },
       );
  
      if (!updatedQuestionnaire) {
        return res.status(404).json({ message: "Questionnaire not found" });
      }
  
      res.status(200).json({
        message: "Rating added successfully",
        data: updatedQuestionnaire
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

// delete questionaire    
app.delete("/questionaire/:id", async (req, res) => {
    
    const { id } = req.params;
   
    try {
       const updatedQuestionnaire = await Questionaire.findByIdAndDelete( id );
  
      if (!updatedQuestionnaire) {
        return res.status(404).json({ message: "Questionnaire not found" });
      }
  
      res.status(200).json({
        message: "deleted",
       });

    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

 

mongoose.connect(MONGODBURL)
.then(() => {
    console.log('database is connected')

    app.listen(PORT, () => {
        console.log('the server is runing')
    })
})
.catch((error) => {
    console.log(error)
})