<template>
  <div class="page">
    <Autocomplete :list="items" @item-selected="onItemSelected" />
    <div class="draggable-area">
      <DraggableNode
        v-for="(node, index) in selectedNodes"
        :key="'node' + index"
        :node="node"
        :startDragging="startDragging"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import Autocomplete from './components/Autocomplete.vue';
import { getNodes } from './services/nodeService';
import DraggableNode from './components/DraggableNode.vue';

export default defineComponent({
  name: 'App',
  components: {
    Autocomplete,
    DraggableNode,
  },
  setup() {
    const items = ref<Node[]>([]);
    const selectedNodes = ref([]);
    const onItemSelected = (item) => {
      const newItem = {
        ...item,
        top: Math.random() * (window.innerHeight - 100),
        left: Math.random() * (window.innerWidth - 100),
        input: [selectedNodes.value.length && selectedNodes.value.length - 1],
        output: [selectedNodes.value.length + 1],
      };
      selectedNodes.value.push(newItem);
    };

    const startDragging = (node, event) => {
      const draggableArea = event.target.closest('.draggable-area');
      if (!draggableArea) return;
      const draggableNode = event.target;

      const offset = {
        x: event.clientX - draggableNode.offsetLeft,
        y: event.clientY - draggableNode.offsetTop,
      };

      const mouseMoveHandler = (event) => {
        draggableNode.style.left = event.clientX - offset.x + 'px';
        draggableNode.style.top = event.clientY - offset.y + 'px';
      };

      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    onMounted(async () => {
      try {
        const response = await getNodes();
        items.value = await response;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      items,
      selectedNodes,
      onItemSelected,
      startDragging,
    };
  },
});
</script>
