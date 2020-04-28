<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="box" style="margin-right: 30px;">
            <div id="invoice-POS">
              <center id="top">
                <div class="logo"></div>
                <div class="info">
                  <h2>:: Food Delivery ::</h2>
                </div>
                <!--End Info-->
              </center>
              <!--End InvoiceTop-->
              <div id="mid">
                <div class="info">
                  <h2>ผู้ให้บริการ</h2>
                  <p>
                    ร้าน : Im Chan Restaurant
                    <br />ที่อยู่ : Nonthaburi, Nonthaburi Province, Thailand
                    <br />อีเมล : imchan@restaurant.com
                    <br />เบอร์โทร : 0999999999
                    <br />
                  </p>
                </div>
                <div class="info">
                  <h2>รายละเอียดลูกค้า</h2>
                  <p>
                    คุณcust_bankchart cust_arlai
                    <br />ที่อยู่ : Nonthaburi, Nonthaburi Province, Thailand
                    <br />อีเมล : mrbankshart@gmail.com
                    <br />เบอร์โทร : 0223456789
                    <br />
                  </p>
                </div>
              </div>
              <!--End Invoice Mid-->
              <div id="bot">
                <div id="table">
                  <table>
                    <tr class="tabletitle">
                      <td class="item">
                        <h2>รายการ</h2>
                      </td>
                      <td class="Hours">
                        <h2>จำนวน</h2>
                      </td>
                      <td class="Rate">
                        <h2>ราคา</h2>
                      </td>
                    </tr>
                    <tr class="service">
                      <td class="tableitem">
                        <p class="itemtext">หมูยอ</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">1</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">&#3647;75.00</p>
                      </td>
                    </tr>
                    <tr class="service">
                      <td class="tableitem">
                        <p class="itemtext">กระเพราหมูสับ</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">1</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">&#3647;60.00</p>
                      </td>
                    </tr>
                    <!-- <tr class="tabletitle">
                      <td></td>
                      <td class="Rate"><h2>ภาษีมูลค่าเพิ่ม</h2></td>
                      <td class="payment"><h2>7%</h2></td>
                    </tr>-->
                    <tr class="tabletitle">
                      <td></td>
                      <td class="Rate" style="font-size: 12px">
                        <h2>ยอดสุทธิ</h2>
                      </td>
                      <td class="payment" style="font-size: 12px">
                        <h2>&#3647;135.00</h2>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--End Table-->
              </div>
              <!--End InvoiceBot-->
            </div>
            <!--End Invoice-->
          </div>
          <div>
            <ul class="progress-tracker progress-tracker--vertical">
              <li class="progress-step is-complete">
                <div class="progress-marker"></div>
                <div class="progress-text">
                  <h4 class="progress-title">ตรวจสอบคำสั่งซื้อ</h4>
                  <i class="text-timestamp">เวลา: Friday, 29 Jan 2020 13:00:00</i>
                </div>
              </li>

              <li class="progress-step is-active">
                <div class="progress-marker"></div>
                <div class="progress-text">
                  <h4 class="progress-title">ปรุงอาหาร</h4>
                  <i class="text-timestamp">เวลา: Friday, 29 Jan 2020 13:10:55</i>
                </div>
              </li>

              <li class="progress-step">
                <div class="progress-marker"></div>
                <div class="progress-text">
                  <h4 class="progress-title" style="font-weight: normal">อยู่ระหว่างจัดส่ง</h4>
                  <i class="text-timestamp">เวลา: -</i>
                </div>
              </li>

              <li class="progress-step">
                <div class="progress-marker"></div>
                <div class="progress-text">
                  <h4 class="progress-title" style="font-weight: normal">ส่งอาหารเรียบร้อย</h4>
                  <i class="text-timestamp">เวลา: -</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "order",

  data() {
    return {
      vueComp: this,
      modalTitle: "Steps Tracker Progress",
      closeLabel: "Close"
    };
  },

  computed: {
    openModal() {
      // return this.$store.getters.isOpenStepsTrackerProgressModalOpen ? true : false;
      return true;
    }
  },

  methods: {
    closeModal(reloadPage) {
      this.$store.commit("showStepsTrackerProgressModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/node_modules/progress-tracker/src/styles/progress-tracker.scss";

.progress-title {
  font-weight: bold;
}
.progress-tracker {
  margin-top: 0px;
}
.text-timestamp {
  font-size: 14px;
}
#invoice-POS {
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 2mm;
  margin: 0 auto;
  width: 60mm;
  background: #fff;

  ::selection {
    background: #f31544;
    color: #fff;
  }
  ::moz-selection {
    background: #f31544;
    color: #fff;
  }
  h1 {
    font-size: 1.5em;
    color: #222;
  }
  h2 {
    font-size: 0.8em;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p {
    font-size: 0.7em;
    color: #666;
    line-height: 1.2em;
  }

  #top,
  #mid,
  #bot {
    /* Targets all id with 'col-' */
    border-bottom: 1px solid #eee;
  }

  #top {
    min-height: 100px;
  }
  #mid {
    min-height: 80px;
  }
  #bot {
    min-height: 50px;
  }

  #top .logo {
    //float: left;
    height: 60px;
    width: 60px;
    // background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
    background: url(/restaurant.png) no-repeat;
    background-size: 60px 60px;
  }
  .clientlogo {
    float: left;
    height: 60px;
    width: 60px;
    background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
    background-size: 60px 60px;
    border-radius: 50px;
  }
  .info {
    display: block;
    //float:left;
    margin-left: 0;
    margin-top: 5px;
  }
  .title {
    float: right;
  }
  .title p {
    text-align: right;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    //padding: 5px 0 5px 15px;
    //border: 1px solid #EEE
  }
  .tabletitle {
    //padding: 5px;
    font-size: 0.5em;
    background: #eee;
  }
  .service {
    border-bottom: 1px solid #eee;
  }
  .item {
    width: 24mm;
  }
  .itemtext {
    font-size: 0.5em;
  }

  #legalcopy {
    margin-top: 5mm;
  }
}
</style>
