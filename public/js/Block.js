function Block(){
    this.create();
}
Block.prototype = {
    create: function(){
        this.createSpecific();   	
    },
    createSpecific: function(){
        this.width = 40;
        this.sprite = buttonCreate(resources.square.texture, 0, 0, this.width);     
        this.sprite.tint = 0xFFFFFF;
        this.pos = new PVector(0, 0);
        this.text = new PIXI.Text('1', {font: 'bold ' + 16 + 'px Arial', fill: 0x000000, align:"center"});
        this.text.anchor.x = this.text.anchor.y = 0.5;
    },
    init: function(container, x, y, text){
    	this.container = container;
        this.sprite.alpha = 1;
    	this.sprite.x = this.text.x = this.pos.x = x;
    	this.sprite.y = this.text.y = this.pos.y = y;
    	this.text.text = text;
    	container.addChild(this.sprite);
    	container.addChild(this.text);
        this.isDown = false;
    	spriteListener.call(this, this.sprite, this.touchDown, this.touchMove, this.touchUp, this.touchUp);//, touchupoutside, releaseoutside)

    	//spriteListenerMove.call(this, this.sprite, this.touchMove);    	    	
    },
    update: function(){
        this.sprite.x = this.text.x = this.pos.x;
        this.sprite.y = this.text.y = this.pos.y;
    },
    clean: function(){
    	spriteListenerRemove(this.sprite);
    	this.container.removeChild(this.sprite);
    	this.container.removeChild(this.text);
    },
    touchMove: function(event){
        //debugger;
    	if(!this.isDown) return;
    	getMouseBasic(event);
    	//console.log(event)
    	//debugger;
    	this.pos.x = this.sprite.x = this.text.x = event.data.global.x;//mousePos.x;
    	this.pos.y = this.sprite.y = this.text.y = event.data.global.y;//mousePos.y;    	
    },
    touchDown: function(event){
    	
        if(spriteTouched) return;
    	this.isDown = true;
    	spriteTouched = true;
    },
    touchUp: function(event){
    	this.isDown = false;
    	spriteTouched = false;
    }
} // end Block