const {SnippetSchema} = require("../models");
const CrudRepo = require("./crud_repo");

class SnippetRepo extends CrudRepo {
    constructor(){
        super(SnippetSchema);
    }
}

module.exports = SnippetRepo