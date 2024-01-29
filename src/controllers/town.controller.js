const Town = require("../models/town.model.js");

/**
 * Final All
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const findAll = async (req, res) => {
    try {
        await Town.getAll2( (err,data) => {

            //handling err passed by model
            if (err) throw new Error(err);

            res.send(data);
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

        //create new town object
        const town = new Town({
            name: req.body.name,
            desc: req.body.desc
        });

        await Town.create(town,(err,data) => {

            //handling err passed by model
            if (err) throw new Error(err);

            res.send(data);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error occurred while creating towns."
        });
    }
}

module.exports = {
    findAll,
    create
}