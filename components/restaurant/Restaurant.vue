<template>
  <div class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <VmRestaurantsList></VmRestaurantsList>       
      </div>
    </div>
  </div>
</template>

<script>
import VmRestaurantsList from '@/components/restaurants_list/RestaurantsListContainer';
export default {
  components: {
    VmRestaurantsList
  }
}
</script>

<style lang="scss" scoped>
  .hero {
    background: rgb(81, 186, 252);
  }
  h1, h2 {
    color: #fff;
  }
 .details {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover {
      border: 1px solid #51bafc;
    }
 }
 .button,
 .select {
   z-index: 2;
 }
 .select {
   position: absolute;
   right: 15px;
   bottom: 35px;
 }
 .card-content {
   padding: 0;
 }
 .buttons {
   margin: 0;
 }
 .hero.is-medium .hero-body {
   padding-top: 30px;
   padding-bottom: 30px;
 }
</style>