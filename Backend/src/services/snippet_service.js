const {StatusCodes} = require('http-status-codes');
const {SnippetRepo} = require('../repositories');
const {ErrorCodes} = require('../utils');
const snippetRepo = new SnippetRepo();
async function createNewSnippet(data){
    try{
        const snippet = snippetRepo.create(data);
        return snippet; 
    }
    catch(e){
        throw new ErrorCodes("Cant create a unique id",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getSnippet(id){
    try{
        const snippet = await snippetRepo.get(id);
        return snippet;
    }
    catch(e){
        throw new ErrorCodes("Cant create a unique id",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateSnippet(id,data){
    try{
        console.log("Inside of the snippet service",id,data);
        const snippet=snippetRepo.update(id,data);
        return snippet;
    }
    catch(err){
        throw new ErrorCodes("Snippet doesnt exist with the given id",StatusCodes.NOT_FOUND)
    }
}
module.exports ={createNewSnippet,getSnippet,updateSnippet}