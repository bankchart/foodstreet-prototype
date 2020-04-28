<template>
  <section class="hero">
    <client-only>
      <div class="hero-body" v-for="(ord, idx) in orders" :key="idx">
        <div style="text-align: center; font-weight: bold;">หมายเลขสั่งซื้อ : {{ ord.order.trans_id }}</div>
        <div class="container">
          <div class="columns is-centered" style="margin-top: 15px;">
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
                      ร้าน : {{ ord.order.restaurant_name }}
                      <br />ที่อยู่ : {{ ord.order.restaurant.address }}
                      <br />อีเมล : {{ ord.order.restaurant.email }}
                      <br />เบอร์โทร : {{ ord.order.restaurant.tel }}
                      <br />
                    </p>
                  </div>
                  <div class="info">
                    <h2>รายละเอียดลูกค้า</h2>
                    <p>
                      คุณ{{ ord.customer.first_name + ' ' + ord.customer.last_name }}
                      <br />ที่อยู่ : {{ ord.customer.address }}
                      <br />อีเมล : {{ ord.customer.email }}
                      <br />เบอร์โทร : {{ ord.customer.email }}
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
                      <tr class="service" v-for="(menu, idx_item) in ord.menus" :key="idx_item">
                        <td class="tableitem">
                          <p class="itemtext">{{ menu.menu_name }}</p>
                        </td>
                        <td class="tableitem">
                          <p class="itemtext">{{ menu.menu_amount }}</p>
                        </td>
                        <td class="tableitem">
                          <p class="itemtext">&#3647;{{ menu.menu_price }}</p>
                        </td>
                      </tr>
                      <tr class="tabletitle">
                        <td></td>
                        <td class="Rate" style="font-size: 12px">
                          <h2>ยอดสุทธิ</h2>
                        </td>
                        <td class="payment" style="font-size: 12px">
                          <h2>&#3647;{{ ord.total_price }}</h2>
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
                    <i class="text-timestamp">เวลา: {{ ord.order.order_incoming_datetime ? dateFormat(new Date(ord.order.order_incoming_datetime)) : '-' }}</i>
                  </div>
                </li>

                <li class="progress-step" :class="[ ord.order.order_accept_datetime ? 'is-complete' : '' ]">
                  <div class="progress-marker"></div>
                  <div class="progress-text">
                    <h4 class="progress-title">ปรุงอาหาร</h4>
                    <i class="text-timestamp">เวลา: {{ ord.order.order_accept_datetime ? dateFormat(new Date(ord.order.order_accept_datetime)) : '-' }}</i>
                  </div>
                </li>

                <li class="progress-step" :class="[ ord.order.delivery_shipping_datetime ? 'is-complete' : '' ]">
                  <div class="progress-marker"></div>
                  <div class="progress-text">
                    <h4 class="progress-title" style="font-weight: normal">อยู่ระหว่างจัดส่ง</h4>
                    <i class="text-timestamp">เวลา: {{ ord.order.delivery_shipping_datetime ? dateFormat(new Date(ord.order.delivery_shipping_datetime)) : '-' }}</i>
                  </div>
                </li>

                <li class="progress-step" :class="[ ord.order.delivery_received_datetime ? 'is-complete' : '' ]">
                  <div class="progress-marker"></div>
                  <div class="progress-text">
                    <h4 class="progress-title" style="font-weight: normal">ส่งอาหารเรียบร้อย</h4>
                    <i class="text-timestamp">เวลา: {{ ord.order.delivery_received_datetime ? dateFormat(new Date(ord.order.delivery_received_datetime)) : '-' }}</i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </client-only>
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
      closeLabel: "Close",
      orders: []
    };
  },

  mounted() {
    this.orderList({
      accessToken: this.$util.getCookie('access_token')
      })
      .then((res) => {
        this.orders = res;
        this.orders.forEach((ord) => {
          ord.total_price = this.summaryTotalPrice(ord.menus);
        });
        console.log(this.orders);
      })
      .catch((e) => {
        console.error(e);
      });
  },

  methods: {
    ...mapActions({
      orderList: 'order/getOrderByAccessToken'
    }),
    summaryTotalPrice(menus) {
      console.log(menus);
      let summary = 0;
      menus.forEach((menu) => {
        summary += menu.menu_price * menu.menu_amount;
      });
      return summary;
    },
    dateFormat(d) {
      return this.appendLeadingZeroes(d.getDate())  + "-" + (this.appendLeadingZeroes(d.getMonth() + 1)) + "-" + d.getFullYear() + " " +
      this.appendLeadingZeroes(d.getHours()) + ":" + this.appendLeadingZeroes(d.getMinutes());
    },
    appendLeadingZeroes(n) {
      return n <= 9 ? "0" + n : n;
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
