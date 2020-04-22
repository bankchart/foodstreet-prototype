<template>
  <div>
    <h1  style="padding: 12px; text-decoration: underline;">
      <label @click="$router.push('/')" style="cursor: pointer;">
        {{ restaurant }}
      </label>
    </h1>
    <div id="menu-container" class="columns is-centered is-multiline">
      <div class="card column is-one-quarter cursor" v-for="(menu, idx) in menus" :key="idx">
        <VmFoods :menu="menu"></VmFoods>
      </div>
      <div class="section" v-if="menus.length === 0">
        <p>{{ noRestaurantLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VmFoods from '../Foods';
import axios from 'axios';

export default {
  name: 'foodsList',
  props: ['restaurantId'],

  components: { VmFoods },

  data () {
    return {
      restaurant: '',
      noRestaurantLabel: 'No Menu found',
      menus: []
    };
  },

  async mounted () {
    try {
      const url = `http://localhost:1337/restaurants/${this.$route.params.id}`;
      const response = await axios.get(url);
      const result = response.data;
      result.menus.forEach(elm => {
        this.menus.push(elm);
        this.restaurant = elm.restaurant_name;
      });
    } catch (e) {
      console.error(e);
    }
  }
}

</script>

<style lang="scss" scoped>
#menu-container {
  min-height: 450px;
}
</style>