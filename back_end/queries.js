const pool = require('./db');


const getDB = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('select * from ourproducts', (err, results)=>{
            if(err){
                reject(err)
            }
            resolve(results.rows)
        })
    })
};

const getSpecific = (query, queryArray) =>{
    return new Promise((resolve, reject)=>{
        pool.query(query, queryArray, (err, results)=>{
            if(err){
                reject(err)
            }
            resolve(results.rows)
        })
    })
}

const createItem = (body) =>{
    return new Promise((resolve, reject)=>{
        const {gender, brand, product_type, colour, product_description, size, price, location, quantity} = body;
        //use prepared statements for sql injection prevention (even though not technically possible
        //still good practice)
        pool.query(`insert into ourproducts (gender, brand, product_type, colour, product_description, 
        size, price, location, quantity)
        values($1, $2, $3, $4, $5, $6,$7, $8, $9) returning *`
        ,
        [gender, brand, product_type, colour, product_description, size, price, location, quantity]
        ,
        (error, results)=>{
            if (error) {
                reject(error)
            }
            resolve(`Successful POST: ${results}`)
        }
      
        )
    })
}


const clearDatabase = () =>{
    return new Promise((resolve, reject)=>{
        pool.query(`Delete from ourproducts`, (error, results)=>{
            if(error){reject(error)}
            resolve(`Database cleared`)
        })
    })
}

const deleteItem = (id) =>{
const item_code = parseInt(id);
   return new Promise((resolve, reject)=>{
    pool.query(`Delete from ourproducts where item_code = $1`, [item_code],(err, results)=>{
        if(err)reject(err)
        resolve(`item deleted.`)
    })
   })
}

module.exports = {
    getDB,
    createItem,
    clearDatabase,
    deleteItem,
    getSpecific
}