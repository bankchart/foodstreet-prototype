<template>
  <div @click="$router.push({
    name: 'restaurant_detail-id',
    params: {
      id: restaurant.id
    }
  })">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="`http://localhost:1337/${restaurant.restaurant_image[0].url}`" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ restaurant.name }}</p>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ restaurant.address }}</p>
        <div class="is-pulled-left">
          <i v-if="restaurant.rating_score === 1" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 2" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 2" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 3" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 3" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 3" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 4" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 4" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 4" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 4" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 5" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 5" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 5" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 5" class="fa fa-star"></i>
          <i v-if="restaurant.rating_score === 5" class="fa fa-star"></i>
          <p>{{ restaurant.reviews > 0 ? `${restaurant.reviews} Reviews` : 'No reviews' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'restaurants',
  props: ['restaurant']
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
 }
 .buttons {
   margin: 0;
 }
 .media-content {
   margin-top: 12px;
 }
</style>


