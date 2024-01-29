const {findAll, create, update, deleteTown} = require("../controllers/town.controller.js");

const routes = (app) => {
    app.route('/town')
        .get(findAll)
        .post(create)

    app.route('/town/:id')
        .put(update)
        .delete(deleteTown)
    // .put((req, res) => {
    //     res.send('Put Request with ID Successfull');
    // })
}

module.exports = routes;