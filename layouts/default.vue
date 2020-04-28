<template>
  <div>
    <VmHeader></VmHeader>
    <main>
      <nuxt/>
      <VmLoginModal></VmLoginModal>
      <VmRegistrationModal></VmRegistrationModal>
      <VmCheckoutModal></VmCheckoutModal>
      <VmVerticalStepsProgressTrackerModal></VmVerticalStepsProgressTrackerModal>
    </main>
    <VmFooter></VmFooter>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import VmHeader from '@/components/header/Header';
import VmFooter from '@/components/footer/Footer';
import VmLoginModal from '@/components/modal/Login';
import VmRegistrationModal from '@/components/modal/Registration';
import VmCheckoutModal from '@/components/modal/Checkout';
import VmVerticalStepsProgressTrackerModal from '@/components/modal/VerticalStepsProgressTracker';

export default {
  components: {
    VmHeader,
    VmFooter,
    VmLoginModal,
    VmRegistrationModal,
    VmCheckoutModal,
    VmVerticalStepsProgressTrackerModal
  },

  mounted() {
    this.$store.dispatch('cart/initial', {
      util: this.$util
    });

    this.$store.dispatch('user/verifyAccessToken', {
      util: this.$util,
    }).then((res) => {
      // this.$store.dispatch('user/setUserLoggedIn', true);
      this.$store.commit('isUserLoggedIn', true);
      // this.setDisplayName(res.display_name);
      console.log('response', res);
    }).catch((e) => {
      // this.$store.dispatch('user/setUserLoggedIn', false);
			this.$store.commit('isUserLoggedIn', false);
      console.log('error', e)
    });
  },

  methods: {
    ...mapActions({
      setUserLoggedIn: 'user/setUserLoggedIn',
      setDisplayName: 'user/setDisplayName'
    })
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>