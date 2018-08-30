//Chain of blocks


const Block = require('./block');
    //blockchain.js requires block.js because block.js is referenced

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain){
            //parameter is incoming chain. Function to check if the chain is valid. 
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
            //ensures first element of incoming chain matches the genesis block 
            //stringify because in javascript two different objects not referencing 
            //same original object can not be equal to eachother
            //returns false if incoming genesis block is not valid

        for(let i = 1; i < chain.length; i++){
            //run validations on every following block after the genesis block of incoming chain
            //iterate upto the length of the chain
            //go through every block up to the end of the chain
            const block = chain[i];
                //current block being evaluated
            const lastBlock = chain[i-1];
                //previous block of first block, to check if block.lastHash = lastBlock.hash

            if(block.lastHash !== lastBlock.hash || 
                block.hash !== Block.blockHash(block)){
                    return false;
                }
                    //reurns false if block.lastHash ! = lastBlock.hash
                    //possible that the current blocks hash has been tampered with. So we need
                    // to check if block.hash is the correct hash based on the input of the block
        }
        return true;
            //chain is valid
            //testing; 1.) validates valid chain, 2.) invalidates chain with corrupt genesis block,
            // 3.) invalidates chain with corrupt block thats not genesis block
    }

    replaceChain(newChain) {
        if(newChain.length <= this.chain.length) {
            console.log('Chain is not longer than the current chain');
            return;
        }
            //ensure that the chain being replaced is longer than current chain
            //choosing longest chain helps resolve forking issues. 
        else if(!this.isValidChain(newChain)){
            console.log('the received chain is not vali')
            return;
        }
            //ensures newChain is valid.
        this.chain = newChain;
        console.log('replacing current chain with longer newChain')
    }
}

module.exports = Blockchain;
