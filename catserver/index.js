const express = require("express");
const app = express()
const api_helper = require('./API_Helper')
require('dotenv').config()
var cors = require('cors')
const PORT = process.env.PORT || 8080;
var fs = require('fs');
var fileName = './catpop.json';
var file = require(fileName);

app.use(cors())
app.use(express.json())


app.get('/cat-breeds', (req, res) => {
    api_helper.make_API_call('https://api.thecatapi.com/v1/breeds', {
        Method: 'GET',
        Header: {
            'x-api-key': process.env.CAT_API_KEY 
        }
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

app.post('/cat-photos/:breedId', (req, res) => {
    const { breedId } = req.params;
    api_helper.make_API_call(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=16&order=RANDOM&format=json&size=small`, {
        Method: 'GET',
        Header: {
            'x-api-key': process.env.CAT_API_KEY 
        }
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

app.get('/cat-popularity', (req, res) => {
    const sorted = Object.entries(file).sort((a,b) => b[1]-a[1]).slice(0,10)
       
    res.send(sorted);
})

app.post('/cat-pop-add/:breed', (req, res) => {
    const { breed } = req.params;
    let amount = 0;
    if(file[breed]) amount = file[breed]
    file[breed] = amount + 1 ;
    fs.writeFile(fileName, JSON.stringify(file), function (err) {
      if (err) res.send(err)
    });
    res.send(breed)
})

/* app.post('/age/:name', (req, res) => {
    const { name } = req.params;
    api_helper.make_API_call(`https://api.genderize.io?name=${name}`)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})
*/


app.listen(PORT, () => console.log('Server Running at Port' + PORT))