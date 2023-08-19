import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Autocomplete from './Autocomplete.vue';
import TextField from './TextField.vue';
import { ListItem, Node } from '../types';

describe('Autocomplete', () => {
  let wrapper: VueWrapper<any>;
  const list: Array<Node> = [
    {
      id: 1,
      name: 'Test Node',
      type: 'type1',
      top: 100,
      left: 200,
      input: [], 
      output: [], 
    },
    {
      id: 2,
      name: 'Test Node 2',
      type: 'type2',
      top: 500,
      left: 700,
      input: [], 
      output: [], 
    }
  ];

  beforeEach(() => {
    wrapper = mount(Autocomplete, {
      props: {
        list,
      },
    });
  });

  it('Renders properly', () => {
    expect(wrapper.classes()).contains('autocomplete');
  });

  it('Opens list on input click', async () => {
    const textField = wrapper.findComponent(TextField);
    await textField.trigger('click');
    const listElement = wrapper.find('.autocomplete__list');
    expect(listElement.exists()).toBeTruthy();
  });

  it('Filters list items based on input value', async () => {
    const textField = wrapper.findComponent(TextField);
    await textField.trigger('click');
    await textField.vm.handleInput({ target: { value: 'test' } } as any);
    const listItems = wrapper.findAll('.autocomplete__list-item');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('Emits item-selected event on item click', async () => {
    const textField = wrapper.findComponent(TextField);
    await textField.trigger('click');
    const listItems = wrapper.findAll('.autocomplete__list-item');
    await listItems[0].trigger('click');
    expect(wrapper.emitted()['item-selected']).toBeTruthy();
  });
});
