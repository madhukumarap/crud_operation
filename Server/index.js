const express = require("express");
const mongoose = require("mongoose"); // Fix the typo here
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

// schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String, // Use String for phone numbers
}, {
    timestamps: true
});

const userModel = mongoose.model("user", schemaData);

// read the data
app.get("/", async (req, res) => {
    try {
        const data = await userModel.find();
        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// create data and save in data in mongoose
app.post("/create", (req, res) => {
    const newUser = new userModel(req.body);
    newUser.save()
        .then(() => {
            res.json({ success: true, data: "data sent successfully" });
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: error.message });
        });
});

mongoose.connect('mongodb://127.0.0.1:27017/crudoperation')
    .then(() => {
        console.log("connected to db");
        app.listen(port, () => {
            console.log("server is running");
        });
    })
    .catch((err) => console.log(err));
