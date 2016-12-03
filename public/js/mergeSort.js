/*var firstMethod = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('first method completed');
         resolve({data: '123'});
      }, 2000);
   });
   return promise;
};
 
 
var secondMethod = function(someStuff, a) {
    console.log('second method started')
    console.log(someStuff)
    console.log(a)
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('second method completed');
         resolve({newData: someStuff.data + ' some more data'});
      }, 2000);
   });
   return promise;
};
 
var thirdMethod = function(someStuff, a) {
    console.log('third method started')
    console.log(someStuff)
    console.log(a)
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('third method completed');
         resolve({result: someStuff.newData});
      }, 3000);
   });
   return promise;
};
 
firstMethod()
   .then(secondMethod.bind(this, null, 1))
   .then(thirdMethod.bind(null, 2));

*/

var blocks = [];

function mergeSort(arr){
    var aux = [];
    sort(arr, aux, 0, arr.length -1);
}
function merge(arr, aux, lo, mid, hi) {
    console.log('merge ' + lo + ', ' + mid + ', ' + hi);
    // copy to aux[]
    for (var k = lo; k <= hi; k++) {
        aux[k] = arr[k]; 
    }
    // merge back to a[]
    var i = lo, j = mid+1;
    for (var k = lo; k <= hi; k++) {
        if      (i > mid)                    arr[k] = aux[j++];
        else if (j > hi)                     arr[k] = aux[i++];
        else if (aux[j] <= aux[i])           arr[k] = aux[j++];
        else                                 arr[k] = aux[i++];
        
    } 
    printArray(arr);   
}

function sort(arr, aux, lo, hi){
    console.log('sort')
    console.log(arr);
    var promise = new Promise(function(resolve, reject){
        resolve(arr);
    })
    if(hi <= lo) return promise;
    
    printArray(arr);

    var mid = Math.floor(lo + (hi - lo) / 2);
    //sort(arr, aux, lo, mid);
    //sort(arr, aux, mid+1, hi);
    //merge(arr, aux, lo, mid, hi);

    sort(arr, aux, lo, mid)
        .then(
                function(resolve, reject){
                    sort(resolve, aux, mid+1, hi).then(
                        function(resolve, reject){
                            merge(resolve, aux, lo, mid, hi);
                        }
                    );
                }
            );

    promise = new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve(arr);
        }, 2000);
    });
    return promise;
}
var a = [34, 203, 3, 746, 200, 984, 198, 764, 9];
//var a = ['E', 'E', 'G', 'M', 'R', 'A', 'C', 'E', 'R', 'T'];
//var a = ['E', 'G', 'M', 'R', 'A'];
//var a = [4,3,2,1];


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