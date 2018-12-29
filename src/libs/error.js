'use strict';
class Error {

    /**
     * Creating new errors instance
     */
    constructor() {
        this.errors = {};
    }

    /**
     * Determine if an errors exists for the given field.
     *
     * @param {string} field
     */
    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    /**
     * Determines if there are any errors existing
     */
    any() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Retrieves the error message spitted out by the server.
     * Using Laravel. So the error descriptions are in array.
     * @param {string} field
     */
     get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
     }

     /**
      * Records the errors
      * @param {object} errors
      */
      record(errors) {
          this.errors = errors;
      }

    /**
     * Clearing the error field that satisfied the server's requirements.
     * Otherwise if there is no field supplied then we clear all the errors.
     * @param {string} field
     */
    clear(field) {
        if (field) {
            delete this.errors[field];
            return;
        }

        this.errors = {};
    }

} // class Error

export default Error;