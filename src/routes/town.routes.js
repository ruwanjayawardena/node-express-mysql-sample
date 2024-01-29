const {findAll,create} = require("../controllers/town.controller.js");

const routes = (app) => {
    app.route('/town')
        .get(findAll)
        .post(create)

    app.route('/town/:id')
        .post((req, res) => {
            res.send('POST Request with ID Successfull');
        })

        .put((req, res) => {
            res.send('Put Request with ID Successfull');
        })

        .delete((req, res) => {
            res.send('Delete Request with ID Successfull');
        })
}

module.exports = routes;