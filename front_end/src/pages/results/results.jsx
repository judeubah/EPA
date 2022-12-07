import React, {useState, useEffect} from 'react';
import { Item_tile } from '../../components/item_tile/item_tile';
import { Link, useHistory } from 'react-router-dom'
import './results.scss'
import { No_RESULTS } from '../../components/No_Results/no_results';
export const Results_Page = ({location, PORT, inventory, backgroundImage, getStock, selections, setSelections}) => {
const history = useHistory();
    // console.log(selections, 'results')

useEffect(()=>{
    const INVENTORY_MAINTAIN = async () =>{
        await getStock();
    }
    INVENTORY_MAINTAIN();
}, [])

  const [pageNum, setPageNum] = useState(1)
  const [results_cap, setResults_cap] = useState(10)
  
const handleRedirect = (route)=> {
    if(route === '/options'){
        setSelections({
            ...selections,
            gender:'none',
            product_type:'none',
            size:'none',
            brand:'none'
        })
        return history.push(route)
    }else{
        setSelections({});
        return history.push(route)
    }
}

  const getShade = (vol) =>{
    let colour;
    if (vol <= 0.34){
        colour = '#ff1818'
    }
    else if (vol <= 0.66){
        colour = '#ffa500'
    }
    else{
        colour = '#39ff14'
    }

    return colour
}

  const handlePage = (page) =>{
    setPageNum(page);
  }

  const handleCapacityChange = (num)=>{
    const currentSelection1st = (results_cap * (pageNum -1)) + 1 
    const newPage = Math.ceil(currentSelection1st / num)
    setPageNum(newPage)
    setResults_cap(num)
  }
  return (
    <section className="results_page" style={{backgroundImage:`url(${backgroundImage})`}}>
        
     {inventory.length > 0 ? (
    <div className="results_page__results">
        <div className="results_different_pages" >{[...Array(Math.ceil(inventory.length/results_cap)).keys()].map((num=>num+1)).map((page)=>(
            <button className={pageNum === page ? "active_page page_button" : "page_button"} onClick={()=>handlePage(page)}>{page}</button>
        ))}
        
        <div className="currentResults">
            Showing results: {1 + (pageNum -1) * results_cap} to {pageNum !== Math.ceil(inventory.length/results_cap) ? results_cap * pageNum : inventory.length }
        </div>

        <div className="capacity_options">
            <p>Items/page:</p>
            <div className="results_radios">
            <input type="radio" name='capicitor'  onChange={()=>handleCapacityChange(5)}/>5
            <input type="radio" name='capicitor'  onChange={()=>handleCapacityChange(10)}/>10
            <input type="radio" name='capicitor' onChange={()=>handleCapacityChange(20)}/>20
            <input type="radio" name='capicitor' onChange={()=>handleCapacityChange(50)}/>50

            </div>
        </div>
        </div>
        <div className="results_table__container">
        <table className='results_table'>
        <tbody className='results_table__body'>
            <tr>
            <th className='Big_Screen_Only'>
                Item Image
            </th>
            <th>
                Description
            </th>
            <th>
                Brand
            </th>      
            <th className='Big_Screen_Only Non_Tablet' >
                Colour
            </th>      
            <th className='Big_Screen_Only Non_Tablet'>
                Size
            </th>      
            <th className='Big_Screen_Only Non_Tablet'>
                Price
            </th>      
            <th className='Big_Screen_Only'>
                In store?
            </th>      
            <th>
                Quantity
            </th>      
            <th className='Big_Screen_Only Non_Tablet'>
                Location
            </th>      
            <th>
                Remove
            </th>      
            </tr>
            {inventory.map((item, index)=>(
            <Item_tile data={item}
            chosen_store={location} 
            getStock={getStock}  
            port={PORT} 
            volume={item.quantity / 100}
            shade={getShade((item.quantity/10000))}
            imgNum = {Number(String(item.quantity)[0])}
            index ={index}
            visibility={(index) <( results_cap * pageNum)  &&
            (index) >= results_cap * (pageNum-1) ? "show" : 'hidden' }
            />
            ))}

        </tbody>
        </table>
        </div>
        
        <div className="routing_buttons">
            <div onClick={()=>handleRedirect('/options')} className="routing_btn">{`<< Back`}</div>
            <div onClick={()=>handleRedirect('/')} className="routing_btn__secondary">{`Home`}</div>
        </div>

    </div>
     ) : 
     <No_RESULTS
     handleRedirect={handleRedirect}/>
     }

    </section>
  );
}