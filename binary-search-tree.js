class Node {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor(root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses iteration. */

	insert(val) {
		if (!this.root) {
			this.root = new Node(val);
			return this;
		}

		let current = this.root;

		while (true) {
			if (val > current.val) {
				if (current.right) {
					current = current.right;
				} else {
					current.right = new Node(val);
					break;
				}
			} else {
				if (current.left) {
					current = current.left;
				} else {
					current.left = new Node(val);
					break;
				}
			}
		}

		return this;
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses recursion. */

	insertRecursively(val, current = this.root) {
		// If the tree is empty, insert at the root
		if (this.root === null) {
			this.root = new Node(val);
			return this;
		}

		if (val < current.val) {
			if (current.left === null) {
				current.left = new Node(val);
				return this;
			}
			return this.insertRecursively(val, current.left);
		} else {
			if (current.right === null) {
				current.right = new Node(val);
				return this;
			}
			return this.insertRecursively(val, current.right);
		}
	}

	/** find(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses iteration. */

	find(val) {
		if (!this.root) return;

		let curr = this.root;

		while (curr) {
			if (val === curr.val) {
				return curr;
			}

			if (val > curr.val) {
				curr = curr.right;
			} else if (val < curr.val) {
				curr = curr.left;
			}
		}

		return;
	}

	/** findRecursively(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses recursion. */

	findRecursively(val, curr = this.root) {
		if (curr && val > curr.val) {
			return this.findRecursively(val, curr.right);
		} else if (curr && val < curr.val) {
			return this.findRecursively(val, curr.left);
		}

		return curr ? curr : undefined;
	}

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
	 * Return an array of visited nodes. */

	dfsPreOrder(root = this.root, path = []) {
		if (root) {
			path.push(root.val);
			this.dfsPreOrder(root.left, path);
			this.dfsPreOrder(root.right, path);
		}
		return path;
	}

	/** dfsInOrder(): Traverse the array using in-order DFS.
	 * Return an array of visited nodes. */

	dfsInOrder(root = this.root, path = []) {
		if (root) {
			this.dfsInOrder(root.left, path);
			path.push(root.val);
			this.dfsInOrder(root.right, path);
		}

		return path;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
	 * Return an array of visited nodes. */

	dfsPostOrder(root = this.root, path = []) {
		if (root) {
			this.dfsPostOrder(root.left, path);
			this.dfsPostOrder(root.right, path);
			path.push(root.val);
		}

		return path;
	}

	/** bfs(): Traverse the array using BFS.
	 * Return an array of visited nodes. */

	bfs() {
		let root = this.root;
		let q = [root];
		let path = [];

		while (q.length) {
			let current = q.shift(1);
			path.push(current.val);
			if (current.left) q.push(current.left);
			if (current.right) q.push(current.right);
		}

		return path;
	}

	/** Further Study!
	 * remove(val): Removes a node in the BST with the value val.
	 * Returns the removed node. */

	remove(val) {
		// if (!root) return;

		// if (val < root.val) {
		// 	root.left = this.remove(root.left, val);
		// } else if (val > root.val) {
		// 	root.right = this.remove(root.right, val);
		// } else {
		// 	if (!root.left) {
		// 		return root.right;
		// 	}

		// 	if (!root.right) {
		// 		return root.left;
		// 	}

		// 	let removed = root.right;
		// 	while (removed.left) {
		// 		removed = removed.left;
		// 	}

		// 	root.val = removed.val;

		// 	root.right = this.remove(root.right, removed.val);

		// 	return removed;
		// }

		let nodeToRemove = this.root;
		let parent;

		while (nodeToRemove.val !== val) {
			parent = nodeToRemove;
			if (val < nodeToRemove.val) {
				nodeToRemove = nodeToRemove.left;
			} else {
				nodeToRemove = nodeToRemove.right;
			}
		}

		if (nodeToRemove !== this.root) {
			if (nodeToRemove.left === null && nodeToRemove.right === null) {
				if (parent.left === nodeToRemove) {
					parent.left = null;
				} else {
					parent.right = null;
				}
			} else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
				let rightParent = nodeToRemove;
				let right = nodeToRemove.right;
				if (right.left === null) {
					right.left = nodeToRemove.left;
					if (parent.left === nodeToRemove) {
						parent.left = right;
					} else {
						parent.right = right;
					}
				} else {
					while (right.left !== null) {
						rightParent = right;
						right = right.left;
					}
					if (parent.left === nodeToRemove) {
						parent.left.val = right.val;
					} else {
						parent.right.val = right.val;
					}
					if (right.right !== null) {
						rightParent.left = right.right;
					} else {
						rightParent.left = null;
					}
				}
			} else {
				if (parent.left === nodeToRemove) {
					if (nodeToRemove.right === null) {
						parent.left = nodeToRemove.left;
					} else {
						parent.left = nodeToRemove.right;
					}
				} else {
					if (nodeToRemove.right === null) {
						parent.right = nodeToRemove.left;
					} else {
						parent.right = nodeToRemove.right;
					}
				}
			}
		}
		return nodeToRemove;
	}

	/** Further Study!
	 * isBalanced(): Returns true if the BST is balanced, false otherwise. */

	isBalanced() {}

	/** Further Study!
	 * findSecondHighest(): Find the second highest value in the BST, if it exists.
	 * Otherwise return undefined. */

	findSecondHighest() {}
}

module.exports = BinarySearchTree;
