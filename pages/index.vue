<template>
  <div>
    <VmRestaurant></VmRestaurant>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import VmRestaurant from '@/components/restaurant/Restaurant';

export default {
  name: 'index',
  
  components: {
    VmRestaurant
  }
};
</script>
