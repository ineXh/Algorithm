function RedBlackBST(){
    this.create();
}
RedBlackBST.prototype = Object.create(BinarySearchTree.prototype);
RedBlackBST.prototype.constructor = BinarySearchTree;
RedBlackBST.prototype.put = function(key, value){
	var tree = this;
	// private put
	function put(node, key, value, parent) {
        if(node == null) return new TreeNode(key, value, parent, NodeColor.Red);
        cmp = compareTo(key, node.key);//key.compareTo(node.key);
			 if(cmp < 0) node.left = put(node.left, key, value, node);
		else if(cmp > 0) node.right = put(node.right, key, value, node);
		else node.value = value;
        node.count = 1 + tree.size(node.left) + tree.size(node.right);

        // lean left
        if(tree.isRed(node.right) && !tree.isRed(node.left)) node = tree.rotateLeft(node);
        // have 2 left leaning left red links, balance 4 node
        if(tree.isRed(node.left) && tree.isRed(node.left.left)) node = tree.rotateRight(node);
        if(tree.isRed(node.left) && tree.isRed(node.right)) node = tree.flipColors(node);


		return node;
    }
    this.root = put(this.root, key, value, null);
}