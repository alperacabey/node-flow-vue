import { Node } from '../types';

export async function getNodes(): Promise<Node[]> {
  try {
    const response = await fetch('/data/nodes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
