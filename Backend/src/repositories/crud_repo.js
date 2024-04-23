const {StatusCodes} = require('http-status-codes')
const ErrorCodes = require('../utils')
class CrudRepo{
    constructor(model){
        this.model=model
    }

    async create(data){
        const response = await this.model.create(data);
        return response;
    }
    async get(id){
        // db.Books.find({"rating":{$lt:7}}) 
        const response = await this.model.find(id);
        if(!response){
            throw new ErrorCodes("Cannot find the snippet of the given id",StatusCodes.NOT_FOUND)

        }
        return response;
    }
    async update(id,data){
        console.log("inside of teh crud repo",id,data);
        const response = await this.model.updateOne({UniqueId:id},{$set:data});
        console.log("Data updated returned from repo")
        // db.Books.updateOne({_id:ObjectId("65df1817651f28065bfa93d5")},{$set: {rating:7,pages:320} })
        if(!response){
            throw new ErrorCodes("Cannot update the snippet of the given id",StatusCodes.NOT_FOUND)
        }
        return response;
    }

}
module.exports= CrudRepo