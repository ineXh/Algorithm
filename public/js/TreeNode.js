function NodeColor(){}
NodeColor.Black = 0;
NodeColor.Red = 1;

function TreeNode(key, value, parent){
    this.create(key, value, parent);
}
TreeNode.prototype = Object.create(Block.prototype);
TreeNode.prototype.constructor = Block;
TreeNode.prototype.create = function(key, value, parent, color){
	this.createSpecific(key, value, parent, color);
}
TreeNode.prototype.createSpecific = function(key, value, parent, color){
	this.width = 40;
    this.sprite = buttonCreate(resources.circle.texture, 0, 0, this.width);     
    this.sprite.tint = 0xFFFFFF;
    this.pos = new PVector(0, 0);
    this.text = new PIXI.Text('' + key, {font: 'bold ' + 16 + 'px Arial', fill: 0x000000, align:"center"});
    this.text.anchor.x = this.text.anchor.y = 0.5;

    this.key = key;
	this.value = value;
	this.parent = parent;
	this.left = null;
	this.right = null;
	this.count = 1; // number of nodes in subtree
	if(color) this.color = color;
	else this.color = NodeColor.Black;	
}
TreeNode.prototype.init = function(container, x, y, key, value){
	this.key = key;
	this.value = value;
	this.parent = null;
	//this.left = null;
	//this.right = null;
	//this.count = 0; // number of nodes in subtree
	TreeNode.prototype.constructor.prototype.init.call(this, container, x, y, key);
}
TreeNode.prototype.shiftX = function(x){
	this.sprite.x += x;
	this.text.x += x;
	if(this.left !== null){
		this.left.shiftX(x);
	}
	if(this.right !== null){
		this.right.shiftX(x);
	}
} // end shiftX
