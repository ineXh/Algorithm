var g = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
var f = [170, 45, 75, 90, 802, 24, 2, 66];//
//var d = ['g', 'h', 'a', 'c', 'b' ];//
//var c = ['g', 'h', 'a', 'c', 'b' ];//
var e = ['s', 'o', 'r', 't', 'e', 'x', 'a', 'm','p', 'l', 'e' ];//
var d = ['s', 'o', 'r', 't', 'e', 'x', 'a', 'm','p', 'l', 'e' ];//
var c = ['s', 'o', 'r', 't', 'e', 'x', 'a', 'm','p', 'l', 'e' ];//
var b = ['s', 'o', 'r', 't', 'e', 'x', 'a', 'm','p', 'l', 'e' ];//
var a = ['s', 'o', 'r', 't', 'e', 'x', 'a', 'm','p', 'l', 'e' ];//
//var a = [34, 203, 3, 746, 200, 984, 198, 764, 9];
var arr = [];
var arr2 = [];
var canvasBucketSortSetup = function(){
  arrayblocks9.init(f, bucketSortStage);
  bucketSort.sort(arrayblocks9, g);
  arrayblocks9.run();
}

var canvasRadixSortSetup = function(){
  arrayblocks8.init(f, radixSortStage);
  radixSort.sort(arrayblocks8, f);
  arrayblocks8.run();
}

var canvasQuickSortSetup = function(){
  arrayblocks7.init(e, quickSortStage);
  quickSort.sort(arrayblocks7, e, 0, e.length-1);
  arrayblocks7.run();
}
var canvasSelectionSortSetup = function(){
  arrayblocks6.init(d, selectSortStage);
  selection.sort(arrayblocks6, d);
  arrayblocks6.run();
}
var canvasBinaryInsertSortSetup = function(){
  arrayblocks5.init(c, binarySortStage);
  binaryInsertion.sort(arrayblocks5, c);
  arrayblocks5.run();
}

var canvasInsertSortSetup = function(){
  arrayblocks3.init(a, insertSortStage);
  insertion.sort(arrayblocks3, a);
  arrayblocks3.run();

  arrayblocks4.init(b, insertSortXStage);
  insertionX.sort(arrayblocks4, b);
  arrayblocks4.run();
} // end canvasInsertSortSetup


var canvasMergeSortSetup = function(){
    $( "#form1" ).submit(function( event ) {
      event.preventDefault();
      console.log('hello')
      arr.length = arr2.length = 0;
      arrayblocks.clean();
      arrayblocks2.clean();
      var inText = $("#inText").val();
      arr = inText.split(',');
      for(var i = 0; i < arr.length; i++){
        var temp = parseInt(arr[i]);
        if(!isNaN(temp)) arr[i] = temp;
        arr2[i] = arr[i];
      }

      arrayblocks.init(arr, mergeSortStage);
      mergeSort(arrayblocks, arr);
      arrayblocks.run();

      arrayblocks2.init(arr2, bottomUpMergeSortStage);
      bottomUpMergeSort(arrayblocks2, arr2);
      arrayblocks2.run();   
    });
} // end canvasMergeSortSetups


//block = pool.borrowBlock(); block.init(stage, 50, 50, 'A');
//block = pool.borrowBlock(); block.init(stage, 80, 50, 'B');
//block = pool.borrowBlock(); block.init(stage, 120, 50, 'D');
//array.init(a);
//array.addCopy(array.blocks, array.auxBlocks, 2, 4);
//array.addSwap(array.auxBlocks, array.blocks, 2, 2);
//array.addCopy(array.blocks, array.auxBlocks, 0, 2);
//array.addCopy(array.blocks, array.auxBlocks, 0, a.length);
//array.addRemove(array.auxBlocks, 0, 2);
//array.addFlashOn(0);
//array.addSwap(array.blocks, array.auxBlocks, 1, 1);
//array.addSwap(array.blocks, array.blocks, 0, 1);
//array.addSwap(array.blocks, array.blocks, 2, 3);
//bottomUpMergeSort(a);
//mergeSort(a);

//array.run();
/*createjs.Tween.get(block.sprite, {loop: false})
    .to({alpha: 0, y: 125}, 100)
    .to({alpha: 1, y: 100}, 500)//, createjs.Ease.getPowInOut(2))
    .to({x: 100, tint: 0xFF0000}, 2000);//, createjs.Ease.getPowInOut(2));
createjs.Ticker.setFPS(60);*/
//createjs.Ticker.addEventListener("tick", stage);