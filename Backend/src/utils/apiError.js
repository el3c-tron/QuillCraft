class ApiError extends Error {
    constructor(
        statusCode,
        message,
        data,
        errors = [],
        stack = ""
    ) {
        super()

        this.statusCode = statusCode;
        this.data = data;
        this.success = false;
        this.message = message;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}