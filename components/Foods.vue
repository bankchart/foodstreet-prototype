<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="`http://localhost:1337/${menu.menu_image.url}`" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content is-clearfix">
        <p class="is-pulled-left title is-4">
          {{ menu.name }}
        </p>
        <p class="is-pulled-right">
          <span class="title is-4"><strong>&#3647; {{ menu.price }}</strong></span>
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button class="button is-primary" v-if="!isSelected" @click="addToCartComp(menu.restaurant, menu.restaurant_name, menu.id, menu.name, menu.price)">{{ addToCartLabel }}</button>
            <button class="button is-text" v-if="isSelected" @click="removeFromCartComp(menu.restaurant, menu.restaurant_name, menu.id)">{{ removeFromCartLabel }}</button>
          </div>
           <div class="select is-rounded is-small">
            <select @change="onSelectQuantity(menu.restaurant, menu.restaurant_name, menu.id, menu.name, menu.price)" v-model="selected">
              <option v-for="(quantity, idx) in quantityArray" :key="idx" :value="quantity">{{ quantity }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'foods',
  props: ['menu'],
  
  data() {
    return {
      vueComp: this,
      removeFromCartLabel: 'Remove from cart',
      addToCartLabel: 'Add to cart',
      selected: 1,
      quantityArray: [],
      isSelected: false
    };
  },

  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
    for (let m of this.menus) {
      if (m.id === this.menu.id) {
        this.selected = m.qty
        this.isSelected = true;
        break;
      }
    }
  },
  
  computed: {
    ...mapGetters({
      menus: 'cart/menus'
    })
  },

  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart',
      updateQtyCart: 'cart/updateQtyCart'
    }),
    addToCartComp(restaurantId, restaurantName, menuId, menuName, menuPrice) {
      this.isSelected = true;
      this.addToCart({
        restaurantId,
        restaurantName,
        menu: {
          id: menuId,
          name: menuName,
          price: menuPrice,
          qty: this.selected
        },
        vueComp: this.vueComp
      });
    },
    removeFromCartComp(restaurantId, restaurantName, menuId) {
      this.isSelected = false;
      this.selected = 1;
      this.removeFromCart({
        restaurantId,
        restaurantName,
        menuId,
        vueComp: this.vueComp
      });
    },
    onSelectQuantity(restaurantId, restaurantName, menuId) {
      if (this.isSelected) {
        this.updateQtyCart({
          restaurantId,
          restaurantName,
          menuId,
          menuQty: this.selected,
          vueComp: this.vueComp
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
   margin-top: 12px;
 }
 .buttons {
   margin: 0;
 }
</style>


