function SelectionSort(){
    this.create();
}
SelectionSort.prototype = {
    create: function(){},
    sort: function(arrayblocks, a){
    	this.arrayblocks = arrayblocks;
    	var n = a.length;
        for (var i = 0; i < n; i++) {
            var min = i;
            for (var j = i+1; j < n; j++) {
                if (this.less(a[j], a[min])) min = j;
            }
            this.exch(a, i, min);
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
} // end SelectionSort