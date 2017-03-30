"use strict";
var TreeNode = (function () {
    function TreeNode() {
        this.expanded = true;
        this.checked = false;
    }
    TreeNode.prototype.toggle = function () {
        this.expanded = !this.expanded;
        console.log("What is going on ");
    };
    TreeNode.prototype.check = function () {
        this.checked = !this.checked;
        this.checkRecursive(this.checked);
    };
    TreeNode.prototype.checkRecursive = function (state) {
        this.children.forEach(function (c) {
            c.checked = state;
            c.checkRecursive(state);
        });
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=types.js.map