(function(){
	renderer = new PIXI.WebGLRenderer(400, 400, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();


    var initialize = function(load, res){
        loader = load;
        resources = res;
        
        pool = new Pool();

        canvas1Setup();

        animate();
    } // end initialize

    loadAssets(initialize);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(stage);
    } // end animate
})(); // end main

