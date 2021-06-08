import './App.css';
import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

function App() {
  //Mandatory Requirement 1: Make an API call to get a product list
  const [state, setState] = useState([])
  useEffect(() => {
    fetch("http://18.224.200.47/products/list")
      .then(data => data.json())
      .then(data => setState(data))
  }, [])

  //Mandatory Requirement 5: Make it so that only one product's photo is visible at a time, and clicking it again closes the photo
  const [expanded, setExpanded] = React.useState(false);
  const [img, setImg] = useState([])
  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
    fetch("http://18.224.200.47/products/" + id + "/styles")
      .then(res => res.json())
      .then(res => setImg(res.results[0].photos[0].url))
  };

  return (
    <div>
      <ul>
        {state.map(product =>
          <Accordion expanded={expanded === product.id} onChange={handleChange(product.id)}>
            {/* Mandatory Requirement 3: Display a list of products as cards with text of description */}
            <AccordionSummary>
              <b>{product.name}: {product.description}</b>
            </AccordionSummary>
            {/* Mandatory Requirement 2: Make an API call to get specific details on a given product when its entry is clicked */}
            <AccordionDetails>
              <p>
                ID: {product.id}
                <br />
                Name: {product.name}
                <br />
                Slogan: {product.slogan}
                <br />
                Description: {product.description}
                <br />
                Category: {product.category}
                <br />
                Price: {product.default_price}
                {/* Mandatory Requirement 4: Make each product clickable so that when clicked, it displays an image from the API for that product*/}
                <br />
                Image: <img src={img}></img>
              </p>
            </AccordionDetails>
          </Accordion>
        )}
      </ul>
    </div>
  );
}

export default App;
