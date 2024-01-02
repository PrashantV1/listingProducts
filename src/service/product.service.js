const axios = require('axios');
const ApiError = require('../utils/ApiError');
const {cache}=require('./cacheService');


const getAll=async()=>{
    if(cache['products']) return cache['products']
    const method = {
        url: `https://dummyjson.com/products?limit=100`,
        method: 'GET',
        timeout: 10000,
      };

      try{
        const response = await axios(method);
        cache['products']=response.data;
        return response.data;
      }catch(err){
        throw new ApiError(400,'Error in getting products data');
      }

}

const getProductByCategory=async(category)=>{
    const allProducts=await getAll();
    const output=[];
    allProducts.products.forEach((product)=>{if(product.category==category)output.push(product)});
    if(!output.length)
    return {
data:'No Product Found'}
    return output;
}





module.exports = {
    getAll,getProductByCategory
  };
  