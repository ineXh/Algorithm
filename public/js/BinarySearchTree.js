function BinarySearchTree(){
    this.create();
}
BinarySearchTree.prototype = {
    create: function(){
    	this.root = null;
    },
    init: function(key, value){
    	this.key = key;
    	this.value = value;
    }, // end init
    // put: key in tree     -> reset value
    //      key not in tree -> add new node
    // cost: Number of compares = 1 + depth of node
    put: function(key, value){
        var tree = this;
    	// private put
    	function put(node, key, value, parent) {
	        if(node == null) return new TreeNode(key, value, parent);
	        cmp = compareTo(key, node.key);//key.compareTo(node.key);
    			 if(cmp < 0) node.left = put(node.left, key, value, node);
    		else if(cmp > 0) node.right = put(node.right, key, value, node);
    		else node.value = value;
            node.count = 1 + tree.size(node.left) + tree.size(node.right);
    		return node;
	    }
	    this.root = put(this.root, key, value, null);
    }, // end put
    // cost: Number of compares = 1 + depth of node
    get: function(key){
    	node = this.root;
    	while(node != null){
    		cmp = compareTo(key, node.key);//key.compareTo(node.key);
    			 if(cmp < 0) node = node.left;
    		else if(cmp > 0) node = node.right;
    		else return node.value;
    	}
    },
    search: function(key){
        return this.get(key);
    },
    delete: function(key){

    },
    insert: function(key, value){
    	// if less, go left; if greater, go right; if null, insert
        this.put(key, value);
    },
    min: function(){
        return this.minimum(this.root);
    },
    // move left until null key
    minimum: function(node){
        if (node.left == null) return node; 
        else                return this.minimum(node.left); 
    },
    maximum: function(){
        node = this.root;
        while(node.right !== null){
            node = node.right;
        }
        return node;
    },
    // Find largest key in tree less than input key
    floor: function(key){
        function floor(node, key){
            if(node == null) return null;
            cmp = compareTo(key, node.key);
            if(cmp == 0) return node;
            if(cmp < 0) return floor(node.left, key);
            var node2 = floor(node.right, key);
            if(node2 != null) return node2;
            else              return node;
        }
        node = floor(this.root, key);
        if(node == null) return null;
        return node.key;
    }, // end floor
    // Find the smallest key in tree greater than input key
    ceiling: function(key){

    },
    // how many keys < input key
    rank: function(key){
        tree = this;
        function rank(key, node){
            if(node == null) return 0;
            cmp = compareTo(key, node.key);
            if(cmp < 0)         return rank(key, node.left);
            else if (cmp > 0)   return 1 + tree.size(node.left) + rank(key, node.right);
            else                return tree.size(node.left);
        }       
        return rank(key, this.root);
    },
    size: function(node){
        if(node === null) return 0;
        return node.count;
    },
    deleteMin: function(){
        tree = this;
        this.root = deletemin(this.root);
    },
    deletemin : function(node){
        if(node.left == null) return node.right;
            node.left = deleteMin(node.left);
            node.count = 1 + this.size(node.left) + this.size(node.right);
            return node;
    },
    deleteMax: function(){
        tree = this;
        function deleteMax(node){
            if(node.right == null) return node.left;
            node.right = deleteMax(node.right);
            node.count = 1 + tree.size(node.left) + tree.size(node.right);
            return node;
        }
        this.root = deleteMax(this.root);
    },
    // working
    Delete: function(key){
        tree = this;
        debugger;
        function Delete(node, key){
            if(node == null) return null;
            console.log(node.key)
            var cmp = compareTo(key, node.key);
            if(cmp < 0)         node.left = Delete(node.left, key);
            else if (cmp > 0)   node.right = Delete(node.right, key);
            else{
                if(node.right == null) return node.left;
                if(node.left == null) return node.right;
                
                var node2 = node;
                node = tree.minimum(node2.right);
                node.right = tree.deletemin(node2.right);
                node.left = node2.left;
            }
            node.count = 1 + tree.size(node.left) + tree.size(node.right);
            return node;
        }
        this.root = Delete(this.root, key);
    },
    print: function(container){
        this.container = container;
        function print(node){
            if(node == null) return;
            if(node.parent == null){
                x = 300;
                y = 50;
            }else if(node == node.parent.left){
                /*// shift right
                if(node.parent.right != null){                    
                    node.parent.shiftX(50);
                }*/
                x = node.parent.sprite.x - 50;
                y = node.parent.sprite.y + 50;
            }else if(node == node.parent.right){
                // shift left
                if(node.parent.left != null){                    
                    node.parent.shiftX(-50);
                }
                x = node.parent.sprite.x + 50;
                y = node.parent.sprite.y + 50;
            }
            //debugger;
            node.init(container, x, y, node.key, node.value);
           print(node.left);
           print(node.right);
        }
        node = print(this.root);
    },
    clear: function(){
        /*container = this.container;
        this.container.children.forEach(function(n){
            console.log(n)
            container.removeChild(n);
        });*/
    },
    // design a recursive function hat determines whether x is the root of a binary search tree with all keys between min and max.
    isBST: function(Nodex,Keymin,Keymax){

    },
    isRed: function(node){
        if(node === null) return false;
        return node.color === NodeColor.Red;
    },
    // orient a right leaning red link to lean left
    rotateLeft: function(nodeH){
        var node = nodeH.right;
        nodeH.right = node.left;
        node.left = nodeH;
        node.color = nodeH.color;
        nodeH.color = NodeColor.Red;
        return node;
    },
    rotateRight: function(nodeH){
        var node = nodeH.left;
        nodeH.left = node.right;
        node.right = nodeH;
        node.color = nodeH.color;
        nodeH.color = NodeColor.Red;
        return node;
    },
    flipColors: function(nodeH){
        nodeH.color = NodeColor.Red;
        nodeH.left.color = NodeColor.Black;
        nodeH.right.color = NodeColor.Black;
    },
} // end BinarySearchTree

function BinarySearchTreeNode(key, value){
    this.create(key, value);
}
BinarySearchTreeNode.prototype = {
    create: function(key, value){
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 0;
    },
} // end BinarySearchTreeNode

function Key(value){
    this.create(value);
}
Key.prototype = {
    create: function(value){
    	this.value = value;
    },
    compareTo: function(key2){
    	if(this.value < key2.value) return -1;
    	if(this.value > key2.value) return 1;
    	if(this.value === key2.value) return 0;
    }
} // end Key
function compareTo(value, value2){
	if(value < value2) return -1;
	if(value > value2) return 1;
	if(value === value2) return 0;
}