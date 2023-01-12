<!-- eslint-disable no-undef -->
<template>
     <div class="ShoppingCart">
          <SideBar />
          
          <section class="hero-wrap hero-wrap-2" :style="{
               'background-image':
                    'url(' + require('../../src/assets/images/bg_2.jpg') + ')',
          }" data-stellar-background-ratio="0.5">
               <div class="overlay"></div>
               <div class="container">
                    <div class="row no-gutters slider-text align-items-end justify-content-center">
                         <div class="col-md-9 mb-5 text-center">
                              <p class="breadcrumbs mb-0">
                                   <span class="mr-2"><a href="index.html">Home <i
                                                  class="fa fa-chevron-right"></i></a></span>
                                   <span>Shopping Bag <i class="fa fa-chevron-right"></i></span>
                              </p>
                              <h2 class="mb-0 bread">Shopping Bag</h2>
                         </div>
                    </div>
               </div>
          </section>
          <div class="container-fluid  mt-100" v-if="cart.length == 0">
               <div class="row">

                    <div class="col-md-12">

                         <div class="card">
                              <div class="card-header">
                                   <h5>Shopping Bag</h5>
                              </div>
                              <div class="card-body cart">
                                   <div class="col-sm-12 empty-cart-cls text-center">
                                        <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130"
                                             class="img-fluid mb-4 mr-3">
                                        <h3><strong>Your Cart is Empty</strong></h3>
                                        <h4>Add something to make me happy :)</h4>
                                        <router-link to="/" class="btn btn-primary cart-btn-transform m-3"
                                             data-abc="true">continue shopping</router-link>
                                   </div>
                              </div>
                         </div>


                    </div>

               </div>

          </div>
          <div class="container px-4 py-5 mx-auto" v-if="cart.length > 0">
               <div class="row d-flex justify-content-center">
                    <div class="col-4">
                         <h4 class="heading">Shopping Bag</h4>
                    </div>
                    <div class="col-8">
                         <div class="row text-right">
                              <div class="col-3">
                                   <h6 class="mt-2">Category</h6>
                              </div>
                              <div class="col-3">
                                   <h6 class="mt-2">Quantity</h6>
                              </div>
                              <div class="col-3">
                                   <h6 class="mt-2">Price</h6>
                              </div>
                              <div class="col-3">
                                   <h6 class="mt-2">Action</h6>
                              </div>
                         </div>
                    </div>
               </div>

               <div class="row d-flex justify-content-center border-top" v-for="prod in cart" :key="prod.id">
                    <div class="col-4">
                         <div class="row d-flex">
                              <div class="book img"
                                   :style="{ backgroundImage: `url(${require('@/assets/images/' + prod.image)})` }">


                              </div>
                              <div class="my-auto flex-column d-flex pad-left">
                                   <p class="mob-text">{{ prod.name }}</p>
                              </div>
                         </div>
                    </div>
                    <div class="my-auto col-8">
                         <div class="row text-right">
                              <div class="col-3">
                                   <p class="mob-text">{{ prod.category }}</p>
                              </div>
                              <div class="col-3">
                                   <div class="row d-flex justify-content-end px-5 align-content-center">
                                        <p class="mb-0 h5" id="cnt2">{{ prod.qty }}</p>
                                        <div class="d-block flex-column plus-minus">
                                             <button @click="AddQty(prod.id)" class="vsm-text plus px-2">+</button>
                                             <button @click="ReduceQty(prod.id)" class="vsm-text minus px-2">-</button>
                                        </div>
                                   </div>
                              </div>
                              <div class="col-3">
                                   <h6 class="mob-text">${{ prod.available }}</h6>
                              </div>
                              <div class="col-3">
                                   <button @click="RemoveItem(prod.id)" class="vsm-text">&#10006;</button>
                              </div>
                         </div>
                    </div>
               </div>

               <div class="row justify-content-center">
                    <div class="col-lg-12">
                         <div class="card">
                              <div class="row">
                                   <div class="col-lg-8">
                                        <h2 class="text-code">your discount code</h2>
                                        <input type="text" placeholder="VD : C N X 5 8 P A">
                                        <button class="btn-block btn-blue Paypal" @click="paymethod()">
                                             <span>
                                                  <span id="checkout">Checkout in paypal</span>
                                                  <span id="check-amt">${{ TotalPriceShip }}</span>
                                             </span>
                                        </button>
                                        <div ref="paypal"></div>
                                   </div>

                                   <div class="col-lg-4 mt-2">
                                        <div class="row d-flex justify-content-between px-4">
                                             <p class="mb-1 text-left">Subtotal</p>
                                             <h6 class="mb-1 text-right">${{ TotalPrice }}</h6>
                                        </div>
                                        <div class="row d-flex justify-content-between px-4">
                                             <p class="mb-1 text-left">Shipping</p>
                                             <h6 class="mb-1 text-right">$2</h6>
                                        </div>
                                        <div class="row d-flex justify-content-between px-4" id="tax">
                                             <p class="mb-1 text-left">Total (tax included)</p>
                                             <h6 class="mb-1 text-right">${{ TotalPriceShip }}</h6>
                                        </div>
                                        <button class="btn-block btn-blue">
                                             <span>
                                                  <span id="checkout">Checkout</span>
                                                  <span id="check-amt">${{ TotalPriceShip }}</span>
                                             </span>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <FooterF />
     </div>
