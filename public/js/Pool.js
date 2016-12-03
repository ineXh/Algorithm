function Pool() {
    this.loadPool();
}
Pool.prototype = {
    loadPool: function(){
        this.createBlocks(20);
    },
    createBlocks: function(amount){
        this.blocks = [];
        for(var i = 0; i < amount; i++){
            this.blocks.push(new Block());
        }
    }, // end createBlocks
    borrowBlock : function(){ 
        if(this.blocks.length >= 1){
            var block = this.blocks.shift();
            return block;
        }
        else return null;
    }, // end borrowBlock
    returnBlock: function(block){
        this.blocks.push(block);
    }, // end returnBlock
} // end Pool