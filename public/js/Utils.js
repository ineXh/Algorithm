var mousePos = {x: 0, y:0, x_pct: 0, y_pct: 0, px: 0, py: 0, sx: 0, sy: 0, raw_x: 0, raw_y: 0,
				stage_x: 0, stage_y: 0, stage_x_pct:0, stage_y_pct:0, clicked: false, touched: false, multitouched: false};
function getMouse(event, touchobj){
	//console.log(touchobj)
	mousePos.px = mousePos.x;
	mousePos.py = mousePos.y;
	if(touchobj != undefined){
		mousePos.x = touchobj.clientX;
		mousePos.y = touchobj.clientY;
		//console.log(touchobj)
	}else if(event.clientX != undefined) {
		//console.log(event)
		mousePos.x = event.clientX;//data.global.x;
        mousePos.y = event.clientY;//data.global.y;
        //console.log(mousePos);
	}else{
		//console.log(event)
		mousePos.x = event.data.global.x;
		mousePos.y = event.data.global.y;
	}
  mousePos.raw_x = mousePos.x;
  mousePos.raw_y = mousePos.y;
  if(stage == undefined) return;
  mousePos.x = mousePos.x / stage.scale.x;
  mousePos.y = mousePos.y / stage.scale.y;
	mousePos.x_pct = mousePos.x / width;
	mousePos.y_pct = mousePos.y / height;
	mousePos.stage_x = mousePos.x - stage.x / stage.scale.x;
	mousePos.stage_y = mousePos.y - stage.y / stage.scale.y;
	mousePos.stage_x_pct = mousePos.stage_x / stage.width;
	mousePos.stage_y_pct = mousePos.stage_y / stage.height;

}
function getMouseBasic(event){
  if(event.type == "mousedown" || event.type == "mousemove"){
    getMouse(event, undefined);
  }else if(event.type == "touchstart" || event.type == "touchmove"){
    getMouse(event.data.originalEvent, event.data.originalEvent.changedTouches[0]);
  }
} // end getMouseBasic

function onMouseStart(event){
  if(spritetouched) return;
	//console.log("mouse start")
	getMouse(event, undefined);

	mousePos.touched = true;
  if(menu_charactercreate != undefined) menu_charactercreate.crop.touchstart();

}
function onMouseMove(event){
  if(!mousePos.touched) return;
  //console.log("onMouseMove")
	getMouse(event, undefined);
  if(menu_charactercreate != undefined)  menu_charactercreate.crop.touchmove();
  if(menu_equip != undefined)  menu_equip.touchmove();

}
function onMouseUp(event){
  if(spritetouched) spritetouched = false;
  if(!mousePos.touched) return;
    //console.log("mouse up")
	getMouse(event, undefined);

  mousePos.touched = false;
  if(menu_charactercreate != undefined) menu_charactercreate.crop.touchend();
  if(menu_equip != undefined)  menu_equip.touchend();
}
function onTouchStart(event){
  if(spritetouched) return;

  event.preventDefault();
	getMouse(event, event.changedTouches[0]);
  mousePos.touched = true;

  if(menu_charactercreate != undefined) menu_charactercreate.crop.touchstart();

} // end onTouchStart
function onMultiTouchStart(event){
  if(mousePos.touched) mousePos.multitouched = true;

}
function onTouchMove(event){
    event.preventDefault();
    if(!mousePos.touched) return;
    //console.log('onTouchMove ' + mousePos.touched)

    //console.log(event.changedTouches)
	getMouse(event, event.changedTouches[0]);
    //stage.x -= mousePos.px - mousePos.x;
    //stage.y -= mousePos.py - mousePos.y;
  onMultiTouchMove(event);
  if(menu_charactercreate != undefined) menu_charactercreate.crop.touchmove();
  if(menu_equip != undefined)  menu_equip.touchmove();

} // end onTouchMove
function onMultiTouchMove(event){
  if(!mousePos.multitouched) return;
  //console.log('onMultiTouchMove')
  //console.log(event.changedTouches);
}

