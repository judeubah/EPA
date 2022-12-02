const pool = require('./db')
const getInventory = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('select * from stock_inventory;', (err, results)=>{
            if(err){
                reject(err)
            }
            resolve(results.rows)
        })
    })
};

const createItem = (body) =>{
    return new Promise((resolve, reject)=>{
        const {gender, brands, product_type, colour, product_description, mens_sizes,
        ladies_sizes, boys_sizes, girls_sizes, price, location, quantity} = body;
        //use prepared statements for sql injection prevention (even though not technically possible
        //still good practice)
        pool.query(`insert into stock_inventory (gender, brands, product_type, colour, product_description, 
        mens_sizes,ladies_sizes, boys_sizes, girls_sizes, price, location, quantity)
        values($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11, $12) returning *`
        ,
        [gender, brands, product_type, colour, product_description, mens_sizes,
        ladies_sizes, boys_sizes, girls_sizes, price, location, quantity]
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
        pool.query(`Delete from stock_inventory`, (error, results)=>{
            if(error){reject(error)}
            resolve(`Database cleared`)
        })
    })
}

const deleteItem = (id) =>{
const item_code = parseInt(id);
   return new Promise((resolve, reject)=>{
    pool.query(`Delete from stock_inventory where item_code = $1`, [item_code],(err, results)=>{
        if(err)reject(err)
        resolve(`item deleted.`)
    })
   })
}

module.exports = {
    getInventory,
    createItem,
    clearDatabase,
    deleteItem
}