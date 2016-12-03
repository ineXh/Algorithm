var loadAssets = function(cb){
	PIXI.loader
		.add('bunny', 'assets/bunny.png')
		.add('circle', 'assets/circle.png')
		.add('square', 'assets/square.png')
		.load(cb.bind(this));        
} // end loadAssets