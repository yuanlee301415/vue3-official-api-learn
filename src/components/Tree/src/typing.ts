export class TreeItem {
  name: string;
  children?: TreeItem[];
  __visible?: boolean;
  constructor(_: TreeItem) {
    const { name, children, __visible } = { ..._ };
    this.name = name;
    this.children = children;
    this.__visible = __visible;
  }
}

export type TreeData = TreeItem[];
