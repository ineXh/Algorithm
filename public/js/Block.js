function Block(){
    this.create();
}
Block.prototype = {
    create: function(){
    	this.width = 20;
    	this.sprite = buttonCreate(resources.square.texture, 0, 0, this.width);    	
    	this.sprite.tint = 0xFFFFFF;
    	this.text = new PIXI.Text('1', {font: 'bold ' + 16 + 'px Arial', fill: 0x000000, align:"center"});
    	this.text.anchor.x = this.text.anchor.y = 0.5;
    },
    init: function(container, x, y, text){
    	this.container = container;
    	this.sprite.x = x;
    	this.sprite.y = y;
    	this.text.x = x;
    	this.text.y = y;
    	this.text.text = text;
    	container.addChild(this.sprite);
    	container.addChild(this.text);
    	spriteListener.call(this, this.sprite, this.touchDown, this.touchMove, this.touchUp, this.touchUp);//, touchupoutside, releaseoutside)

    	//spriteListenerMove.call(this, this.sprite, this.touchMove);    	    	
    },
    clean: function(){
    	spriteListenerRemove(this.sprite);
    	this.container.removeChild(this.sprite);
    	this.container.removeChild(this.text);
    },
    touchMove: function(event){
    	if(!this.isDown) return;
    	getMouseBasic(event);
    	//console.log(event)
    	//debugger;
    	this.sprite.x = this.text.x = event.data.global.x;//mousePos.x;
    	this.sprite.y = this.text.y = event.data.global.y;//mousePos.y;    	
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