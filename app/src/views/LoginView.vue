<template>
  <div class="body">
    <div class="box-form">
      <div class="left">
        <div class="overlay">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            et est sed felis aliquet sollicitudin
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
          Don't have an account? <a href="#">Creat Your Account</a> it takes
          less than a minute
        </p>
        <div class="inputs">
          <input type="text" placeholder="user name" />
          <br />
          <input type="password" placeholder="password" />
        </div>

        <br /><br />

        <div class="remember-me--forget-password">
          <!-- Angular -->
          <label>
            <input type="checkbox" name="item" checked />
            <span class="text-checkbox">Remember me</span>
          </label>
          <p>forget password?</p>
        </div>

        <br />
        <button>Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
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
    background-image: url("../assets/images/bg_2.jpg");
    overflow: hidden;

    // overlay
    .overlay {
      padding: 30px;
      width: 100%;
      height: 100%;
      background: #5961f9ad;
      overflow: hidden;
      box-sizing: border-box;

      h1 {
        font-size: 10vmax;
        line-height: 1;
        font-weight: 900;
        margin-top: 40px;
        margin-bottom: 20px;
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
    padding: 40px;
    overflow: hidden;

    @media (max-width: 980px) {
      width: 100%;
    }

    h5 {
      font-size: 6vmax;
      line-height: 0;
      // margin-bottom: 30px;
    }

    p {
      font-size: 14px;
      color: #b0b3b9;
        margin-top: 50px;
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

    .remember-me--forget-password {
      display: flex;
      justify-content: space-between;
      align-items: center;

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
