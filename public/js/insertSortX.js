function InsertionX(){
    this.create();
}
InsertionX.prototype = {
    create: function(){},
    sort: function(arrayblocks, a){
    	this.arrayblocks = arrayblocks;
    	var n = a.length;
        var exchanges = 0;
        // put smallest element in position to serve as sentinel                
        for (var i = n-1; i > 0; i--) {
            if (this.less(a[i], a[i-1])) {
                this.exch(a, i, i-1);
                exchanges++;
            }
        }
        if (exchanges == 0) return;
        // insertion sort with half-exchanges
        for (var i = 2; i < n; i++) {
            var v = a[i];
            arrayblocks.addCopy(arrayblocks.blocks, arrayblocks.auxBlocks, i, i+1);
            var j = i;
            while (this.less(v, a[j-1])) {
                a[j] = a[j-1];
                this.arrayblocks.addSwap(this.arrayblocks.blocks, this.arrayblocks.blocks, j, j-1);
                j--;
            }
            a[j] = v;
            this.arrayblocks.addSwap(this.arrayblocks.auxBlocks, this.arrayblocks.blocks, 0, j);
            arrayblocks.addRemove(arrayblocks.auxBlocks, 0, 1);
        }
    },
    less: function(v, w){
    	return v < w;
    },
    exch: function(a, i, j){
    	var temp = a[i];
    	a[i] = a[j];
    	a[j] = temp;
    	this.arrayblocks.addSwap(this.arrayblocks.blocks, this.arrayblocks.blocks, i, j);
    }
} // end InsertionX