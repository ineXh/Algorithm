var f = [];
(function(){

    stackRenderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0xffeb3b, transparent : false, antialias: false});
    $( "#stack" )[0].appendChild(stackRenderer.view);
    stackStage = new PIXI.Container();

    var initialize = function(load, res){
        loader = load;
        resources = res;
        
        pool = new Pool();
        updateQueue = new UpdateQueue();
        createjs.MotionGuidePlugin.install();
        arrayblocks = new BlockArray();

        arrayblocks.init(f, stackStage);
        arrayblocks.addBack(arrayblocks.blocks, '1');
        arrayblocks.addBack(arrayblocks.blocks, '2');
        arrayblocks.addBack(arrayblocks.blocks, '3');
        arrayblocks.addRemove(arrayblocks.blocks, 2, 3);
        arrayblocks.addRemove(arrayblocks.blocks, 1, 2);
        arrayblocks.addBack(arrayblocks.blocks, '4');
        arrayblocks.addBack(arrayblocks.blocks, '5');
        arrayblocks.addRemove(arrayblocks.blocks, 2, 3);
        arrayblocks.addRemove(arrayblocks.blocks, 1, 2);
        arrayblocks.addRemove(arrayblocks.blocks, 0, 1);
        arrayblocks.run();
        
        animate();
    } // end initialize

    loadAssets(initialize);

    var update = function(){
        updateQueue.update();
    }

    function animate() {
        update();
        requestAnimationFrame(animate);
        stackRenderer.render(stackStage);
        
    } // end animate

    
})(); // end main

