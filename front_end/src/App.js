import React, {useState, useEffect} from 'react';
import { Item_tile } from './components/item_tile/item_tile';
function App() {
  const [inventory, setInventory] = useState(false);
  const PORT = 1960;
  useEffect(()=>{
    getStock();
  }, []);

  const getStock = () =>{
    fetch(`http://localhost:${PORT}`)
    .then((response)=>{
      return response.text()
    })
    .then((data)=>{
      setInventory(data);
    })
  }

  const dataList = (data) =>{
    const list = JSON.parse(data);
    return list.map((item)=>{
      return (
        <Item_tile data={item} chosen_store='London' getStock={getStock} port={PORT}/>
      )
    })
  }

  const generateDB = async () =>{
    const female = ['Ladies', 'Girls'];
    const pence = [.25, .99, .50, .75];
    const sizes_column = {
      mens_sizes:null,
      ladies_sizes: null,
      boys_sizes:null,
      girls_sizes:null
    }
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
    const brands = choices.brands[randomIndex(choices.brands)];
    const product_type = female.includes(gender) ? [...choices.product_type[0], ...choices.product_type[1]][randomIndex([...choices.product_type[0], ...choices.product_type[1]])] : choices.product_type[0][randomIndex(choices.product_type[0])];
    const size = {
      gender,
      sz: product_type === 'Shoes' ? choices.shoe_sizes[randomIndex(choices.shoe_sizes)] : choices.clothes_sizes[randomIndex(choices.clothes_sizes)]
    };
    sizes_column[`${gender.toLowerCase()}_sizes`] = size.sz;
    const price = Math.ceil(Math.random() * (200 - 25) + 25) + pence[randomIndex(pence)];
    const colour = choices.Colour[randomIndex(choices.Colour)];
    const quantity = Math.ceil(Math.random() * 10000);
    const location = choices.location[randomIndex(choices.location)]
    const product_description = `${gender} ${product_type} in ${colour}. £${price}.`
    // console.log(product_type, gender, brands, sizes_column, price, colour, quantity, location, product_description)

    //post to db via backend
    
    const mens_sizes = sizes_column.mens_sizes;
    const ladies_sizes = sizes_column.ladies_sizes;
    const girls_sizes = sizes_column.girls_sizes;
    const boys_sizes = sizes_column.boys_sizes;
  
      fetch(`http://localhost:${PORT}/stock`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({gender, brands, product_type, colour, 
          product_description, mens_sizes, ladies_sizes, boys_sizes, girls_sizes, price,
        location, quantity })
      })
      .then((response)=> response.text())
      .then((data)=>{
        getStock();
      })
    
   
  }

  const clearDb = ()=>{
    fetch(`http://localhost:${PORT}/`, {
      method:'DELETE'
    })
    .then((response)=> response.text())
    .then((data)=>getStock())
  }
  return (
    <div className="App">
     {inventory ? (
    <table>
      <tr>
        <th>
          Item Image
        </th>
        <th>
          Item Type
        </th>
        <th>
          Brand
        </th>      
        <th>
          Colour
        </th>      
        <th>
          Size
        </th>      
        <th>
          Price
        </th>      
        <th>
          Available in store?
        </th>      
        <th>
          Quantity
        </th>      
        <th>
          Location
        </th>      
      </tr>
      {dataList(inventory)}
    </table>
     
     ) : 'No Stock'}
     <button onClick={()=>generateDB()}>Generate DB!</button>
     <button onClick={()=>clearDb()}>Empty DB :( </button>
    </div>
  );
}

export default App;
