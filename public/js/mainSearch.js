var bst;
var f = [];
(function(){

    binarysearchRenderer = new PIXI.WebGLRenderer(800, 400, {backgroundColor : 0xffeb3b, transparent : false, antialias: false});
    $( "#binarysearch" )[0].appendChild(binarysearchRenderer.view);
    binarysearchStage = new PIXI.Container();

    var initialize = function(load, res){
        loader = load;
        resources = res;
        
        pool = new Pool();
        updateQueue = new UpdateQueue();
        createjs.MotionGuidePlugin.install();

        /*tree = new Tree();
        tree.init(binarysearchStage);
        var newNode1 = new TreeNode();   tree.addRoot('c', 1, newNode1);
        var newNode3 = new TreeNode();   tree.addRoot('d', 1, newNode3);
        tree.addSlideRight(newNode3);
        var newNode2 = new TreeNode();   tree.addRoot('b', 1, newNode2);
        tree.addSlideLeft(newNode2);        
        tree.run();*/

        bst = new BinarySearchTree();
        /*bst.put('k', 1);
        bst.put('f', 5);
        bst.put('a', 5);
        bst.put('e', 4);
        bst.put('d', 4);*/
        bst.put('s', 1);
        bst.put('e', 1);
        bst.put('a', 1);
        /*//bst.put('c', 1);
        bst.put('x', 1);
        bst.put('r', 1);
        bst.put('h', 1);
        bst.put('m', 1);*/
        bst.print(binarysearchStage);
        /*arrayblocks = new BlockArray();
        arrayblocks.init(f, binarysearchStage);
        arrayblocks.addBack(arrayblocks.blocks, '1');
        arrayblocks.run();*/
        
        animate();
    } // end initialize

    loadAssets(initialize);

    var update = function(){
        updateQueue.update();
    }

    function animate() {
        update();
        requestAnimationFrame(animate);
        binarysearchRenderer.render(binarysearchStage);
        
    } // end animate

    
})(); // end main

