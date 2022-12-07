import React from "react";
import { useState } from "react";
import './image_tab.scss';
import { useHistory } from 'react-router-dom'


export const Image_tab = ({name, image, setSelections, selections, filter, routing}) =>{

    
    const history = useHistory();

    const handleHomeSelection = () =>{
            setSelections({
                ...selections,
                gender:name
            })
            
            if(routing){
                console.log('I am a router', selections)
                history.push('/options')
            }
    }
    
    return(
        <div className={`image_tab gender_tab`} onClick={()=>{
            handleHomeSelection()
        }}
         style={{backgroundImage: `url(${`assets/${image}/${name}`}.jpg)`}}><p className="tab_description">{name.toUpperCase()}</p>

        <div className="image_tab__filter" style={{backgroundColor: `rgba(${filter}, 0.45)`}}></div>
        </div>
    )
}