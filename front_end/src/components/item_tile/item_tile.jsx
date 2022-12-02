import React from "react";
import './item_tile.scss'
export const Item_tile = ({data:{item_code, gender, brands, product_type, colour, mens_sizes, ladies_sizes,
    boys_sizes, girls_sizes, price, location, quantity}, chosen_store, getStock, port}, ) => {
    
    const size = [mens_sizes, ladies_sizes, boys_sizes, girls_sizes].filter((sz)=>{
        return sz !== null;
    })

    const deleteItem_ = () =>{
        fetch(`http://localhost:${port}/${item_code}`, {
            method:'DELETE'
        })
        .then((response)=>response.text())
        .then((data)=>getStock())
    }

    return (
     <tr>
        <td>
            image for item
        </td>
        <td>
            {gender} {product_type}
        </td>
        <td>
            {brands}
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
            {chosen_store.toLowerCase() === location.toLowerCase() ? 'Yes': 'No'}
        </td>
        <td>
            {quantity}
        </td>
        <td>
            {location}
        </td>
        <td onClick={()=> deleteItem_()}>
            Remove
        </td>
     </tr>
    )
}