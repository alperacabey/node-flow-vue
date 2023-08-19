<template>
  <div class="autocomplete">
    <TextField :value="inputValue" @input="handleInput" @click="openList" />
    <ul v-if="isOpen" class="autocomplete__list">
      <li
        v-for="item in filteredList"
        :key="item.id"
        @click="selectItem(item)"
        class="autocomplete__list-item"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import TextField from './TextField.vue';
import { ListItem, Node } from '../types';

export default defineComponent({
  name: 'Autocomplete',
  components: {
    TextField,
  },
  props: {
    list: {
      type: Array<Node> || Array<ListItem>,
      required: true,
    },
  },
  emits: ['item-selected'],
  setup(props, { emit }) {
    const inputValue = ref('');
    const isOpen = ref(false);
    const filteredList = computed(() => {
      return props.list.filter((item) =>
        item.name.toLowerCase().includes(inputValue.value.toLowerCase())
      );
    });

    const handleInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      isOpen.value = true;
      inputValue.value = input.value;
    };

    const selectItem = (item: { id: number; name: string }) => {
      isOpen.value = false;
      emit('item-selected', item);
    };

    const openList = () => {
      isOpen.value = true;
    };

    return {
      inputValue,
      isOpen,
      filteredList,
      handleInput,
      selectItem,
      openList,
    };
  },
});
</script>
