const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

async function connectDB(){
    const connection  = await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected')
}

connectDB();

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema);

// POST - Create
app.post('/product', async (req, res)=>{
    await Product.create(req.body);
    res.send('Product added successfully!')
});

// GET - Read
app.get('/product', async (req, res)=>{
    const products = await Product.find();
    res.send(products);
});

// PUT - Update
app.put('/product/:id', async (req, res)=>{
    await Product.updateOne({_id: req.params.id}, req.body);
    res.send('Product Updated Successfully')
});

// DELETE - Delete
app.delete('/product/:id', async (req, res)=>{
    await Product.findByIdAndDelete({_id: req.params.id});
    res.send('Product Deleted Successfully')
});

app.listen(process.env.PORT, 'localhost', ()=>{
    console.log('Server is started on port 3000');
});
