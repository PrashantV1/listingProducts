const { serviceHandler } = require('../utils/ServiceHandler');
const {getAll,getProductByCategory} =require('../service/product.service');

const getAllProducts=async(req,res)=>{
    const products =  getAll()
    serviceHandler(req,res,Promise.resolve(products));
};

const getCategoryProduct=async(req,res)=>{
    const {category}=req.params
    const products =  getProductByCategory(category)
    serviceHandler(req,res,Promise.resolve(products));
};



module.exports = {
    getAllProducts,getCategoryProduct
};
