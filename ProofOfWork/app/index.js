
const express = require('express');
    //express module required 'npm i express --save'

const bodyParser = require('body-parser');
    //npm i body-parser --save
const Blockchain = require('../blockchain');
    //requires blockchain folder which includes our block.js, index.js(formerlly blockchain.js)
    //and index.test.js(formerly blockchain.test.js) ..because folder

const P2pserver = require('./p2p-server')
const HTTP_PORT = process.env.HTTP_PORT || 3001;
    //for our api we need to set a port for it to listen on
    //Screen case so everything is uppercase. This will allow us to run on port 3001 when we run 
    //the server so we can access it through the local host domain and find it on port 3001
    //lets consider the situation where we run multiple instances
    //of the same application on the same machine. they wont have the ability to use the same port
    //thus we need a way to specify different ports to run our applciations on in a diff cmd line
    //we do this using environment variable that uses a port we specify on cmd line
    //HTTP_PORT = command line port OR 3001 just in case something else is already running
    //how to do tht   $HTTP_PORT = 3002 npm run dev --passes value to env variable

const app = express();
    //express application. this creates an express application with a lot of functionality for us


const bc = new Blockchain();
    //new blockchain instance of Blockchain classs
const p2pServer = new P2pserver(bc);


app.use(bodyParser.json());
    //allows us to receive json data within post requests
    //app.use is to use the json middleware from body parser
    //middleware acts like an intermediary functions. transforms outgoing data into another format
    //or transforms incoming data.
app.get('/blocks',(req, res) => {
    res.json(bc.chain);
})

app.post('/mine', (req, res) => {
    // /mine is what users will use when they want to add some data to bchain
    //req and res = request and response
    const block = bc.addBlock(req.body.data);
    //making new block by calling add block on bc instane. req.body.data contains what 
    //data users send. this should add a block to the block instance
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    //nice to have a response to this post request. responds back with updated chain of blocks
    //that includes users blocks with updated data
});
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
//new scripts added to package.json     "start": "node ./app" and  "dev": "nodemon ./app"
