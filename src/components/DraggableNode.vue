<template>
  <div
    class="draggable-node"
    :style="{ top: node.top + 'px', left: node.left + 'px' }"
    :class="`draggable-node--${node.type}`"
    @mousedown="startDragging(node, $event)"
  >
    {{ node.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Node } from '../types';

export default defineComponent({
  name: 'DraggableNode',
  props: {
    node: {
      type: Object as () => Node,
      required: true,
    },
    startDragging: {
      type: Function,
      required: true,
    },
  },
});
</script>