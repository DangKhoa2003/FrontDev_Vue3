<template>
  <div class="row mb-4">
    <div class="col-md-12 d-flex justify-content-between align-items-center">
      <h4 class="product-select">Find Products Name</h4>
      <div class="search">
        <input
          type="text"
          class="search__input"
          placeholder="Enter your search terms"
          v-model="searchString"
        />
        <button class="search__button">
          <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 d-flex" v-for="prod in filterProduct" :key="prod.id">
      <div class="product">
        <div
          class="img d-flex align-items-center justify-content-center"
          :style="{
            backgroundImage: `url(${require('@/assets/images/' + prod.image)})`,
          }"
        >
          <div class="desc">
            <p class="meta-prod d-flex">
              <button @click="AddToCart(prod)">
                <a class="d-flex align-items-center justify-content-center"
                  ><span class="flaticon-shopping-bag"></span
                ></a>
              </button>
              <a
                href="#"
                class="d-flex align-items-center justify-content-center"
                ><span class="flaticon-heart"></span
              ></a>
              <router-link
                :to="'/products/0' + prod.id"
                class="d-flex align-items-center justify-content-center"
                ><span class="flaticon-visibility"></span
              ></router-link>
            </p>
          </div>
        </div>
        <div class="text text-center">
          <span v-if="prod.salePrice" class="sale">Sale</span>
          <span v-if="prod.bestSaler" class="seller">Best Seller</span>
          <span v-if="prod.newProduct" class="new">New Arrival</span>
          <span class="category">{{ prod.category }}</span>
          <h2>{{ prod.name }}</h2>
          <p class="mb-0">
            <span v-if="prod.salePrice" class="price price-sale">$69.00</span>
            <span class="price">{{ prod.price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col text-center">
      <div class="block-27">
        <ul v-if="products.length > 6 || currentPage > 1">
          <li>
            <button @click="onClickPreviousPage" :disabled="isInFirstPage">
              <a href="#">&lt;</a>
            </button>
          </li>
          <li
            v-for="(page, index) in pages"
            :key="index"
            @click="onClickPage(page.number)"
            :class="{ active: isPageAction(page.number) }"
          >
            <button>
              <span>{{ page.number }}</span>
            </button>
          </li>
          <li>
            <button @click="onClickNextPage" :disabled="isInLastPage">
              <a href="#">&gt;</a>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import createStore from "@/store/index.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchString: "",
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    products() {
      return createStore.state.products;
    },

    paginatedData() {
      let start = (this.currentPage - 1) * this.perPage,
        end = start + this.perPage;
      return this.products.slice(start, end);
    },
    startPage() {
      if (this.currentPage === 1) return 1;
      if (this.currentPage === this.totalPages)
        return (
          this.totalPages -
          this.maxVisibleButtons +
          (this.maxVisibleButtons - 1)
        );
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      let range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    // Filter Product
    filterProduct() {
      var productArray = this.products,
        searchString = this.searchString;
      // Nếu không nhập dì hết
      if (!searchString) {
        return this.paginatedData;
      }
      searchString = searchString.trim().toLowerCase();
      productArray = productArray.filter(function (item) {
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      return productArray;
    },
  },

  methods: {
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    isPageAction(page) {
      return this.currentPage === page;
    },
    onPageChange(page) {
      this.currentPage === page;
    },
    ...mapActions(["AddToCart"]),
  },

  mounted() {
    createStore.dispatch("getProducts");
  },
};
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.search__input {
  font-family: inherit;
  font-size: inherit;
  background-color: #f4f2f2;
  border: none;
  color: #000;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 18em;
  transition: all ease-in-out 0.5s;
  margin-right: -2rem;
}

.search__input:hover,
.search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
  background-color: #f0eeee;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: #ccc;
}

.search__input:focus + .search__button {
  background-color: #f0eeee;
}

.search__button {
  border: none;
  background-color: #f4f2f2;
  margin-top: 0.1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #b4b4b4;
}
</style>
