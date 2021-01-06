const OrderSchema=require('../model/OrderDTO');

const placeOrder=(req,resp)=>{
    try {
        const orderDTO=new OrderSchema({

            cId:req.body.cId,
            date:new Date(),
            items:req.body.items
        });

        orderDTO.save().then(result=>{
            resp.status(200).json(result);
        }).catch(error=>{
            resp.status(500).json(error);
        });
    }catch (e) {
        
    }
};

module.exports={
   placeOrder
};

console.log('yes');