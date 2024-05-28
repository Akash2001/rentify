const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: ['https://rentify-frontend-rosy.vercel.app/',
        'https://rentify-frontend-rosy.vercel:app/',
        'https://localhost:3000']
}));

mongoose.connect(process.env.ATLAS_URI);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const usersSchema = require("./schemas/userSchema");
const propertySchema = require("./schemas/propertySchema");

const User = mongoose.model('users', usersSchema);
const Property = mongoose.model('properties', propertySchema);

app.post('/login', async (req, res) => {
    let success = false;
    const user = await User.find({ email: req.body.email });
    if (user[0] && user[0].password === req.body.password) success = true;
    res.json({ success: success, user: user[0] });
});

app.post('/signup', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

app.get('/properties/:id', async (req, res) => {
    const id = req.params.id;
    const properties = await (id !== "all" ? Property.find({ "owner._id": id }) : Property.find());
    res.json(properties);
});

app.post('/properties/:id', async (req, res) => {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.json(newProperty);
});

app.delete('/properties/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Property.deleteOne({_id: id});
    res.json({success: result.deletedCount === 1 ? true : false});
});