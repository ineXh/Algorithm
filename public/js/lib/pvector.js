(function (exports) {
  var PVector = function (x, y, z) {
    if (!(this instanceof PVector)) {
      return new PVector(x, y, z);
    }

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  };

  PVector.fromAngle = function (angle) {
    return new PVector(Math.cos(angle), Math.sin(angle));
  };

  PVector.prototype.set = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };

  PVector.prototype.add = function (other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  };

  PVector.add = function (one, other) {
    return new PVector(one.x + other.x, one.y + other.y, one.z + other.z);
  };

  PVector.prototype.sub = function (other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  };

  PVector.sub = function (one, other) {
    try{
      return new PVector(one.x - other.x, one.y - other.y, one.z - other.z);
    }catch (e) {}
  };

  PVector.prototype.div = function (n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  };

  PVector.div = function (vector, n, target) {
    if (target instanceof PVector) {
      target.x = vector.x / n;
      target.y = vector.y / n;
      target.z = vector.z / n;
      return target;
    }
    return new PVector(vector.x / n, vector.y / n, vector.z / n);
  };

  PVector.prototype.mult = function (rate) {
    this.x *= rate;
    this.y *= rate;
    this.z *= rate;
    return this;
  };

  PVector.mult = function (vector, n, target) {
    if (target instanceof PVector) {
      target.x = vector.x * n;
      target.y = vector.y * n;
      target.z = vector.z * n;
      return target;
    }
    return new PVector(vector.x * n, vector.y * n, vector.z * n);
  };

  PVector.prototype.dot = function (p) {
    return this.x * p.x + this.y * p.y;
  };

  PVector.dot = function (a, b) {
    return a.x * b.x + a.y * b.y;
  };

  PVector.prototype.mag = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  };

  PVector.dist = function (loc1, loc2) {
    return Math.sqrt(Math.pow(loc1.x - loc2.x, 2) + Math.pow(loc1.y - loc2.y, 2));
  };
  PVector.distsimple = function(loc1, loc2) {
    //Math.pow(loc1.x - loc2.x, 2) + Math.pow(loc1.y - loc2.y, 2);
    return ((loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y));
  };

  PVector.prototype.normalize = function () {
    var mag = this.mag();
    if (mag === 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  };

  PVector.prototype.limit = function (limit) {
    if (this.mag() <= limit) {
      return this;
    }
    this.normalize();
    this.x *= limit;
    this.y *= limit;
    return this;
  };

  PVector.prototype.setMag = function (mag) {
    this.normalize();
    this.x *= mag;
    this.y *= mag;
    return this;
  };

  PVector.prototype.clone = function () {
    return new PVector(this.x, this.y);
  };

  PVector.random2D = function (vector) {
    var num = utils.random(2 * Math.PI);
    var x = Math.sin(num);
    var y = Math.cos(num);
    if (!vector) {
      return new PVector(x, y);
    }
    vector.x = x;
    vector.y = y;
    return vector;
  };

  PVector.prototype.heading = function () {
    if (this.x === 0) {
      return this.y > 0 ? Math.PI / 2 : Math.PI / -2;
    }
    var theta = Math.atan(this.y / this.x);
    if (this.x > 0) {
      return theta;
    } else {
      return Math.PI + theta;
    }
    return Math.atan(this.y / this.x);
  };

  PVector.angleBetween = function (a, b) {
    // A dot B = (magnitude of A)*(magnitude of B)*cos(theta)
    var dot = a.dot(b);
    return Math.acos(dot / (a.mag() * b.mag()));
  };

  PVector.prototype.angleBetween = function (other) {
    var dot = this.dot(other);
    return Math.acos(dot / (this.mag() * other.mag()));
  };

  exports.PVector = PVector;
})(this);
