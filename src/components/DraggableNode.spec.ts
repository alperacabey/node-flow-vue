import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import DraggableNode from './DraggableNode.vue';
import { Node } from '../types';


describe('DraggableNode', () => {
  let wrapper: VueWrapper<any>;
  const startDragging = () => {};
  const node: Node = {
    id: 1,
    name: 'Test Node',
    type: 'type1',
    top: 100,
    left: 200,
    input: [], 
    output: [], 
  };

  beforeEach(() => {
    wrapper = mount(DraggableNode, {
      props: {
        node,
        startDragging,
      },
    });
  })

  it('Renders properly', () => {
    expect(wrapper.classes()).contains('draggable-node');
  });

  it('Emits mousedown event when clicked', async () => {
    const nodeElement = wrapper.find('.draggable-node');
    await nodeElement.trigger('mousedown');

    expect(wrapper.emitted().mousedown).toBeTruthy();
  });
});
