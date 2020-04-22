<template>
  <div>
    <VmFoodsListContainer :restaurantId="$route.params.id"></VmFoodsListContainer>
  </div>
</template>

<script>
import VmFoodsListContainer from '@/components/foods_list/FoodsListContainer';
import axios from 'axios';

export default {
  name: 'restaurant_detail-id',

  components: {
    VmFoodsListContainer
  },
  
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  }

}
</script>