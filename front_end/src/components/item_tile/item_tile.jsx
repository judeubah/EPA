import React, { useState } from "react";
import './item_tile.scss'
export const Item_tile = ({data:{item_code, gender, brand, product_type, colour, size, price, location, quantity}, chosen_store, getStock, port, volume, shade, imgNum, visibility, index}) => {
        


  

    const deleteItem_ = () =>{

        fetch(`http://localhost:${port}/${item_code}`, {
            method:'DELETE'
        })
        .then((response)=>response.text())
        .then(()=>getStock())
    }


    return (
     <tr key={Math.random() * 999} className={`${visibility}`}>
        <td >
            <div className="product_image__container" 
            style={{ backgroundImage: 
            `url(/assets/product_types/${product_type.replace(/\s/g, '_')}/${imgNum}.jpg)` }}>
               
            </div>
        </td>
        <td>
            {gender} {product_type}
        </td>
        <td>
            {brand}
        </td>
        <td>
            {colour}
        </td>
        <td>
            {size}
        </td>
        <td>
            {price}
        </td>
        <td>
            {typeof(location) ==='String' ? chosen_store.toLowerCase() === location.toLowerCase() ? 'Yes': 'No' : 'Yes'}
        </td>
        <td>
            <div className="quantity_column">
                <div className='varied_fill' style={{width: `${volume}%`, backgroundColor: shade}}>
                </div>
            </div>
            <div className={`quantity_value`}>
            {quantity}
            </div>
        </td>
        <td>
            {location}
        </td>
        <td onClick={deleteItem_}>
            Remove
        </td>
     </tr>
    )
}