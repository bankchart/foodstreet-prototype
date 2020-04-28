<template>
  <div>
    <VmRestaurant></VmRestaurant>
    <button @click="openStepsTrackerProgress">open steps tracker progress</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import VmRestaurant from '@/components/restaurant/Restaurant';

export default {
  name: 'index',
  
  components: {
    VmRestaurant
  },

  methods: { 
    openStepsTrackerProgress() {
      this.$store.commit('showStepsTrackerProgressModal', true);
   }
  }
};
</script>