</template>

<script>
import swal from 'sweetalert2';
import SideBar from '@/components/SideBar.vue';
import { mapGetters, mapActions } from 'vuex';
import FooterF from '@/components/FooterF.vue';

export default {
     components: {
    SideBar,
    FooterF
},
     data: function () {
          return {
               loaded: false,
               paidFor: false,
          };
     },
     computed: {

          ...mapGetters(['cart']),
          TotalPrice() {
               return this.cart.reduce((a, b) => a + b.qty * b.available, 0)
          },
          TotalPriceShip() {
               return this.cart.reduce((a, b) => a + b.qty * b.available, 0) + 2;
          }
     },
     methods: {
          ...mapActions(['ReduceQty', 'AddQty', 'RemoveItem']),
          // 
          paymethod: function () {
               const script = document.createElement("script");
               script.src =
                    "https://www.paypal.com/sdk/js?client-id=AUVdRP28Ex_LghP2ubCW1Usq1twLn0AMYSe2va_LNcdMMttjagAqkgXg9jvkVy7xzk-KG-MbEJnNbaJo";
               script.addEventListener("load", this.setLoaded);
               document.body.appendChild(script);
          },
          setLoaded: function () {
               this.loaded = true;
               window.paypal
                    .Buttons({
                         createOrder: (data, actions) => {
                              return actions.order.create({
                                   purchase_units: [
                                        {
                                             description: this.paypalDescription,
                                             amount: {
                                                  currency_code: "USD",
                                                  value: this.TotalPriceShip
                                             }
                                        }
                                   ]
                              });
                         },
                         onApprove: async (data, actions) => {
                              window.Swal = swal;
                              const order = await actions.order.capture();
                              this.paidFor = swal.fire(
                                   'thank you!',
                                   'Order Success!',
                                   'success'
                              )
                              console.log(order);
                         },
                         onError: err => {
                              console.log(err);
                         }
                    })
                    .render(this.$refs.paypal);
          },

     }
}
</script>

<style>
body {
     color: #000;
     overflow-x: hidden;
     height: 100%;
     background-color: #fff;
     background-repeat: no-repeat;
}

.text-code {
     text-align: center;
     text-transform: uppercase;
     font-family: 'Poppins', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.plus-minus {
     position: relative;
}

.plus {
     position: absolute;
     top: -6px;
     left: 2px;
     cursor: pointer;
     padding: auto;
     font-size: 20px;
     height: 5px;

}

.minus {
     padding: auto;
     position: absolute;
     height: 5px;
     top: 10px;
     left: 5px;
     font-size: 20px;
     cursor: pointer;
}

.vsm-text:hover {
     color: #FF5252;
}

.book,
.book-img {
     width: 120px;
     height: 180px;
     border-radius: 5px;
}

.book {
     margin: 20px 15px 5px 15px;
}

.border-top {
     border-top: 1px solid #EEEEEE !important;
     margin-top: 20px;
     padding-top: 15px;
}

.card {
     margin: 40px 0px;
     padding: 40px 50px;
     border-radius: 20px;
     border: none;
     box-shadow: 1px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

input,
textarea {
     background-color: #F3E5F5;
     padding: 8px 15px 8px 15px;
     width: 100%;
     border-radius: 5px !important;
     box-sizing: border-box;
     border: 1px solid #F3E5F5;
     font-size: 15px !important;
     color: #000 !important;
     font-weight: 300;
}

input:focus,
textarea:focus {
     -moz-box-shadow: none !important;
     -webkit-box-shadow: none !important;
     box-shadow: none !important;
     border: 1px solid #9FA8DA;
     outline-width: 0;
     font-weight: 400;
}

button:focus {
     -moz-box-shadow: none !important;
     -webkit-box-shadow: none !important;
     box-shadow: none !important;
     outline-width: 0;
}

.pay {
     width: 80px;
     height: 40px;
     border-radius: 5px;
     border: 1px solid #673AB7;
     margin: 10px 20px 10px 0px;
     cursor: pointer;
     box-shadow: 1px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.gray {
     -webkit-filter: grayscale(100%);
     -moz-filter: grayscale(100%);
     -o-filter: grayscale(100%);
     -ms-filter: grayscale(100%);
     filter: grayscale(100%);
     color: #E0E0E0;
}

.gray .pay {
     box-shadow: none;
}

#tax {
     border-top: 1px lightgray solid;
     margin-top: 10px;
     padding-top: 10px;
}

.btn-blue {
     border: none;
     border-radius: 10px;
     background-color: #673AB7;
     color: #fff;
     padding: 8px 15px;
     margin: 20px 0px;
     cursor: pointer;
}

.btn-blue:hover {
     background-color: #311B92;
     color: #fff;
}

#checkout {
     float: left;
}

#check-amt {
     float: right;
}

@media screen and (max-width: 768px) {

     .book,
     .book-img {
          width: 100px;
          height: 150px;
     }

     .card {
          padding-left: 15px;
          padding-right: 15px;
     }

     .mob-text {
          font-size: 13px;
     }

     .pad-left {
          padding-left: 20px;
     }
}
</style>