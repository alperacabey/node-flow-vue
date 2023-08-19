<template>
  <input :value="value" @input="handleInput" @click="handleClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: String,
  },
  emits: ['input', 'click'],
  setup(_, { emit }) {
    const handleInput = (value) => {
      emit('input', value);
    };

    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return {
      handleInput,
      handleClick,
    };
  },
});
</script>
