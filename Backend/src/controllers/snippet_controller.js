const {StatusCodes}= require('http-status-codes');
const { SuccessResponse,ErrorResponse} = require('../utils');
// https://www.npmjs.com/package/short-unique-id
const ShortUniqueId = require('short-unique-id');
const { SnippetService } = require('../services');
exports.snippetCreate = async (req,res)=>{
    try{
        const {LanguageType,Code,theme} = req.body;
        const {randomUUID} = new ShortUniqueId({length:10})
        // console.log(LanguageType,Code,theme,randomUUID());
        const UniqueId = randomUUID();
        const snippetData = await SnippetService.createNewSnippet({
            LanguageType:LanguageType,
            Code:Code,
            UniqueId:UniqueId,
            theme:theme
        })
        console.log(snippetData);
        SuccessResponse.data=snippetData;
        return res.status(StatusCodes.CREATED).json({
            SuccessResponse
        })
    }
    catch (err) {
        console.log(err);
        ErrorResponse.error=err;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ErrorResponse
        });
    }
}

exports.getSnippet = async (req,res)=>{
    try{
        const {UniqueId} = req.params;
        const snippet = await SnippetService.getSnippet({UniqueId:UniqueId});
        SuccessResponse.data=snippet;
        return res.status(StatusCodes.OK).json({SuccessResponse})
    }
    catch(err){
        console.log(err);
        ErrorResponse.error=err;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ErrorResponse
        });
    }
}
exports.snippetUpdate = async(req,res)=>{
    try{
        const {UniqueId} = req.params;
        console.log("Inside of the snippet controller",UniqueId,req.body);
        const updatedSnippetData = await SnippetService.updateSnippet(UniqueId,{LanguageType:req.body.LanguageType,Code:req.body.Code,theme:req.body.theme});
        console.log("This is the updated data",updatedSnippetData)
        SuccessResponse.data=updatedSnippetData;
        return res.status(StatusCodes.OK).json({SuccessResponse});
    }
    catch(err){
        console.log(err);
        ErrorResponse.error=err;
        return res.status(StatusCodes.NOT_FOUND).json({
            ErrorResponse
        });
    }
}