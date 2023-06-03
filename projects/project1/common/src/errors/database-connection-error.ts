import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor() {
        super('Database connection error!');
    };

    generateErros() {
        return [{ message: 'Database connection error!' }]
    };
};