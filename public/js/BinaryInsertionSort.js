function BinaryInsertion(){
    this.create();
}
BinaryInsertion.prototype = {
    create: function(){},
    sort: function(arrayblocks, a){
    	this.arrayblocks = arrayblocks;
    	var n = a.length;
        for (var i = 1; i < n; i++) {
            // binary search to determine index j at which to insert a[i]
            var v = a[i];
            arrayblocks.addCopy(arrayblocks.blocks, arrayblocks.auxBlocks, i, i+1);
            var lo = 0, hi = i;
            while (lo < hi) {
                var mid = Math.floor(lo + (hi - lo) / 2); 
                if (this.less(v, a[mid])) hi = mid;
                else                 lo = mid + 1;
            }
            // insetion sort with "half exchanges"
            // (insert a[i] at index j and shift a[j], ..., a[i-1] to right)
            for (var j = i; j > lo; --j){
                a[j] = a[j-1];
                this.arrayblocks.addSwap(this.arrayblocks.blocks, this.arrayblocks.blocks, j, j-1);
            }
            a[lo] = v;
            this.arrayblocks.addSwap(this.arrayblocks.auxBlocks, this.arrayblocks.blocks, 0, lo);
            this.arrayblocks.addRemove(this.arrayblocks.auxBlocks, 0, 1);
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
} // end BinaryInsertion