import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { choices } from "../../components/Data";
import { Option_Picker } from "../../components/Option_Picker/Option_Picker";
import './Options_Form.scss';
import { brand_colours } from '../../components/Data/index';
export const Option_Form = ({selections, setSelections, redundantOptions, getStock})=>{
    const [backCols, setBackCols] = useState([brand_colours[2], brand_colours[1]])

   
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(selections)
        getStock();
        
    }

    const validateMoney = (amount, id)=>{
        if(!amount.length){
            return id ==='Min-Money' ? setSelections({
                ...selections,
                'Min-Price': null
            }) : setSelections({
                ...selections,
                'Max-Price': null
            })
        }
        if(String(Number(amount)) === 'NaN'){
            const alert = document.createElement('p');
            alert.classList.add('failed_form_validation')
            alert.innerHTML = "*Numerical values only!";      
            alert.setAttribute('id',`${id}--blank`);
            if (document.getElementById(`${id}--blank`) === null){
                const missing_field = document.getElementById(id)
                const parentNode = missing_field.parentNode
                parentNode.insertBefore(alert, missing_field)
                }
            return
        }
        if(id === 'Max-Money' && (Number(amount) > 5000 || Number(amount) < 0.01) ){
            const alert = document.createElement('p');
            alert.classList.add('failed_form_validation')
            alert.innerHTML = "*Price must be between £0.01 - £5000";      
            alert.setAttribute('id',`${id}--tooMuch`);
            if (document.getElementById(`${id}--tooMuch`) === null){
                const missing_field = document.getElementById(id)
                const parentNode = missing_field.parentNode
                parentNode.insertBefore(alert, missing_field)
                }
            return
        }
        if(id === 'Min-Money'  && (Number(amount) < 0.01 ||Number(amount) > 5000)){
            const alert = document.createElement('p');
            alert.classList.add('failed_form_validation')
            alert.innerHTML = "*Price must be between £0.01 - £5000";      
            alert.setAttribute('id',`${id}--tooLittle`);
            if (document.getElementById(`${id}--tooLittle`) === null){
                const missing_field = document.getElementById(id)
                const parentNode = missing_field.parentNode
                parentNode.insertBefore(alert, missing_field)
                }
            return
        }

      
        return Number(amount)
    }    
    const handleChange = ({target})=>{
        let {name, value, id} = target;
        if(name === 'Max-Price' || name === 'Min-Price'){
            if(document.getElementById(`${id}--blank`) !== null){
                document.getElementById(`${id}--blank`).remove()
            }
            if(document.getElementById(`${id}--tooMuch`) !== null){
                document.getElementById(`${id}--tooMuch`).remove()
            }
            if(document.getElementById(`${id}--tooLittle`) !== null){
                document.getElementById(`${id}--tooLittle`).remove()
            }
            value = validateMoney(value, id)
            if(!value){
                return
            }
        }
        if(selections['Min-Price'] >= selections['Max-Price']){
            const currentMin = selections['Min-Price'];
            selections['Min-Price'] === 5000 ? setSelections({
                ...selections,
                'Min-Price': 4999,
                'Max-Price': 5000
            }):
            setSelections({
                ...selections,
                'Min-Price': currentMin,
                'Max-Price': 5000
            })
            return
        }
        setSelections({
            ...selections,
            [name]: value
        });
    }
    
    let logo;
    switch(selections.gender){
        case 'Boys': case 'Girls':
            logo = 'Orange'
            break;
        case 'Mens':
            logo = 'Green'
            break;
        case 'Ladies':
            logo = 'Red'
            break;
        default :
            logo = 'Main'
            break;
    }
    return ( 
        <section className="options_form__container" style={{background: `linear-gradient(45deg, transparent, rgb(${backCols[0]}),rgb(${backCols[1]}), transparent)`}}>
            <div className="options_form__content" >
                <div className="form_logo">
                <img src={`/assets/logos/StylishYou_Logo_${logo}.png`} alt={`StylishYou :${logo}'s logo`} />
                {selections.brand && (<p className="selected_brand">{selections.brand}</p>)}
                </div>

                <form onSubmit={handleSubmit} className="options_form">

                <Option_Picker
                optionGroup={'size'}
                options={ selections.product_type ==='Shoes' ? [...choices.shoe_sizes] : [...choices.clothes_sizes]}
                handleChange={handleChange}
                chosen={false}
                selections={selections}
                label={true}
                />
                {!redundantOptions.includes('gender') &&  (
                    <Option_Picker
                    optionGroup={'gender'}
                    options={ choices.gender}
                    handleChange={handleChange}
                    chosen={false}
                    selections={selections}
                    label={true}
                    />
                )}
                {!redundantOptions.includes('product_type') && (
                    <Option_Picker
                    optionGroup={'product_type'}
                    options={ ['Ladies', 'Girls'].includes(selections.gender) ? [...choices.product_type[0], ...choices.product_type[1]] : [...choices.product_type[0]]}
                    handleChange={handleChange}
                    chosen={false}
                    label={true}
                    selections={selections}
                    />
                )}
                {!redundantOptions.includes('brand') && (
                    <Option_Picker
                    optionGroup={'brand'}
                    options={choices.brands}
                    handleChange={handleChange}
                    chosen={false}
                    selections={selections}
                    label={true}
                    />
                )}

                <input className="options_picker" placeholder="Min Price: £0.01" type="text" name={'Min-Price'} id="Min-Money" onChange={handleChange} />
                <input placeholder="Max Price: £5,000" type="text" name={'Max-Price'} id="Max-Money"  onChange={handleChange} />

                <input type="submit" name={'submit'} value="Get results"/>
                </form>

            </div>
            <Link to='/'>Home</Link>
        </section>
    )
}