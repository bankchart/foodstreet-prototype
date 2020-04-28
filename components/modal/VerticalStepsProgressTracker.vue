<template>

  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="closeModal(true)"></button>
      </header>
      <section class="modal-card-body">
        <ul class="progress-tracker progress-tracker--vertical">
          <li class="progress-step is-complete">
            <div class="progress-marker"></div>
            <div class="progress-text">
              <h4 class="progress-title">Step 1</h4>Summary text explaining this step to the user
            </div>
          </li>

          <li class="progress-step is-complete">
            <div class="progress-marker"></div>
            <div class="progress-text">
              <h4 class="progress-title">Step 2</h4>Summary text explaining this step to the user
            </div>
          </li>

          <li class="progress-step is-active" aria-current="step">
            <div class="progress-marker"></div>
            <div class="progress-text">
              <h4 class="progress-title">Step 3</h4>Summary text explaining this step to the user
            </div>
          </li>

          <li class="progress-step">
            <div class="progress-marker"></div>
            <div class="progress-text">
              <h4 class="progress-title">Step 4</h4>Summary text explaining this step to the user
            </div>
          </li>

          <li class="progress-step">
            <div class="progress-marker"></div>
            <div class="progress-text">
              <h4 class="progress-title">Step 5</h4>Summary text explaining this step to the user
            </div>
          </li>
        </ul>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="closeModal(true)">{{ closeLabel }}</button>
      </footer>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'steps-tracker-progress',
    
	data () {
		return {
			vueComp: this,
			modalTitle: 'Steps Tracker Progress',
			closeLabel: 'Close',
		}
	},

	computed: {
		openModal () {
			return this.$store.getters.isOpenStepsTrackerProgressModalOpen ? true : false;
		}
	},

	methods: {
		closeModal (reloadPage) {
			this.$store.commit('showStepsTrackerProgressModal', false);
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~/node_modules/progress-tracker/src/styles/progress-tracker.scss';

.progress-tracker {
  margin-top: 0px;
}
.progress-step .progress-marker::after {
  background-color: red;
}
</style>