function onTouchEnd(event){
  if(spritetouched) spritetouched = false;
  //console.log('util touchend')
  //console.log(event.changedTouches)
  event.preventDefault();
  if(!mousePos.touched) return;
	//console.log('onTouchEnd')
	//getMouse(event);
	getMouse(event, event.changedTouches[0]);
	mousePos.touched = false;
  if(menu_charactercreate != undefined) menu_charactercreate.crop.touchend();
  if(menu_equip != undefined) menu_equip.touchend();
	//path.addPoint(mousePos.x, mousePos.y);
	//path.drawPath();
}
function addListeners(){
    renderer.view.addEventListener("mousedown", onMouseStart, true);
    renderer.view.addEventListener("mouseup", onMouseUp, true);
    renderer.view.addEventListener("mousemove", onMouseMove, true);
    renderer.view.addEventListener("touchstart", onTouchStart, true);
    renderer.view.addEventListener("touchend", onTouchEnd, true);
    renderer.view.addEventListener("touchmove", onTouchMove, true);
    renderer.view.addEventListener("backbutton", backButtonTap, true);
}
function removeListeners(){
    renderer.view.removeEventListener("mousedown", onMouseStart, true);
    renderer.view.removeEventListener("mouseup", onMouseUp, true);
    renderer.view.removeEventListener("mousemove", onMouseMove, true);
    renderer.view.removeEventListener("touchstart", onTouchStart, true);
    renderer.view.removeEventListener("touchend", onTouchEnd, true);
    renderer.view.removeEventListener("touchmove", onTouchMove, true);
    renderer.view.removeEventListener("backbutton", backButtonTap, true);
}

function backButtonTap(){

}

function stayinBorder(pos){
	temp = pos.clone();
	temp.sub(new PVector(stage.width/2, stage.height/2));
	if(temp.mag() > stage.width/2){
		var ang = Math.atan2(temp.y, temp.x);
		pos.x = stage.width/2 + stage.width/2*Math.cos(ang);
		pos.y = stage.height/2 + stage.height/2*Math.sin(ang);
	}
}
function findDist(a, b) {
  return PVector.dist(a, b);
} // end findDist
function findDistSimple(a, b) {
  return PVector.distsimple(a, b);
} // end findDist

function intersectCR(cx,cy,cr,rx,ry,rw,rh){
	var circleDistance = new PVector(0,0);
	circleDistance.x = Math.abs(cx-rx);
	circleDistance.y = Math.abs(cy-ry);
	if(circleDistance.x > (rw/2 + cr)) return false;
	if(circleDistance.y > (rh/2 + cr)) return false;
	if(circleDistance.x <= (rw/2)) return true;
	if(circleDistance.y <= (rh/2)) return true;

	var cornerDistance_sq = (circleDistance.x - rw/2)*(circleDistance.x - rw/2) + (circleDistance.y - rh/2)*(circleDistance.y - rh/2);
	return (cornerDistance_sq <= (cr*cr));
} // end intersectCR
function withinDist(pos, other, r){
	var d = PVector.dist(pos, other);
	//console.log(r)
	if(d < r) return true;
	return false;
} // end withinDist
function withinDistSimple(pos, other, r){
  var d = PVector.distsimple(pos, other);
  //console.log(r)
  if(d < r*r) return true;
  return false;
} // end withinDist

