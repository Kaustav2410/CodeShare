const express = require('express');
const router= express.Router();
const {SnippetController} = require('../../controllers')

router.post('/',SnippetController.snippetCreate)
router.get('/:UniqueId',SnippetController.getSnippet);
router.patch('/:UniqueId',SnippetController.snippetUpdate);
module.exports=router;