const mongoose = require('mongoose');

const SnippetSchema =new mongoose.Schema({
  LanguageType: 
    {
        type: String, 
        required: true 
    }, 
  Code: 
    { 
        type: String, 
        required: true 
    }, 
  UniqueId: 
    { 
        type: String, 
        required: true 
    },  
  theme: 
    { 
        type: String, 
        enum:["light","vs-dark"], 
        required: true 
    } 
})

module.exports=mongoose.model("SnippetSchema",SnippetSchema);
