import express from 'express';  
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();


router.get('/',async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("error in fetching products",error.message);
        res.status(500).json({success:false,message:"server error"});
        
    }
})

router.post("/", async (req,res) => {
        const product = req.body; //user will send this data
        if(!product.name || !product.price || !product.image){
            return res.status(404).json({success:false,message:"please provide all fields"})
        }

        const newProduct = new Product(product)

        try {
            await newProduct.save();
            res.status(200).json({success:true,data: newProduct});
        } catch (error) {
            console.error("Error in creating new Product",error.message);
            res.status(500).json({success:false,message:"server error"});
        }
});

router.delete("/:id",async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid product ID"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully"});
    } catch (error) {
        console.log("error in deleting products",error.message);
        res.status(500).json({success:false,message:
            "server error"
        });
    }
    
})

router.put("/:id",async (req,res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid product ID"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true, data:updatedProduct})
    } catch (error) {
        console.log("error in updating products",error.message);
        res.status(500).json({success:false,message:error.message});
    }
})


export default router;