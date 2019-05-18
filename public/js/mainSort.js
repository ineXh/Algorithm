(function(){
    radixSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#radixSort" )[0].appendChild(radixSortRenderer.view);
    radixSortStage = new PIXI.Container();

    bucketSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#bucketSort" )[0].appendChild(bucketSortRenderer.view);
    bucketSortStage = new PIXI.Container();

    quickSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#quickSort" )[0].appendChild(quickSortRenderer.view);
    quickSortStage = new PIXI.Container();

    selectSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#selectSort" )[0].appendChild(selectSortRenderer.view);
    selectSortStage = new PIXI.Container();

    binarySortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#binarySort" )[0].appendChild(binarySortRenderer.view);
    binarySortStage = new PIXI.Container();

    insertSortXRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#insertSortX" )[0].appendChild(insertSortXRenderer.view);
    insertSortXStage = new PIXI.Container();

    insertSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#insertSort" )[0].appendChild(insertSortRenderer.view);
    insertSortStage = new PIXI.Container();

	mergeSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#mergeSort" )[0].appendChild(mergeSortRenderer.view);
    mergeSortStage = new PIXI.Container();
    mergeSortStage.parent = mergeSortRenderer;

    bottomUpMergeSortRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#bottomUpMergeSort" )[0].appendChild(bottomUpMergeSortRenderer.view);
    bottomUpMergeSortStage = new PIXI.Container();
    bottomUpMergeSortStage.parent = bottomUpMergeSortRenderer;

    var initialize = function(load, res){
        loader = load;
        resources = res;
        
        pool = new Pool();
        updateQueue = new UpdateQueue();
        createjs.MotionGuidePlugin.install();
        arrayblocks = new BlockArray();
        arrayblocks2 = new BlockArray();

        canvasMergeSortSetup();


        arrayblocks3 = new BlockArray();
        insertion = new Insertion();

        arrayblocks4 = new BlockArray();
        insertionX = new InsertionX();

        canvasInsertSortSetup();

        arrayblocks5 = new BlockArray();
        binaryInsertion = new BinaryInsertion();

        canvasBinaryInsertSortSetup();
        
        arrayblocks6 = new BlockArray();
        selection = new SelectionSort();

        canvasSelectionSortSetup();

        arrayblocks7 = new BlockArray();
        quickSort = new QuickSort();

        canvasQuickSortSetup();

        arrayblocks8 = new BlockArray();
        radixSort = new RadixSort();

        canvasRadixSortSetup();

        arrayblocks9 = new BlockArray();
        bucketSort = new BucketSort();

        canvasBucketSortSetup();

        animate();
    } // end initialize

    loadAssets(initialize);

    var update = function(){
        updateQueue.update();
    }

    function animate() {
        update();
        requestAnimationFrame(animate);
        bucketSortRenderer.render(bucketSortStage);
        radixSortRenderer.render(radixSortStage);
        quickSortRenderer.render(quickSortStage);
        selectSortRenderer.render(selectSortStage);
        binarySortRenderer.render(binarySortStage);
        insertSortXRenderer.render(insertSortXStage);
        insertSortRenderer.render(insertSortStage);
        mergeSortRenderer.render(mergeSortStage);
        bottomUpMergeSortRenderer.render(bottomUpMergeSortStage);
    } // end animate

    
})(); // end main