function checkonScreen(pos){
	var right = -stage.x + width;
	var left = -stage.x;
	var bot = -stage.y + height;
	var top = -stage.y;

	if(pos.x > right) return false;
	if(pos.x < left) return false;
	if(pos.y < top) return false;
	if(pos.y > bot) return false;
	return true;
} // end checkonScreen
function RGBColor(r,g,b){
	return (r * 65536 + g * 256 + b);
}
function getRndColor() {
    /*var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return (r * 65536 + g * 256 + b)//'rgb(' + r + ',' + g + ',' + b + ')';*/
    return Math.random() * 0xFFFFFF;
}
function getRngColor(r1,r2,g1,g2,b1,b2) {
    var r = r2*Math.random()|r1,
        g = g2*Math.random()|g1,
        b = b2*Math.random()|b1;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getContainerBound(container){
  var left = 0, right = 0, top = 0, bot = 0;
  if(container.children.length < 1) return;
  getBoundRot(container.children[0]);
  left = container.children[0].left;
  right = container.children[0].right;
  top = container.children[0].top;
  bot = container.children[0].bot;

  for(var i = 0; i < container.children.length; i++){
    getBoundRot(container.children[i]);
    if(container.children[i].left < left) left = container.children[i].left;
    if(container.children[i].right > right) right = container.children[i].right;
    if(container.children[i].top < top) top = container.children[i].top;
    if(container.children[i].bot > bot) bot = container.children[i].bot;
  }
  container.width = right - left;
  container.height = bot - top;

  var cx = container.pivot.x;
  var cy = container.pivot.y;

  var s = Math.sin(container.rotation);
  var c = Math.cos(container.rotation);

  // top left
  container.TLx = left*c - top*s + cx;
  container.TLy = left*s + top*c + cy;
  // top right
  container.TRx = right*c - top*s + cx;
  container.TRy = right*s + top*c + cy;
  // bot left
  container.BLx = left*c - bot*s + cx;
  container.BLy = left*s + bot*c + cy;
  // bot right
  container.BRx = right*c - bot*s + cx;
  container.BRy = right*s + bot*c + cy;

  container.left = Math.min(container.TLx, container.TRx, container.BLx, container.BRx);
  container.right = Math.max(container.TLx, container.TRx, container.BLx, container.BRx);
  container.top = Math.min(container.TLy, container.TRy, container.BLy, container.BRy);
  container.bot = Math.max(container.TLy, container.TRy, container.BLy, container.BRy);
}
function getBound(r){
	if(r.anchor == undefined){
		r.anchor = {x: 0.5, y: 0.5};
	}
  if(r.rotation != undefined){
    getBoundRot(r);
    return;
  }

	//console.log(r)
	r.right = (r.x + Math.abs(r.width)*(1-r.anchor.x));
	//console.log(r.right)
	r.left = (r.x - Math.abs(r.width)*(r.anchor.x));
	r.bot = (r.y + Math.abs(r.height)*(1-r.anchor.y));
	r.top = (r.y - Math.abs(r.height)*(r.anchor.y));
}
function getBoundRot(r){
  var cx = r.x;// + r.anchor.x*r.width;
  var cy = r.y;// + r.anchor.y*r.height;
  var s = Math.sin(r.rotation);
  var c = Math.cos(r.rotation);
  /*var x0 = (r.x - Math.abs(r.width)*(r.anchor.x)) - cx;
  var x1 = (r.x + Math.abs(r.width)*(1-r.anchor.x)) - cx;
  var y0 = (r.y + Math.abs(r.height)*(1-r.anchor.y)) - cy;
  var y1 = (r.y - Math.abs(r.height)*(r.anchor.y)) - cy;
  var left = (x0 <= x1) ? x0 : x1;
  var right = (x0 >= x1) ? x0 : x1;
  var top = (y0 <= y1) ? y0 : y1;
  var bot = (y0 >= y1) ? y0 : y1;*/
  var left = (r.x - Math.abs(r.width)*(r.anchor.x)) - cx;
  var right = (r.x + Math.abs(r.width)*(1-r.anchor.x)) - cx;
  var top = (r.y - Math.abs(r.height)*(r.anchor.y)) - cy;
  var bot = (r.y + Math.abs(r.height)*(1-r.anchor.y)) - cy;
  // top left
  r.TLx = left*c - top*s + cx;
  r.TLy = left*s + top*c + cy;
  // top right
  r.TRx = right*c - top*s + cx;
  r.TRy = right*s + top*c + cy;
  // bot left
  r.BLx = left*c - bot*s + cx;
  r.BLy = left*s + bot*c + cy;
  // bot right
  r.BRx = right*c - bot*s + cx;
  r.BRy = right*s + bot*c + cy;

  r.left = Math.min(r.TLx, r.TRx, r.BLx, r.BRx);
  r.right = Math.max(r.TLx, r.TRx, r.BLx, r.BRx);
  r.top = Math.min(r.TLy, r.TRy, r.BLy, r.BRy);
  r.bot = Math.max(r.TLy, r.TRy, r.BLy, r.BRy);
  /*r.left =  (r.TLx < r.TRx) ? r.TLx : r.TRx;
  r.left =  (r.left < r.BLx) ? r.left : r.BLx;
  r.left =  (r.left < r.BRx) ? r.left : r.BRx;

  r.right =  (r.TRx > r.TLx) ? r.TRx : r.TLx;
  r.right =  (r.right > r.BLx) ? r.right : r.BLx;
  r.right =  (r.right > r.BRx) ? r.right : r.BRx;

  r.top =  (r.TLy < r.TRy) ? r.TLy : r.TRy;
  r.top =  (r.top < r.BLy) ? r.top : r.BLy;
  r.top =  (r.top < r.BRy) ? r.top : r.BRy;

  r.bot =  (r.TRy > r.TLy) ? r.TRy : r.TLy;
  r.bot =  (r.bot > r.BLy) ? r.bot : r.BLy;
  r.bot =  (r.bot > r.BRy) ? r.bot : r.BRy;*/

}

function isIntersectingRect(r1, r2){
  x1 = []; y1 = []; x2 = []; y2= [];
  x1[0] = r1.TLx; y1[0] = r1.TLy;
  x1[1] = r1.TRx; y1[1] = r1.TRy;
  x1[2] = r1.BLx; y1[2] = r1.BLy;
  x1[3] = r1.BRx; y1[3] = r1.BRy;

  x2[0] = r2.TLx; y2[0] = r2.TLy;
  x2[1] = r2.TRx; y2[1] = r2.TRy;
  x2[2] = r2.BLx; y2[2] = r2.BLy;
  x2[3] = r2.BRx; y2[3] = r2.BRy;

  axisX = []; axisY = []; axis = [];
  scalar = []; scalar2 = [];
  axisX[0] = r1.TRx - r1.TLx;  axisY[0] = r1.TRy - r1.TLy;
  axisX[1] = r1.TRx - r1.BRx;  axisY[1] = r1.TRy - r1.BRy;
  axisX[2] = r2.TLx - r2.BLx;  axisY[2] = r2.TLy - r2.BLy;
  axisX[3] = r2.TLx - r2.TRx;  axisY[3] = r2.TLy - r2.TRy;
  //console.log(axisX)
  //console.log(axisY)

  //draw.line(r1.TRx, r1.TRy, r1.TLx, r1.TLy);
  //draw.line(r1.TRx, r1.TRy, r1.BRx, r1.BRy);
  //draw.line(r2.TLx, r2.TLy, r2.BLx, r2.BLy);
  //draw.line(r2.TLx, r2.TLy, r2.TRx, r2.TRy);

  // compare every point to an axis
  for(var j = 0; j < 4; j++){
    scalar[j] = [];
    scalar2[j] = [];
    for(var i = 0; i < 4; i++){
      var axis = (x1[i]*axisX[j] + y1[i]*axisY[j]) /
                  (axisX[j]*axisX[j] + axisY[j]*axisY[j]);
      var X = axis*axisX[j];
      var Y = axis*axisY[j];
      scalar[j][i] = X*axisX[j] + Y*axisY[j];
      //scalar[j*4+i] = X*axisX[j] + Y*axisY[j];
    }
    var minA = Math.min(scalar[j][0],scalar[j][1],scalar[j][2],scalar[j][3]);
    var maxA = Math.max(scalar[j][0],scalar[j][1],scalar[j][2],scalar[j][3]);
    for(var i = 0; i < 4; i++){
      var axis = (x2[i]*axisX[j] + y2[i]*axisY[j]) /
                  (axisX[j]*axisX[j] + axisY[j]*axisY[j]);
      var X = axis*axisX[j];
      var Y = axis*axisY[j];
      scalar2[j][i] = X*axisX[j] + Y*axisY[j];
    }
    var minB = Math.min(scalar2[j][0],scalar2[j][1],scalar2[j][2],scalar2[j][3]);
    var maxB = Math.max(scalar2[j][0],scalar2[j][1],scalar2[j][2],scalar2[j][3]);
    //console.log('minA ' + minA + ' maxA ' + maxA);
    //console.log('minB ' + minB + ' maxB ' + maxB);
    if((minB <= maxA) && (maxB >= minA)){
      //console.log('overlap at ' + j)
    }else{
      //console.log('no collide')
      return false;
    }
  }
  //console.log('collide')
  return true;
  //console.log(scalar)
  //console.log(scalar2)

  /*var axis[0] = (x1[0]*axisX[0] + y1[0]*axisY[0])
  /
              (axisX[0]*axisX[0] + axisY[0]*axisY[0]);
  var X = axis0*axisX[0];
  var Y = axis0*axisY[0];
  scalar[0]*/
}

// for sprite
function isIntersecting(r1, r2) {
	// object 2 is Right of object 1?
  if(r2 == null || r1 == null) debugger;
  if(r1.anchor == null || r2.anchor == null) debugger;
	var right 	= (r2.x - Math.abs(r2.width)*(r2.anchor.x)) >= (r1.x + Math.abs(r1.width)*(1-r1.anchor.x));
	var left 	= (r2.x + Math.abs(r2.width)*(1-r2.anchor.x)) <= (r1.x - Math.abs(r1.width)*(r1.anchor.x));
	var bot 	= (r2.y - Math.abs(r2.height)*(r2.anchor.y)) >= (r1.y + Math.abs(r1.height)*(1-r1.anchor.y));
	var top 	= (r2.y + Math.abs(r2.height)*(1-r2.anchor.y)) <= (r1.y - Math.abs(r1.height)*(r1.anchor.y));
	//console.log("right " + right);
	//console.log("left " + left);
	//console.log("bot " + bot);
	//console.log("top " + top);
return !( right || left || bot || top);
}
function isTouching(x,y, r2){
    //if(x > r2.x && x < r2.x + r2.width && y > r2.y && y < r2.y + r2.height) return true;
    if( (r2.x - Math.abs(r2.width)*(r2.anchor.x)) < x
     && x < (r2.x + Math.abs(r2.width)*(1-r2.anchor.x))
     && (r2.y - Math.abs(r2.height)*(r2.anchor.y)) < y
     && y < (r2.y + Math.abs(r2.height)*(1-r2.anchor.y))) return true;
    return false;
}
function isTouchingR2withContainer(x,y,container,r2){
    //if(x > r2.x && x < r2.x + r2.width && y > r2.y && y < r2.y + r2.height) return true;
    if( container.x + (r2.x - Math.abs(r2.width)*(r2.anchor.x)) < x
     && x < container.x + (r2.x + Math.abs(r2.width)*(1-r2.anchor.x))
     && container.y + (r2.y - Math.abs(r2.height)*(r2.anchor.y)) < y
     && y < container.y + (r2.y + Math.abs(r2.height)*(1-r2.anchor.y))) return true;
    return false;
}


function map(x, x_min, x_max, x_min_new, x_max_new){
	var pct = (x - x_min) / (x_max - x_min);
	return (pct * (x_max_new-x_min_new) + x_min_new);
}
function getRandomTop(){
	var pos = new PVector(getRandomArbitrary(-stage.width*0.1, stage.width*1.1), -stage.height*0.1)
	return pos;
}
function getRandomLeft(){
	var pos = new PVector(-stage.width*0.1, getRandomArbitrary(-stage.height*0.1, stage.height*1.1))
	return pos;
}
function getRandomRight(){
	var pos = new PVector(stage.width*1.1, getRandomArbitrary(-stage.height*0.1, stage.height*1.1))
	return pos;
}
function getRandomBot(){
	var pos = new PVector(getRandomArbitrary(-stage.width*0.1, stage.width*1.1), stage.height*1.1)
	return pos;
}
function getRandomBorder(){
	switch(getRandomInt(1, 5)){
		case 1:
			return getRandomTop();
			break;
		case 2:
			return getRandomLeft();
			break;
		case 3:
			return getRandomRight();
			break;
		case 4:
			return getRandomBot();
			break;
		default:
			return getRandomTop();
			break;
	}
}
function lock(theta){
	while(theta > 2*PI) theta -= 2*PI;
	while(theta < 0) theta += 2*PI;
	return theta;
}
function lock_x(pos){
	return (pos < 0) ? 0 : 	(pos > width)? width : pos;
}
function lock_y(pos){
	return (pos < 0) ? 0 : 	(pos > ground)? ground : pos;
}
// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b){
	// Vector from a to p
  var ap = PVector.sub(p, a);
  // Vector from a to b
  var ab = PVector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  var normalPoint = PVector.add(a, ab);
  return normalPoint;
}
// note: crossproduct - 0 on the line, +1 on one side, -1 on other side
function isBetween(p, a, b){
  var crossproduct = (p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y);
  if (Math.abs(crossproduct) > 1) return false;
  var dotproduct = (p.x - a.x) *(b.x - a.x) + (p.y - a.y) * (b.y - a.y);
  var squaredlengthba = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
  if (dotproduct < 0) return false;
  if ( dotproduct > squaredlengthba) return false;
  return true;
} // end isBetween
function crossproduct(p, a, b){
	return ((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y));
}

