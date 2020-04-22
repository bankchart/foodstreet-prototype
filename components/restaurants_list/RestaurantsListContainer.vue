<template>
  <div id="restaurant-container" class="columns is-centered is-multiline">
    <div class="card column is-one-quarter cursor" v-for="(restaurant, idx) in restaurants" :key="idx">
      <VmRestaurants :restaurant="restaurant"></VmRestaurants>
    </div>
    <div class="section" v-if="restaurants.length === 0 && isAfterFetchRestaurant">
      <p>{{ noRestaurantLabel }}</p>
    </div>
  </div>
</template>

<script>
import VmRestaurants from '../Restaurants';
import { getByTitle } from '@/assets/filters';
import axios from 'axios';

export default {
  name: 'productsList',
  
  components: { VmRestaurants },
  
  data () {
    return {
      id: '',
      noRestaurantLabel: 'No Restaurant found',
      restaurants: [],
      isAfterFetchRestaurant: false,
    };
  },

  async mounted () {
    try {
      const url = 'http://localhost:1337/restaurants';
      const response = await axios.get(url);
      const result = response.data;
      result.forEach(elm => {
        this.restaurants.push(elm);
      });
    } catch (e) {
      console.error(e);
    }
    this.isAfterFetchRestaurant = true;
  },


  computed: {
    products () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.state.products;
      }
    }
  }

};
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
  .cursor {
    cursor: pointer;
  }
  #restaurant-container {
    min-height: 450px;
  }
</style>
