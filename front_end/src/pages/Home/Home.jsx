import React from "react";
import { Link } from 'react-router-dom'
import { Image_tab } from "../../components/image_tab/image_tab";
import { Selection_tab } from "../../components/Selection_Tab/Selection_Tab";
import './home.scss';
export const Home = ({selections, setSelections, choices, filters, backgroundImage}) =>{

    
    const option_selections = [
       { product_type:[...choices.product_type[0], ...choices.product_type[1]]},
       { brand:[...choices.brands]},
        {location:[ ...choices.location]}
    ];
    return(
        <section className="Home" style={{backgroundImage: `url(${backgroundImage})`}}>
           
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
                    routing={true}
                    />
                ))}
                {option_selections.map((item, index)=>(
                    <Selection_tab
                    name={Object.keys(item)[0]}
                    options={item[Object.keys(item)[0]]}
                    setSelections={setSelections}
                    selections={selections}
                    filter={filters[index]}
                    routing={true}
                    />
                ))}
                 </div>

          

        </section>
    )
}