function applyForce(force) {
    // We could add mass here if we want A = F / M
    //console.log(this);
    //console.log("this.accel: ");
    //console.log(this.accel);
    this.accel.add(force);
  }

function simulateMouseEvent (event, simulatedType) {
        //console.log(event)
    // Ignore multi-touch events
    if (event.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');

    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles
      true,             // cancelable
      window,           // view
      1,                // detail
      touch.screenX,    // screenX
      touch.screenY,    // screenY
      touch.clientX,    // clientX
      touch.clientY,    // clientY
      false,            // ctrlKey
      false,            // altKey
      false,            // shiftKey
      false,            // metaKey
      0,                // button
      null              // relatedTarget
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }
function arrayContains(array, item){
	var index = array.indexOf(item);
	if(index < 0) return false;
	return true;
}
var convertTime = function(time){
    t = '' + (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
    return t;
}
function print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}
function sortByKeySmall(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
function search_array(array,key,valuetofind) {
    for (i = 0; i < array.length; i++) {
        if (array[i][key] === valuetofind) {
            return i;
        }
    }
    return -1;
}
function sameSign(n1,n2){
  return (n1 * n2) > 0;
}
Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/(base ? log(base) : 1);
  };
})();

Array.prototype.unique2 = function()
{
  var n = {},r=[];
  for(var i = 0; i < this.length; i++)
  {
    if (!n[this[i].id])
    {
      n[this[i].id] = true;
      r.push(this[i]);
    }
  }
  return r;
}
// re-cycle an existing object by restoring it to an empty object like {}
var wipe = function (obj){
    for (var p in obj){
        if (obj.hasOwnProperty(p))
            delete obj[p];
    }
};

