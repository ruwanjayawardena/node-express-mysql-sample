const {findAll,create,update} = require("../controllers/town.controller.js");

const routes = (app) => {
    app.route('/town')
        .get(findAll)
        .post(create)

    app.route('/town/:id')
        .put(update)

        // .put((req, res) => {
        //     res.send('Put Request with ID Successfull');
        // })

        .delete((req, res) => {
            res.send('Delete Request with ID Successfull');
        })
}

module.exports = routes;