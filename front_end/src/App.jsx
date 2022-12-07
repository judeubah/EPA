import React, {useState, useEffect} from 'react';
import { Results_Page } from './pages/results/results';
import { Switch, Route, NavLink} from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { choices, brand_colours } from './components/Data';
import './components/Data/brand.scss'
import { Option_Form } from './pages/Options_Form/Options_Form';
import { Nav_Bar } from './components/Nav_Bar/Nav_Bar';
function App() {
  const [inventory, setInventory] = useState(false);
  const [selections, setSelections] = useState({});
  const [dataBase, setDataBase] = useState([]);
  const backgroundImage = '/assets/main_background/background.jpg';
  const PORT = 1960;

  useEffect(()=>{
    const db_maintain = async()=>{
      const _db = await fetch(`http://localhost:1960/`)
      .then((response)=>{
        return response.text()
      })
      if(_db.length){
       getDb()
      }
    }
    db_maintain();
  }, [])

  const getStock = async (storedSelections=false) =>{
    let opts = selections
    if(storedSelections){
      opts = storedSelections
    }
   return fetch(`http://localhost:1960/specific-search/${JSON.stringify(opts)}`)
    .then((response)=>{
      return response.text()
    })
    .then((data)=>{
      setInventory(JSON.parse(data));
    })
  }

  const getDb = () =>{
      fetch(`http://localhost:1960`)
      .then((response)=>{
        return response.text()
      })
      .then((data)=>{
        setDataBase(JSON.parse(data));
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

  
    return  fetch(`http://localhost:${PORT}/stock`, {
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
    .then((data)=>getDb())
  }

  const randomDb = async () =>{
    for (let x = 0; x < 200; x++){
      await generateDB();
    }
    getDb();
  }

  return (
    <>
      <Nav_Bar
      selections={selections}
      dataBase={dataBase}
      randomDb={randomDb}
      clearDb={clearDb}/>
      <main>
      <Switch>
        <Route exact path = {'/'}>
          <Home 
          selections={selections}
          setSelections={setSelections}
          choices={choices}
          filters={brand_colours}
          backgroundImage={backgroundImage}
          />
        </Route>
        <Route exact path = {'/search-results'}>
          <Results_Page 
            location={selections.location}
            inventory={inventory}
            PORT={PORT}
            getStock={getStock}
            selections={selections}
            setSelections={setSelections}
            backgroundImage={backgroundImage}
           />
        </Route>
        <Route exact path = {'/options'}>
          <Option_Form
          selections={selections}
          setSelections={setSelections}
          getStock={getStock}
          inventory={inventory}
          backgroundImage={backgroundImage}
          />
        </Route>
      </Switch>
      <a className='hidden' href="https://www.vecteezy.com/free-vector/fashion-icon">Fashion Icon Vectors by Vecteezy</a>
      </main>
    </>
  );
}

export default App;
