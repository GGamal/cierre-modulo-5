var pool = require('./db');
const async = require('hbs/lib/async');
//listar 

async function getNovedades(){
    var query = "select * from novedades order by id desc";
    var rows = await pool.query(query);
    return rows;
}
//fin listar

// insert

async function insertNovedad(obj){
    try{
        var query = "insert into novedades set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

// fin insert



module.exports = {getNovedades, insertNovedad};