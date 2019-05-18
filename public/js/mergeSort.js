function mergeSort(arrayblocks, arr){
    var aux = [];
    msort(arrayblocks, arr, aux, 0, arr.length -1);
}
function merge(arrayblocks, arr, aux, lo, mid, hi) {
    console.log('merge ' + lo + ', ' + mid + ', ' + hi);
    // copy to aux[]
    for (var k = lo; k <= hi; k++) {
        aux[k] = arr[k]; 
    }
    arrayblocks.addCopy(arrayblocks.blocks, arrayblocks.auxBlocks, lo, hi+1);
    // merge back to a[]
    var i = lo, j = mid+1;
    for (var k = lo; k <= hi; k++) {
        if(i > mid){
          arrayblocks.addSwap(arrayblocks.auxBlocks, arrayblocks.blocks, j-lo, k);
          arr[k] = aux[j++];
        }else if (j > hi){
          arrayblocks.addSwap(arrayblocks.auxBlocks, arrayblocks.blocks, i-lo, k);
          arr[k] = aux[i++];
        }else if (aux[j] <= aux[i]){
          arrayblocks.addSwap(arrayblocks.auxBlocks, arrayblocks.blocks, j-lo, k);
          arr[k] = aux[j++];
        }else{
          arrayblocks.addSwap(arrayblocks.auxBlocks, arrayblocks.blocks, i-lo, k);
          arr[k] = aux[i++];
        }
    }
    arrayblocks.addRemove(arrayblocks.auxBlocks, 0, hi+1 - lo);
    //printArray(arr);   
} // end merge

function msort(arrayblocks, arr, aux, lo, hi){
    console.log('mergesort ' + lo + ', ' + hi);
    console.log(arr);
    if(hi <= lo) return;
    
    //printArray(arr);

    var mid = Math.floor(lo + (hi - lo) / 2);
    msort(arrayblocks, arr, aux, lo, mid);
    msort(arrayblocks, arr, aux, mid+1, hi);
    merge(arrayblocks, arr, aux, lo, mid, hi);
}
//var a = [34, 203, 3, 746, 200, 984, 198, 764, 9];
//var a = ['E', 'E', 'G', 'M', 'R', 'A', 'C', 'E', 'R', 'T'];
//var a = ['E', 'G', 'M', 'R', 'A'];
//var a = [4,3,2,1];

function bottomUpMergeSort(arrayblocks, arr){
    console.log('bottomUpMergeSort');
    console.log(arr);
    var aux = [];
    var N = arr.length;

    for(var sz = 1; sz < N; sz = sz + sz){
      for(var lo = 0; lo < N - sz; lo += sz + sz){
        merge(arrayblocks, arr, aux, lo, lo + sz - 1, Math.min(lo+sz+sz-1, N-1));
      }
    }    
} // end bottomUpMergeSort

function printArray(arr){
    console.log(arr);
    for (var j = blocks.length - 1; j >= 0; j--) {
        blocks[j].clean();
        pool.returnBlock(blocks[j]);
        blocks.splice(j, 1);
    }
    for(var i = 0; i < arr.length; i++){
        var block = pool.borrowBlock();        
        blocks.push(block);
        block.init(stage, i*20 + (i+1)*block.width, 50, '' + arr[i]);
    }
}
/*function mergeSort(arr){
    if (arr.length < 2)
        return arr;
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
 
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right){
    var result = [];
    
    // while both have at least 1 element
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}*/
//var a = [34, 203, 3, 746, 200, 984, 198, 764, 9];
//console.log(mergeSort(a));