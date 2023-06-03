import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Not found!');
    };

    generateErros() {
        return [{ message: 'Not found!' }];
    };

};