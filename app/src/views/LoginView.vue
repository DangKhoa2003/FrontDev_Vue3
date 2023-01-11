<template>
  <SideBar />
  <section
    class="hero-wrap hero-wrap-2"
    :style="{
      'background-image':
        'url(' + require('../../src/assets/images/bg_2.jpg') + ')',
    }"
    data-stellar-background-ratio="0.5"
  >
    <div class="overlay"></div>
    <div class="container">
      <div
        class="row no-gutters slider-text align-items-end justify-content-center"
      >
        <div class="col-md-9 mb-5 text-center">
          <p class="breadcrumbs mb-0">
            <span class="mr-2"
              ><a href="index.html">Home <i class="fa fa-chevron-right"></i></a
            ></span>
            <span>Login <i class="fa fa-chevron-right"></i></span>
          </p>
          <h2 class="mb-0 bread">Page Login</h2>
        </div>
      </div>
    </div>
  </section>
  <div class="box-form my-5">
    <div class="left">
      <div class="overlay">
        <h1>Hello World.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
          est sed felis aliquet sollicitudin
        </p>
        <span>
          <p>login with social media</p>
          <a href="#"><i class="fab fa-facebook" aria-hidden="true"></i></a>
          <a href="#"
            ><i class="fab fa-twitter" aria-hidden="true"></i> Login with
            Twitter</a
          >
        </span>
      </div>
    </div>
    <div class="right">
      <h5>Login</h5>
      <p>
        Don't have an account?
        <router-link to="/signup">Creat Your Account</router-link> it takes less
        than a minute
      </p>
      <div class="inputs">
        <div class="parent-input">
          <input type="email" v-model="email" placeholder="email" v-on:input="e => handleInputChange(e)" v-on:blur="validate()" v-bind:class="{'is-invalid': errors.email || errors.emailRegex}" />
          <span class="text-danger" v-if="errors.email">
            {{ errors.email }}
          </span>
          <br>
          <span v-if="errors.emailRegex" class="text-danger">{{ errors.emailRegex }}</span>
        </div>
        <br />
        <div class="parent-input">
          <input type="password" v-model="password" placeholder="password" v-on:input="e => handleInputChange(e)" v-on:blur="validate()" v-bind:class="{'is-invalid': errors.password || errors.minLength}" />
          <span class="text-danger" v-if="errors.password">
            {{ errors.password }}
          </span>
          <br>
          <span class="text-danger" v-if="errors.minLength">
            {{ errors.minLength }}
          </span>
        </div>
      </div>

      <div class="remember-me--forget-password">
        <!-- Angular -->
        <label>
          <input type="checkbox" name="item" checked />
          <span class="text-checkbox">Remember me</span>
        </label>
        <p>forget password?</p>
      </div>

      <button v-on:click="login">Login</button>
    </div>
  </div>
  <FooterF />
</template>

<script>
import FooterF from "@/components/FooterF.vue";
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      regex: new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'),
      errors: {
        email: "",
        password: "",
        emailRegex: "",
        minLength: "",
      }
    };
  },
  methods: {
    validate() {
      this.errors = {
        email: "",
        password: "",
        emailRegex: "",
        minLength: "",
      }
      if (!this.email) {
        this.errors.email = 'Email is required' 
      }
      if (!this.password) {
        this.errors.password = 'Password is required' 
      }

      if (!this.regex.test(this.email)) {
        this.errors.emailRegex = 'This field must be Email'
      }
  
      if (this.password.length < 5) {
        this.errors.minLength = 'Please enter at least 5 characters' 
      }
    },
    handleInputChange(e) {
      if (this.email) {
        this.errors.email = '' 
      }
      if (this.password) {
        this.errors.password = '' 
      }
      if (this.regex.test(this.email)) {
        this.errors.emailRegex = ''
      }
      if (this.password.length >= 5) {
        this.errors.minLength = '' 
      }
      e.target.classList.remove('is-invalid')
    },
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );

      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "home" });
      }
    },
  },
  
  components: { SideBar, FooterF },
};
</script>

<style lang="scss" scope>
$mainFont: "Open Sans", sans-serif;
$mainColor: #333333;

// *{padding: 0px; margin: 0px;}

.body {
  background-image: linear-gradient(135deg, #fab2ff 10%, #1904e5 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: $mainFont;
  color: $mainColor;
  height: 100vh;
  display: flex;
}

.box-form {
  margin: auto;
  width: 80%;
  height: max-content;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 20px 6px #090b6f85;

  @media (max-width: 980px) {
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
  }

  div {
    height: auto;
  }

  .left {
    color: #ffffff;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("../assets/images/image_6.jpg");
    overflow: hidden;

    // overlay
    .overlay {
      padding: 30px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;

      h1 {
        font-size: 10vmax;
        line-height: 1;
        font-weight: 900;
        margin-top: 40px;
        margin-bottom: 20px;
        color: #fff;
      }

      span {
        p {
          margin-top: 30px;
          font-weight: 900;
        }

        a {
          background: #3b5998;
          color: #ffffff;
          margin-top: 10px;
          padding: 14px 50px;
          border-radius: 100px;
          display: inline-block;
          box-shadow: 0 3px 6px 1px #042d4657;
        }
        a:last-child {
          background: #1dcaff;
          margin-left: 30px;
        }
      }
    }
  }

  .right {
    padding: 15px 20px;

    @media (max-width: 980px) {
      width: 100%;
    }

    h5 {
      font-size: 6vmax;
      margin-bottom: 30px;
    }

    p {
      font-size: 14px;
      color: #b0b3b9;
    }

    .inputs {
      overflow: hidden;
    }

    input {
      width: 100%;
      padding: 10px;
      margin-top: 25px;
      font-size: 16px;
      border: none;
      outline: none;
      border-bottom: 2px solid #b0b3b9;
    }
    input.is-invalid {
      border-bottom: 2px solid #EE0000;
    }

    .remember-me--forget-password {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      input {
        margin: 0;
        margin-right: 7px;
        width: auto;
      }
    }

    button {
      float: right;
      color: #fff;
      font-size: 16px;
      padding: 12px 35px;
      border-radius: 50px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 20px 0px #49c628a6;
      background-image: linear-gradient(135deg, #70f570 10%, #49c628 100%);
    }
  }
}

label {
  display: block;
  position: relative;
  margin-left: 30px;
}
label::before {
  content: " \f00c";
  position: absolute;
  font-family: FontAwesome;
  background: transparent;

  border: 3px solid #70f570;
  border-radius: 4px;
  color: transparent;
  left: -30px;

  transition: all 0.2s linear;
}

label:hover::before {
  font-family: FontAwesome;
  content: " \f00c";
  color: #fff;
  cursor: pointer;
  background: #70f570;
}

label:hover::before .text-checkbox {
  background: #70f570;
}
// label span.text-checkbox:hover{background: #70F570;}

label span.text-checkbox {
  display: inline-block;
  height: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
}
label input[type="checkbox"] {
  display: none;
}
</style>
