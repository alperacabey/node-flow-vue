import { shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import TextField from "./TextField.vue";

describe('TextField', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(TextField)
  })

  it('Renders properly', async () => {
    expect(wrapper.find('input')).toBeTruthy();
  })

  it('Emits click event when clicked', async () => {
    const input = wrapper.find('input');
    await input.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  })
  
})
