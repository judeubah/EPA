const money_query = (object, index) =>{
    const array_update = [];
    let query_update = '';
    let idx = index

    const amounts = [object['Max-Price'], object['Min-Price']];
    if(amounts.filter((val)=> val !== null && val !== undefined).length < 2){
        if(amounts[0]){
            query_update += ` price < $${idx}`;
            array_update.push(amounts[0])
        }else{
            query_update += ` price > $${idx}`;
            array_update.push(amounts[1])
        }
        idx ++
    }
    else{        
        query_update += ` price between $${index} and $${index+1}`
        array_update.push(amounts[1]);
        array_update.push(amounts[0])
        idx +=2
    }

    return {query_update, array_update, idx};
};

module.exports ={
    money_query,
}