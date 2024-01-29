const pool = require('./connectDB.js')

/**
 *
 * @param town
 * @constructor
 */
const Town = function(town){
    this.name = town.name;
    this.desc = town.desc;
}

/**
 * Get All Towns
 * @param result
 * @returns {Promise<void>}
 */
Town.getAll = async (result) => {
    //result is call back function responsible for handling things result (err,res) 1st: err, 2nd: res
    try{

        const connection = await pool.getConnection();
        const dbQuery = "SELECT * FROM town";
        const [res] = await connection.query(dbQuery);
        result(null, res);

    }catch (ctErr) {
        console.log("Error On getAll town  :: ", ctErr);
        result(ctErr, null);
    }
}

/**
 * Create New Town
 * @param newTown
 * @param result
 * @returns {Promise<void>}
 */
Town.create = async (newTown, result) => {
    
    try{

        const connection = await pool.getConnection();
        const dbQuery = "INSERT INTO town(t_name,t_desc) VALUES (?,?)";
        const values = [newTown.name, newTown.desc]
        const [res] = await connection.execute(dbQuery, values);

        result(null, {res,...newTown});
    }catch (ctErr) {
        console.log("Error On create town :: ", ctErr);
        result(ctErr, null);
    }
}

/**
 * Update By Id
 * @param id
 * @param newTown
 * @param result
 * @returns {Promise<void>}
 */
Town.updateById = async (id,newTown, result) => {

    try{

        const connection = await pool.getConnection();
        const dbQuery = "UPDATE town SET t_name = ?, t_desc = ? WHERE (t_id = ?)";
        const values = [newTown.name, newTown.desc,id]
        const [res] = await connection.execute(dbQuery, values);

        if (res.affectedRows == 0) throw new Error('Requested Id not found!')

        result(null, {res,...newTown,id:id});
    }catch (ctErr) {
        console.log("Error On updateById town :: ", ctErr);
        result(ctErr, null);
    }
}

/**
 * Delete town
 * @param id
 * @param result
 * @returns {Promise<void>}
 */
Town.delete = async (id, result) => {

    try{

        const connection = await pool.getConnection();
        const dbQuery = "DELETE FROM town WHERE (t_id = ?)";
        const values = [id];
        const [res] = await connection.execute(dbQuery, values);

        if (res.affectedRows == 0) throw new Error('Requested Id not found!')

        result(null, {res,id:id});
    }catch (ctErr) {
        console.log("Error On delete town :: ", ctErr);
        result(ctErr, null);
    }
}

module.exports = Town;
  