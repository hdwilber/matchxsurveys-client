export class TreeNode {
  children: TreeNode[];
  expanded: boolean = true;
  checked: boolean = false;
  data: any;

  toggle():void {
    this.expanded = !this.expanded;
    console.log("What is going on ");
  }
  check():void {
    this.checked = !this.checked;
    this.checkRecursive(this.checked);
  }

  checkRecursive(state:boolean):void {
    this.children.forEach( c => {
      c.checked = state;
      c.checkRecursive(state);
    });
  }
}
