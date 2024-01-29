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

module.exports = Town;
  