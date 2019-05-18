var loadAssets = function(cb){
	PIXI.loader
		.add('arrow', 'assets/arrow.png')
		.add('bunny', 'assets/bunny.png')
		.add('circle', 'assets/circle.png')
		.add('line', 'assets/line.png')
		.add('square', 'assets/square.png')
		.load(cb.bind(this));        
} // end loadAssets