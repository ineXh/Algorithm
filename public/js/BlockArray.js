var animateBaseTime = 500;
function BlockArray(){
    this.create();
}
BlockArray.prototype = {
    create: function(){
    	//this.array = [];
    	this.blocks = [];
        this.auxBlocks = [];
    	this.animationQueue = [];
    },
    init: function(array, container){
        //this.array.length = 0;
        this.container = container;
    	for(var i = 0; i < array.length; i++){
    		//this.array[i] = array[i];
            var block = pool.borrowBlock();
    		block.init(container, i*20 + (i+1)*block.width, 50, '' + array[i]);
            if(container.parent != null){
                if(block.sprite.x > container.parent.view.width)
                    container.parent.resize(container.parent.view.width + block.sprite.width,
                                            container.parent.view.height);
                //if(block.sprite.x > container.parent.width) debugger;
            }
    		this.blocks.push(block);
    	}
    },
    clean: function(){
        for(var i = this.blocks.length-1; i >= 0; i--){
            var block = this.blocks[i];
            block.clean();
            pool.returnBlock(block);
            this.blocks.splice(i, 1);
        }
        for(var i = this.auxBlocks.length-1; i >= 0; i--){
            var block = this.auxBlocks[i];
            block.clean();
            pool.returnBlock(block);
            this.auxBlocks.splice(i, 1);
        }
    }, // end clean
    update: function(){
    	/*if(this.animationQueue.length < 1) return null;
      var a = this.animationQueue[0];
      m.motion();
      if(a.isDead()){
        m.clean();
        if(this.moves.length >= 2){
          this.moves[1].init();
          this.moves[1].time_s = time.count;
        }
        this.moves.splice(0, 1);
      }
    }*/
    },
    swap: function(i, j){
    	var blockI = this.blocks[i];
    	var blockJ = this.blocks[j];
    	var x0 = blockI.sprite.x;
    	var y0 = blockI.sprite.y;
    	var x1 = blockJ.sprite.x;
    	var y1 = blockJ.sprite.y;
    	//debugger;
    	updateQueue.add(blockI);
    	updateQueue.add(blockJ);
    	createjs.Tween.get(blockI.pos, {loop: false})
    		.to({guide:{ path:[x0, y0, 
    							(x0 + x1)/2,
    							(y0 + y1)/2 + blockI.sprite.height, 
    							x1, y1] }}, animateBaseTime)
    		.call(function(){
    			updateQueue.remove(blockI);
    			blockI.update();
    		})        	
		createjs.Tween.get(blockJ.pos, {loop: false})
    		.to({guide:{ path:[x1, y1, 
    							(x0 + x1)/2,
    							(y0 + y1)/2 + blockJ.sprite.height, 
    							x0, y0] }}, animateBaseTime)
        	.call(function(){
    			updateQueue.remove(blockJ);
    			blockJ.update();
    		})
    }, // end swap
    addBack: function(array, text){
        var obj = {array: array, text: text, type: AnimationType.addBack};
        this.animationQueue.push(obj);
    },
    addCopy: function(arrFrom, arrTarget, i, j){
        var obj = {i: i, j: j, arrFrom: arrFrom, arrTarget: arrTarget, type: AnimationType.copy};
        this.animationQueue.push(obj);
    },
    addRemove: function(array, i, j){
        var obj = {i: i, j: j, array: array, type: AnimationType.remove};
        this.animationQueue.push(obj);
    },
    addSwap: function(arrFrom, arrTarget, i, j){
    	var obj = {i: i, j: j, arrFrom: arrFrom, arrTarget: arrTarget, type: AnimationType.swap};
    	this.animationQueue.push(obj);
    },
    addFlashOn: function(i){
        var obj = {i: i, type: AnimationType.flashOn};
        this.animationQueue.push(obj);  
    },
    run: function(){    	
    	if(this.animationQueue.length == 0)    return;
    	var animation = this.animationQueue[0];
        switch(animation.type){
            case AnimationType.addBack:
                this.runAddBack(animation);
                break;
            case AnimationType.copy:
                this.runCopy(animation);
                break;
            case AnimationType.remove:
                this.runRemove(animation);
                break;
            case AnimationType.swap:
                this.runSwap(animation);
                break;
            case AnimationType.flashOn:
                this.runFlashOn(animation);
                break;
        }
    }, // end run
    runAddBack: function(animation){
        var run = this.run;
        var blockArray = this;
        var animationQueue = this.animationQueue;
        
        var newBlock = pool.borrowBlock();
        if(animation.array.length > 0){
            //debugger;
            var lastBlock = animation.array[animation.array.length-1];
            i = 1;
            newBlock.init(blockArray.container, 
                lastBlock.pos.x + (i+1)*20 + (i+1)*newBlock.width, lastBlock.pos.y, animation.text);    
        }else{
            i = 1;
            newBlock.init(blockArray.container, i*20 + (i+1)*newBlock.width, 50, animation.text);
        }
        animation.array.push(newBlock);
        updateQueue.add(newBlock);
        var x0 = newBlock.sprite.x;
        var y0 = newBlock.sprite.y;
        var x1 = newBlock.sprite.x - newBlock.sprite.width - 20;
        var y1 = newBlock.sprite.y;// + newBlock.sprite.height*1.5;
        createjs.Tween.get(newBlock.pos, {loop: false})
        .to({guide:{ path:[x0, y0, 
                            (x0 + x1)/2 - newBlock.sprite.width, 
                            (y0 + y1)/2 + newBlock.sprite.height, 
                            x1, y1] }}, animateBaseTime)
        .call(function(){            
            updateQueue.remove(newBlock);
            newBlock.update();
            animationQueue.splice(0, 1);
            setTimeout(function(){
                run.call(blockArray);
            },100);
        })
    },
    runRemove: function(animation){
        //debugger;
        //console.log('runRemove');
        var run = this.run;
        var blockArray = this;
        var animationQueue = this.animationQueue;
        var k = animation.j - 1;
        for(var i = animation.j - 1; i >= animation.i && i >= 0 && i < animation.array.length; i--){
            var time = (animateBaseTime - i*animateBaseTime/5 > animateBaseTime/5) ? animateBaseTime - i*animateBaseTime/5 : animateBaseTime/5;
            createjs.Tween.get(animation.array[i].sprite)
            .to({alpha: 0}, time)
            .call(function(){                
                animation.array[k].clean();
                pool.returnBlock(animation.array[k]);
                animation.array.splice(k,1);
                k--;                
                if(k < animation.i){
                    //debugger;
                    animationQueue.splice(0, 1);
                    setTimeout(function(){
                        run.call(blockArray);
                    },100);
                }                
            });
        }        
    }, // end runRemove
    runCopy: function(animation){
        //console.log('runCopy');
        //var obj = {i: i, j: j, arrFrom: arrFrom, arrTarget: arrTarget, type: AnimationType.copy};
        var run = this.run;
        var blockArray = this;
        var animationQueue = this.animationQueue;
        var k = 0;
        var newBlocks = [];
        for(var i = animation.i; i < animation.j; i++){
            var block = animation.arrFrom[i];
            var newBlock = pool.borrowBlock();
            newBlock.init(blockArray.container, block.pos.x, block.pos.y, block.text.text);
            animation.arrTarget.push(newBlock);
            newBlocks.push(newBlock);
            updateQueue.add(newBlock);
            var x0 = block.sprite.x;
            var y0 = block.sprite.y;
            var x1 = block.sprite.x;
            var y1 = block.sprite.y + block.sprite.height*1.5;
            createjs.Tween.get(newBlock.pos, {loop: false})
            .to({guide:{ path:[x0, y0, 
                                (x0 + x1)/2 - newBlock.sprite.width, 
                                (y0 + y1)/2 + newBlock.sprite.height, 
                                x1, y1] }}, animateBaseTime)
            .call(function(){
                //debugger;
                //updateQueue.remove(animation.arrTarget[animation.arrTarget.length-1-(animation.j-1-k)]);
                updateQueue.remove(newBlocks[k]);
                newBlocks[k].update();
                k++;
                if(k >= animation.j - animation.i){
                    //debugger;
                    animationQueue.splice(0, 1);
                    setTimeout(function(){
                        run.call(blockArray);
                    },100);
                }
            })
        }
    }, // end runCopy
    runFlashOn: function(animation){
        var run = this.run;
        var blockArray = this;
        var animationQueue = this.animationQueue;
        var blockI = this.blocks[animation.i];
        //updateQueue.add(blockI);
        createjs.Tween.get(blockI.sprite, {loop: false})
            .to({tint: 0xBBFFBB}, 150)
            .to({tint: 0xFFFFFF}, 150)
            .call(function(){
                //updateQueue.remove(blockI);
                //blockI.update();
                animationQueue.splice(0, 1);
                setTimeout(function(){
                    run.call(blockArray);
                },100);
            });
    }, // end runFlashOn
    runSwap: function(animation){
        //console.log('runSwap')
        var run = this.run;
        var blockArray = this;
        var animationQueue = this.animationQueue;
        var blockI = animation.arrFrom[animation.i];
        var blockJ = animation.arrTarget[animation.j];
        if(blockI == undefined) debugger;
        if(blockJ == undefined) debugger;
        var x0 = blockI.sprite.x;
        var y0 = blockI.sprite.y;
        var x1 = blockJ.sprite.x;
        var y1 = blockJ.sprite.y;
        //debugger;
        updateQueue.add(blockI);
        updateQueue.add(blockJ);

        createjs.Tween.get(blockI.pos, {loop: false})
            .to({guide:{ path:[x0, y0, 
                                (x0 + x1)/2,
                                (y0 + y1)/2 + blockI.sprite.height, 
                                x1, y1] }}, animateBaseTime)
            .call(function(){
                updateQueue.remove(blockI);
                blockI.update();
            })
        createjs.Tween.get(blockJ.pos, {loop: false})
            .to({guide:{ path:[x1, y1, 
                                (x0 + x1)/2,
                                (y0 + y1)/2 + blockJ.sprite.height, 
                                x0, y0] }}, animateBaseTime)
            .call(function(){
                updateQueue.remove(blockJ);
                blockJ.update();
                temp = animation.arrFrom[animation.i];
                animation.arrFrom[animation.i] = animation.arrTarget[animation.j];
                animation.arrTarget[animation.j] = temp;
                //temp = blockArray.array[animation.i];
                //blockArray.array[animation.i] = blockArray.array[animation.j];
                //blockArray.array[animation.j] = temp;

                animationQueue.splice(0, 1);
                setTimeout(function(){
                    run.call(blockArray);
                },100);
            })
    }, // end runSwap
} // end BlockArray