


const Blockchain = require('./index');
const Block = require('./block');
describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain(); 
            //refreshes to new blockchain instance
        bc2 = new Blockchain();
            //for chain validation tests
    });

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    //test 1.) ensures the blockchain starts with the genesis block
    it('adds a new block',()=> {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });
    //test 2.) ensures add block functionality

    //isValidChain tests.
    //test 1 chain is valid
    //test 2 corrupt genesis block means invalid chain
    //test 3 corrupt block thats not genesis block gives invalid chain
    it('validates a valid chain', () => {
        
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
            //toBe method is more convetial for true or false assertions in jest
            //compares bc to bc2 with all data being the same
    });
    it('invalidates a corrupt genesis block', () => {
        bc2.chain[0].data = 'badData';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
            //compare bc to bc2 with bc2 having different data in genesis block
    })
    it('invalidates a corrupted block', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not Foo'
            //add block to chain 2, change the blocks data
        expect(bc.isValidChain(bc2.chain)).toBe(false);  
            //compare bc to bc2 with bc2 having a different second block
    })

    //replaceChain function tests
    //test 1 chain is indeed replaced if given chain is valid
    //test 2 chain is not replaced if it is shorter

    it('replaces the chain with a valid longer chain', () => {
        bc2.addBlock('goo');
            //adds another block
        bc.replaceChain(bc2.chain);
    })

    it('does not replace the chain with one of less than or equal to length', () => {
        bc.addBlock('foo');

        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    })
    
});
