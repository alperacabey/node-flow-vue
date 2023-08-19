export interface Node {
  id: number;
  name: string;
  type: string;
  input: number[];
  output: number[];
  top: number;
  left: number;
}

export interface ListItem {
  id: number;
  name: string;
}
