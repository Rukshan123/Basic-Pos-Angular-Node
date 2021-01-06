const CustomerDTO=require('../model/CustomerDTO');

const saveCustomer=(req,resp)=>{

    const customer=new CustomerDTO({
        customerID:req.body.customerID,
        customerName:req.body.customerName,
        customerAddress:req.body.customerAddress,
        customerSalary:req.body.customerSalary,

    });

    customer.save().then(result=>{
        resp.status(200).json({"isSaved":true,data:result})
    }).catch(err=>{
        resp.status(500).json(err);
    })

};

const deleteCustomer=(req,resp)=>{

    CustomerDTO.deleteOne({customerID:req.headers.id}).then(result=>{

        if (result.deletedCount>0){
            resp.status(200).json({isDeleted:true});
        }else{
            resp.status(200).json({isDeleted:false});
        }

    }).catch(error=>{
        resp.status(500).json(error);
    });

};


const updateCustomer=(req,resp)=>{

    CustomerDTO.updateOne({customerID:req.body.customerID},
        {
            $set:{
                customerName:req.body.customerName,
                customerAddress:req.body.customerAddress,
                customerSalary:req.body.customerSalary
            }
        }
    ).then(result => {
        if (result.nModified>0){
            resp.status(200).json({isUpdated:true});
        }else{
            resp.status(200).json({isUpdated:false});
        }
    }).catch(err=>{
        resp.status(500).json({err});
    })
};

const getAllCustomer=(req,resp)=>{

    try {

            CustomerDTO.countDocuments(function (e,count){
                const pagination=req.query.pagination?Number(req.query.pagination):10;
                let page=req.query.page?Number(req.query.page):1;

                if (page===0){
                    page=1;
                }

                CustomerDTO.find().skip((page-1)*pagination).limit(pagination).sort({customerSalary:-1}).then(result=>{
                    resp.status(200).json({data:result,count:count});
                }).catch(error=>{
                    resp.status(500).json(error);
                })

            });

    }catch (e) {

    }

};

const getCustomerByID=(req,resp)=>{

    CustomerDTO.findOne({customerID:req.headers.id}).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    })

};


const getCustomerWithOrder=(req,resp)=>{

            CustomerDTO.aggregate([


                {$match:{customerID:req.headers.id}},
                {
                    $lookup:{
                        from:'orders',
                        localField:'customerID',
                        foreignField:'cId',
                        as:'ordersArray'
                    }
                }

            ]).then(result=>{
                resp.status(200).json(result);
            }).catch(error=>{
                resp.status(500).json(error);
            });

};

const getChartData=(req,resp)=>{
    resp.status(200).json({data:[
        15,50,34,47,90,24,54,78,64,83,82,29
        ]})
}


module.exports={
    saveCustomer,
    deleteCustomer,
    updateCustomer,
    getAllCustomer,
    getCustomerByID,
    getCustomerWithOrder,
    getChartData
};