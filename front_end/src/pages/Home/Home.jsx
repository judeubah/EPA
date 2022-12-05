import React from "react";
import { Link } from 'react-router-dom'
import { Image_tab } from "../../components/image_tab/image_tab";
import { Selection_tab } from "../../components/Selection_Tab/Selection_Tab";
import './home.scss';
export const Home = ({inventory, randomDb, clearDb, selections, setSelections, choices, filters, setReundantOptions}) =>{
  
    console.log(selections)

    const option_selections = [
       { product_type:[...choices.product_type[0], ...choices.product_type[1]]},
       { brand:[...choices.brands]},
        {location:[ ...choices.location]}
    ];
    return(
        <div className="Home">
            {selections.location && (<h2>Current Store:{selections.location}</h2>)}

            <div className="home_tabs">
                {choices.gender.map((item, index)=>(
                    <Image_tab
                    name={item}
                    image={'gender'}
                    scrollers={false}
                    options={false}
                    setSelections={setSelections}
                    selections={selections}
                    filter={filters[index]}
                    />
                ))}
                {option_selections.map((item, index)=>(
                    <Selection_tab
                    name={Object.keys(item)[0]}
                    options={item[Object.keys(item)[0]]}
                    setSelections={setSelections}
                    selections={selections}
                    filter={filters[index]}
                    female_choices={choices.product_type[0]}
                    />
                ))}
                 </div>

            <div className="generation_buttons">
                <button  disabled={inventory.length ? true : false } onClick={()=>randomDb()} >Generate DB!</button>
                <button disabled={inventory.length === 0 ? true : false }  onClick={()=>clearDb()}>Empty DB :( </button>
            </div>

            <div className="next_pages">
                <Link to='/search-results'>Results</Link>
                <Link to='/options'>More options</Link>
            </div>
        </div>
    )
}