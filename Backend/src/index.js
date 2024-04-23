const {ServerConfig,dbConnect}  = require('./config');
const express = require('express');
const {} =require('./controllers');
const apiRoutes =require('./routes');
const cors =require('cors');
const app =express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true }))

app.use('/api',apiRoutes);
dbConnect();
app.listen(ServerConfig.PORT,()=>{
   
    console.log(`Server is running on port ${ServerConfig.PORT}`);
    // Logger.info ("Successfully started the server","root",{msg:"Something"});
})