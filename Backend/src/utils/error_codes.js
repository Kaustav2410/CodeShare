class AppError  extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.explaination= message;
    }
}
module.exports=AppError;
//we extend the built in error object with our own custom error type
//this allows us to create instances of our own errors with their own properties