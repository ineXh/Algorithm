function Insertion(){
    this.create();
}
Insertion.prototype = {
    create: function(){},
    sort: function(arrayblocks, a){
    	this.arrayblocks = arrayblocks;
    	var n = a.length;
    	for(var i = 0; i < n; i++){
    		for (var j = i; j > 0 && this.less(a[j], a[j-1]); j--) {
                this.exch(a, j, j-1);
            }
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
} // end Insertion