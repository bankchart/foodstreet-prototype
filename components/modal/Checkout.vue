<template>
	<div :class="[ openModal ? 'is-active' : '', 'modal' ]">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(true)"></button>
			</header>
			<section class="modal-card-body">
				<h3 v-if="menus.length > 0" style="text-decoration: underline; margin-bottom: 22px;">
					{{ restaurantName }}
				</h3>
				<div v-if="!isCheckoutSection">
					<div class="box"  v-for="(menu, idx) in menus" :key="idx">
						<button class="is-pulled-right button is-info is-inverted" @click="removeFromCartComp(menu.restaurant, menu.id)">{{ removeLabel }}</button>
						<p>{{ menu.name }}  {{ menu.qty > 0 ?  ` - Quantity: ${menu.qty}` : ''}}</p>
						<p>&#3647;{{ menu.price }}</p>
					</div>
					<div v-if="menus.length === 0">
						<p>{{ cartEmptyLabel }}</p>
					</div>
				</div>
				<div v-if="isCheckoutSection">
					<p>You bought it :-)</p>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button v-show="menus.length > 0 && !isCheckoutSection" class="button is-success" @click="onNextBtn">{{ buyLabel }}</button>
				<button v-if="isCheckoutSection" class="button is-success" @click="closeModal(true)">{{ closeLabel }}</button>
			</footer>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'checkout',
    
	data () {
		return {
			vueComp: this,
			modalTitle: 'Checkout',
			removeLabel: 'Remove from cart',
			cartEmptyLabel: 'Your cart is empty',
			closeLabel: 'Close',
			isCheckoutSection: false
		}
	},

	computed: {
		
		...mapGetters({
			menus: 'cart/menus',
			restaurantId: 'cart/restaurantId',
			restaurantName: 'cart/restaurantName',
			userId: 'user/id'
		}),

		products () {
			return this.$store.getters.productsAdded;
		},
		openModal () {
			return this.$store.getters.isCheckoutModalOpen ? true : false;
		},
		buyLabel () {
			let totalProducts = this.menus.length,
			productsAdded = this.menus,
			pricesArray = [],
			productLabel = '',
			finalPrice = '',
			quantity = 1;

			productsAdded.forEach(product => {

				if (product.qty >= 1) {
					quantity = product.qty;
				}

				pricesArray.push((product.price * quantity)); // get the price of every product added and multiply quantity
			});

			finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices
			
			if (totalProducts > 1) { // set plural or singular
				productLabel = 'products';
			} else {
				productLabel = 'product';
			}
			return `Buy ${totalProducts} ${productLabel} at ฿${finalPrice}`;
		},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		}
	},

	methods: {

		...mapActions({
			removeFromCart: 'cart/removeFromCart',
			resetCart: 'cart/reset',
			verifyAccessToken: 'user/verifyAccessToken',
			createOrder: 'order/create'
		}),

		closeModal (reloadPage) {
			this.$store.commit('showCheckoutModal', false);

			if (reloadPage) {
				window.location.reload();
			}
		},
		removeFromCartComp(restaurantId, menuId) {
			let data = {
				id: menuId,
				status: false
			};
      this.removeFromCart({
        restaurantId,
        menuId,
        vueComp: this.vueComp
			});
			this.$store.commit('setAddedBtn', data);
    },
		async onNextBtn () {
			try {
				const result = await this.verifyAccessToken({ util: this.$util });
				this.$store.commit('isUserLoggedIn', true);
			} catch (e) {
				this.$store.commit('isUserLoggedIn', false);
			}
			if (this.isUserLoggedIn) {
				try {
				const result = await this.createOrder({
					userId: this.userId,
					restaurantId: this.restaurantId,
					menus: this.menus					
				});
				this.resetCart({ util: this.$util });
				this.isCheckoutSection = true;
				} catch (e) {
					console.error(e);
				}
			} else {
				this.$store.commit('showCheckoutModal', false);
				this.$store.commit('showLoginModal', true);
			}
		},
		onPrevBtn () {
			this.isCheckoutSection = false;
		}
	}
}
</script>

