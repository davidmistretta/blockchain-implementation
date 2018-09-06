//block class

const SHA256 = require('crypto-js/sha256');

class Block{
    constructor (timeStamp, lastHash, hash, data) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
    toString() {
        // ` not ', backtick is for template string
        return `Block -
        timeStamp   = ${this.timeStamp}
        lastHash    = ${this.lastHash}
        hash        = ${this.hash}
        data        = ${this.data}`;
    }
    static genesis() {
        return new this('genesisTime','-----','f1r5t-h45h', [])
    }

    static mineBlock(lastBlock, data) {
        const timeStamp = Date.now();
        const lastHash  = lastBlock.hash;
        const hash      = Block.hash(timeStamp, lastHash, data);
       
        return new this(timeStamp, lastHash, hash, data)
    }

    static hash(timeStamp, lastHash, data){
        return SHA256(`${timeStamp}${lastHash}${data}`).toString();
    }
    
    static blockHash(block){
            //To check whether or not a blocks hash is valid
            const { timeStamp, lastHash, data } = block;
                //assigns timeStamp, lastHash, and data to block
            return Block.hash(timeStamp, lastHash, data);
                //returns the hash again. 
                //wrapping around regular hash function and providing a convenience for 
                //our bc class to use to give only the block as regular input to generate the hash overall
    }
}

module.exports = Block;
