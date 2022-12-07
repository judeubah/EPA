import React from "react";
import { useHistory } from 'react-router-dom';
import { Option_Picker } from "../Option_Picker/Option_Picker";
import './selection_tab.scss'


export const Selection_tab = ({name, options, setSelections, selections, filter, routing}) =>{
    const history = useHistory();
    const handleChange = ({target})=>{
        let {name, value} =target;
        if(value === 'none'){
            if(name === 'location'){
                setSelections({
                    ...selections,
                    [name]:'Any'
                })
                return
            }
            
        }
        setSelections({
            ...selections,
            [name]: value
        })

        if(routing && name !== 'location'){
            console.log('I am a router');
            history.push('/options')
        }
        
    }
    
    return(
        <div className="selection_tab" style={{backgroundImage: `url(/assets/${name}/${name === 'location' ? selections.location === (undefined) || selections.location === 'Any' ? 'Any' : selections.location : name}.jpg)`}}>
            <div className="tab_description">{name.replace('_', ' ').toUpperCase()}</div>
            <div className="selectors_container">
                <Option_Picker
                    options={options}
                    optionGroup={name}
                    handleChange={handleChange}
                    chosen={name === 'location' ? selections.location : false}
                    selections={selections}
                    label={false}
                />
            </div>
        <div className="selection_tab__filter" style={{backgroundColor: `rgba(${filter}, 0.45)`}}></div>
        </div>
    )
}