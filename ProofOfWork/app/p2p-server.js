//npm i ws --save

const webSocket = require('ws');
    //requires web socket
const P2P_PORT = process.env.P2P_PORT || 5001;
    //environment variable P2P_PORT so the user can define port specifically
    //DEFAULT PORT FOR P2P SERVER by default open ports on port 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
//first check if peers environment variable was declared (process.env.PEERS exists)
//if it does, use terniary expression ? set it to process.env.PEERS.split(','), returns an array, splits on comma,
//of all ws addresses from peers. if not, set to empty array

    //$ HTTP_PORT = 3002 P2P_PORT = 5003 PEERS = ws://localhost:5001,ws://localhost:5001 npm run dev
    //checks if peers env variable has been declared.
    //assume its a string containing list of ws addresses
    //that ws will connect to as its peer
    //ws://localhost:5001
class P2pServer {
    //p2p server class
    constructor(blockchain) {
        //takes blockchain object as input. give each p2p server a blockchain so they can share individual chain object w eachother
        this.blockchain = blockchain;
        this.sockets = [];
        //sockets array contains a list of connected websocket servers
    }

    listen() {
        //start up server, and create server
        const server = new webSocket.Server({ port: P2P_PORT });
        //Server is contained in ws already. Statically used. 
        //passes in p2p port constant P2P_PORT
        server.on('connection', socket => this.connectSocket(socket));
        //set up event listener through function called on. can listen to incoming types of msgs sent to ws server
        //by listening for connection events, we can fire specific code for whenever a new socket connects to this server
        //rather than executing code here, we use connectSocket

        this.connectToPeers();
        //make sure later instances connect to original p2p connection immediately once specified as a peer
        console.log(`Listening for peer-to-peer connections on : ${P2P_PORT}`);
    }

    connectToPeers(){
        peers.forEach(peer => {
            // ws://localhost:5001
            const socket = new webSocket(peer);

            socket.on('open', () => this.connectSocket(socket) );
        });
    }
    connectSocket(socket) {
        this.sockets.push(socket);
        //connects socket to p2p server from server.on
        console.log('Socket connected');
    }
}
module.exports = P2pServer;

