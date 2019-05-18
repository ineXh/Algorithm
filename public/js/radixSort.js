function RadixSort(){
    this.create();
}
RadixSort.prototype = {
    create: function(){},
    sort: function(arrayblocks, a){
    	this.arrayblocks = arrayblocks;
        var m = this.getMax(a, a.length);
        for(var exp = 1; Math.floor(m/exp) > 0; exp *= 10) this.countSort(a, a.length, exp);
    },
    getMax: function(a, n){
        var mx = a[0];
        for (var i = 1; i < n; i++)
            if (a[i] > mx)
                mx = a[i];
        return mx;
    },
    // A function to do counting sort of a[] according to
    // the digit represented by exp.
    countSort: function(a, n, exp){
        //console.log('countSort ' + exp)
        var output = []; // output array
        var i;
        var count = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);

        //debugger;
        // Store count of occurrences in count[]
        for (i = 0; i < n; i++)
            count[ Math.floor(a[i]/exp)%10 ]++;
 
        // Change count[i] so that count[i] now contains
        // actual position of this digit in output[]
        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];
 
        // Build the output array
        for (i = n - 1; i >= 0; i--){
            output[count[ Math.floor(a[i]/exp)%10 ] - 1] = a[i];
            count[ Math.floor(a[i]/exp)%10 ]--;
        }
 
        // Copy the output array to a[], so that a[] now
        // contains sorted numbers according to curent digit
        for (i = 0; i < n; i++)
            a[i] = output[i];
        //this.arrayblocks.addCopy(this.arrayblocks.blocks, 
          //                      this.arrayblocks.auxBlocks, 0, this.arrayblocks.blocks.length);
        console.log(a)
    },
    less: function(v, w){
    	return v < w;
    },
    exch: function(a, i, j){
    	var temp = a[i];
    	a[i] = a[j];
    	a[j] = temp;
    	this.arrayblocks.addSwap(this.arrayblocks.blocks, this.arrayblocks.blocks, i, j);
    },    
} // end RadixSort