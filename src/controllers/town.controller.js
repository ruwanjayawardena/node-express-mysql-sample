const Town = require("../models/town.model.js");
// 400 Bad Request – client sent an invalid request, such as lacking required request body or parameter
// 401 Unauthorized – client failed to authenticate with the server
// 403 Forbidden – client authenticated but does not have permission to access the requested resource
// 404 Not Found – the requested resource does not exist
// 412 Precondition Failed – one or more conditions in the request header fields evaluated to false
// 500 Internal Server Error – a generic error occurred on the server
// 503 Service Unavailable – the requested service is not available

/**
 * Final All
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const findAll = async (req, res) => {
    try {
        await Town.getAll((err, data) => {

            //handling err passed by model
            if (err) throw new Error(err);

            res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error occurred while fetching towns."
        });
    }
}

/**
 * Create
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const create = async (req, res) => {

    try {

        //validate body content
        if (!req.body) {
            res.status(400).send({
                message: "Request body could not be empty!"
            });
        }

        //create new town object from constructor
        const town = new Town({
            name: req.body.name, desc: req.body.desc
        });

        await Town.create(town, (err, data) => {

            //handling err passed by model
            if (err) throw new Error(err);

            res.status(201).send(data);
        });
    } catch (error) {

        if (error.message.includes('Duplicate entry')) {
            res.status(409).send({
                message: error.message
            });
        } else {
            res.status(500).send({
                message: error.message || "Error occurred while creating towns."
            });
        }
    }
}

/**
 * Create
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const update = async (req, res) => {

    try {

        //validate body content
        if (!req.body) {
            res.status(400).send({
                message: "Request body could not be empty!"
            });
        }

        //create new town object from constructor
        const town = new Town({
            name: req.body.name, desc: req.body.desc
        });

        await Town.updateById(req.params.id, town, (err, data) => {

            //handling err passed by model
            if (err) throw new Error(err);

            res.status(200).send(data);
        });
    } catch (error) {

        if (error.message.includes('Duplicate entry')) {
            res.status(409).send({
                message: error.message
            });
        } else if (error.message.includes("Id not found")) {
            res.status(404).send({
                message: error.message
            });
        } else {
            res.status(500).send({
                message: error.message || "Error occurred while updating towns."
            });
        }
    }
}

module.exports = {
    findAll, create, update
}