function Tree(){
    this.create();
}
Tree.prototype = {
    create: function(){
    	this.root;
    	this.animationQueue = [];
    }, // end create
    init: function(container){
    	this.container = container;
    },
    addRoot: function(key, value, node){
        var obj = {key: key, value: value, node: node, type: AnimationType.addRoot};
        this.animationQueue.push(obj);
    },
    addSlideLeft: function(node){
    	var obj = {node: node, type: AnimationType.slideLeft};
        this.animationQueue.push(obj);
    },
    addSlideRight: function(node){
    	var obj = {node: node, type: AnimationType.slideRight};
        this.animationQueue.push(obj);
    },
    run: function(){
    	if(this.animationQueue.length == 0)    return;
    	var animation = this.animationQueue[0];
        switch(animation.type){
        	case AnimationType.addRoot:
                this.runAddRoot(animation);
                break;
            case AnimationType.slideLeft:
            case AnimationType.slideRight:
             	this.runSlide(animation, animation.type);
             	break;
        }
    }, // end run
    runAddRoot: function(animation){
    	var run = this.run;
        var tree = this;
        var animationQueue = this.animationQueue;
        newNode = animation.node;

        if(this.root == null){
        	this.root = newNode;
        	newNode.init(tree.container, 200, 80, animation.key, animation.value);
        }else{
        	newNode.init(tree.container, this.root.sprite.x + 100, this.root.sprite.y - this.root.sprite.height*1.2, animation.key, animation.value);
        	newNode.sprite.tint = 0xFF8888;
        	newNode.parent = this.root;
        }

        var x0 = newNode.sprite.x;
        var y0 = newNode.sprite.y;
        var x1 = newNode.sprite.x - 100;
        var y1 = newNode.sprite.y;

        updateQueue.add(newNode);

        createjs.Tween.get(newNode.pos, {loop: false})
        .to({guide:{ path:[x0, y0, 
                            (x0 + x1)/2 - newNode.sprite.width, 
                            (y0 + y1)/2 - newNode.sprite.height, 
                            x1, y1] }}, animateBaseTime)
        .call(function(){            
            updateQueue.remove(newNode);
            newNode.update();
            newNode.sprite.tint = 0xFFFFFF;
            animationQueue.splice(0, 1);
            setTimeout(function(){
                run.call(tree);
            },200);
        })        
    }, // end runAddRoot
    runSlide: function(animation, type){
    	var run = this.run;
        var tree = this;
        var animationQueue = this.animationQueue;
        node = animation.node;

        var x0 = node.sprite.x;
        var y0 = node.sprite.y;
        switch(type){
        	case AnimationType.slideLeft:
        		var x1 = node.parent.sprite.x - node.sprite.width;
        		break;
        	case AnimationType.slideRight:
        		var x1 = node.parent.sprite.x + node.sprite.width;
        		break;
        }        
        var y1 = node.parent.sprite.y + node.sprite.height;
        node.sprite.tint = 0xFF8888;
        updateQueue.add(node);

        createjs.Tween.get(node.pos, {loop: false})
        .to({guide:{ path:[x0, y0, 
                            (x0 + x1)/2, 
                            (y0 + y1)/2, 
                            x1, y1] }}, animateBaseTime)
        .call(function(){            
            updateQueue.remove(node);
            node.update();
            node.sprite.tint = 0xFFFFFF;
            animationQueue.splice(0, 1);
            setTimeout(function(){
                run.call(tree);
            },200);
        })        
    }, // end runSlideLeft
} // end Tree