var indexOf = function(arr, item) {
  for (var i=0, len=arr.length; i!=len ; i++) {
    if (arr[i] === item) { return i }
  }
  return -1;
};
var spliceOne = function(arr, index) {
  var len=arr.length;
  if (!len) { return }
  while (index<len) {
    arr[index] = arr[index+1]; index++ }
  arr.length--;
};
// shift to smaller index
var array_shift_left = function(arr, item){
  index = arr.indexOf(item)
  if(index > 0){
    // Remove
    arr.splice(index,1);
    // Insert one index infront
    arr.splice(index-1,0, item);
  }
}
// shift to bigger index
var array_shift_right = function(arr, item){
  index = arr.indexOf(item)
  if(index >= 0 && index < arr.length-1){
    // Remove
    arr.splice(index,1);
    // Insert one index infront
    arr.splice(index+1,0, item);
  }
}
// insert item1 to before item2
// do nothing if item1 is already in array
// insert item1 at end if item2 is not in array
var array_insert_before = function(arr, item1, item2){
  item1_index = arr.indexOf(item1);
  if(item1_index < 0){ // no tail
      item2_index = arr.indexOf(item2);
      if(item2_index < 0){ // no item2
          // insert item1 at front
          arr.splice(0, 0, item1);
      }else{
          // insert item1 before item2
          arr.splice(item2_index, 0, item1);
      }
  }
} // end array_insert_before
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}