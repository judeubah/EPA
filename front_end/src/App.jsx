import React, {useState, useEffect} from 'react';
import { Results_Page } from './pages/results/results';
import { Switch, Route, NavLink} from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { choices, brand_colours } from './components/Data';
import './components/Data/brand.scss'
import { Option_Form } from './pages/Options_Form/Options_Form';
function App() {
  const [inventory, setInventory] = useState(false);
  const [selections, setSelections] = useState({location:'London'});
  const [redundantOptions, setRedundantOptions] = useState([])
  const PORT = 1960;



  const getStock = () =>{
    fetch(`http://localhost:1960/specific-search/${JSON.stringify(selections)}`)
    .then((response)=>{
      return response.text()
    })
    .then((data)=>{
      setInventory(JSON.parse(data));
    })
  }



  const generateDB = async () =>{
    const female = ['Ladies', 'Girls'];
    const pence = [.25, .99, .50, .75];
 
    const randomIndex = arr => Math.floor(Math.random()*arr.length);
    const choices = {
      gender: ['Mens', 'Ladies', 'Boys', 'Girls'],
      brands: ['Nike', 'Adidas', 'UNIQLO', 'H&M', 'Zalando', 'Luluemon', 'Primark','Armani', 'Topshop',
      'Burberry', 'New Balance', 'Ralph Lauren', 'Gucci', 'Champion', 'Urban Outfitters', 'Arne'
      ],
      product_type: [['Fleeces', 'Hoodies', 'Jackets and Coats', 'Jeans', 'Polo Shirts', 'Shirts',
      'Shoes', 'Shorts', 'Sweatshirts', 'Tracksuit Bottoms', 'Tracksuits', 'Trousers', 'T-Shirts'],
      ['Dresses & Skirts', 'Leggings & Tights']
      ],
      Colour: ['Beige', 'Black', 'Blue', 'Green', 'Grey', 'Multi', 'Orange', 'Pink', 'Purple',
      'Red', 'Silver', 'White', 'Yellow', 'Gold'],
      clothes_sizes: ['S','M','L', 'XL', 'XXL'],
      shoe_sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
      location: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Newcastle', 'Sheffield']
    };
    const gender = choices.gender[randomIndex(choices.gender)];
    const brand = choices.brands[randomIndex(choices.brands)];
    const product_type = female.includes(gender) ? [...choices.product_type[0], ...choices.product_type[1]][randomIndex([...choices.product_type[0], ...choices.product_type[1]])] : choices.product_type[0][randomIndex(choices.product_type[0])];
    const size = product_type === 'Shoes' ? choices.shoe_sizes[randomIndex(choices.shoe_sizes)] : choices.clothes_sizes[randomIndex(choices.clothes_sizes)]
    const price = Math.ceil(Math.random() * (200 - 25) + 25) + pence[randomIndex(pence)];
    const colour = choices.Colour[randomIndex(choices.Colour)];
    const quantity = Math.ceil(Math.random() * 10000);
    const location = choices.location[randomIndex(choices.location)]
    const product_description = `${gender} ${product_type} in ${colour}. £${price}.`
    

    //post to db via backend

  
      fetch(`http://localhost:${PORT}/stock`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({gender, brand, product_type, colour, 
          product_description, size, price,
        location, quantity })
      })
      .then((response)=> response.text())
      
    
   
  }

  
  const clearDb = ()=>{
    fetch(`http://localhost:${PORT}/`, {
      method:'DELETE'
    })
    .then((response)=> response.text())
    .then((data)=>getStock())
  }

  const randomDb = () =>{
    for (let x = 0; x < 200; x++){
      generateDB()
    }
  }

  return (
    <>
      <nav>
        
      </nav>
      <main>
      <Switch>
        <Route exact path = {'/'}>
          <Home 
          inventory={inventory}
          clearDb={clearDb}
          generateDB={generateDB}
          selections={selections}
          setSelections={setSelections}
          randomDb={randomDb}
          choices={choices}
          filters={brand_colours}
          setRedundantOptions={setRedundantOptions}
          />
        </Route>
        <Route exact path = {'/search-results'}>
          <Results_Page 
            location={selections.location}
            inventory={inventory}
            PORT={PORT}
            getStock={getStock}
           />
        </Route>
        <Route exact path = {'/options'}>
          <Option_Form
          selections={selections}
          setSelections={setSelections}
          redundantOptions={redundantOptions}
          getStock={getStock}
          />
        </Route>
      </Switch>
      </main>
    </>
  );
}

export default App;
