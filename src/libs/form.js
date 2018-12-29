'use strict';
import { method } from './ajax';
import Error from './error';

class Form {
    constructor(data) {
        this.originalData = data;

        for (let field in data)
        {
            this[field] = field;
        } // for
        this.errors = new Error();
    }

    /**
     * Fetching all the relevant data in the form.
     */
    data() {
        let data = {};
        for (let property in this.originalData)
        {
            data[property] = this[property];
        }
        return data;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.originalData)
        {
            this[field] = ''; // or null;
        }

        this.errors.clear();
    }

    submit(http, url, data) {
        method(http, url, data)

    }

    /**
     * Handle the successful submission
     * @param {object} data 
     */
    onSuccess(data) {
        console.log(data);
        this.reset();
    }

    /**
     * Handles the failed submission
     * @param {object} errors 
     */
    onFail(errors) {
        console.log(data);
        this.errors.record(errors);
    }


} // Form


export default Form;
// borrowed from Laracasts :)