<template>
  <div class="page__control-panel">
    <div class="page__control-panel-body" id="control-panel">
      <div class="form">
        <label class="text-board form__label">
          <span class="text-board__text">{{ topMessage }}</span>
        </label>
        <div class="form__input-container">
          <input
            v-model="banknoteAcceptor"
            class="form__input"
            type="text"
            placeholder="..."
            :disabled="product || isMaxPrice"
            @keyup.enter="addBanknote()"
          />
        </div>
        <span class="form__desc">
          Available banknotes:
          <span v-for="(item, index) in availableBanknotes">
            {{
              `${availableBanknotes.length - 1 === index ? "or" : ""} ${item}${
                availableBanknotes.length - 1 === index ? "" : ","
              }`
            }}
          </span>
          <br />
          The machine gives change <br />in
          <span v-for="(item, index) in availableCoins">
            {{
              `${availableCoins.length - 1 === index ? "and" : ""} ${item}${
                availableCoins.length - 1 === index ? "" : ","
              }`
            }}
          </span>
          R coins
        </span>
      </div>
      <div class="form">
        <label class="text-board form__label">
          <span class="text-board__text">{{ productMessage }}</span>
        </label>
        <div class="form__input-container">
          <input
            v-model="productId"
            class="form__input form__input_disable"
            type="text"
            :disabled="product || !isMinPrice"
            placeholder="."
            @keyup.enter="chooseProduct()"
          />
        </div>
      </div>
      <div class="output">
        <div class="text-board output__text-board">
          <span class="text-board__text">{{
            product ? "Take your product and change!" : "."
          }}</span>
        </div>
        <div class="output__bottom">
          <div class="output__output">
            <span
              v-for="change in changes"
              :key="change.type"
              class="output__change-item"
            >
              {{ change.type }} R: <br />{{ change.coins }} coins
            </span>
          </div>
          <div class="output__output output__output_product">
            <div v-if="product" class="output__product-item">
              <div class="product" @click="takeProduct">
                <span class="product__name">{{ product.name }}</span>
                <span class="product__desc">{{ product.description }}</span>
                <span class="product__price">{{ product.price }} R</span>
                <span class="product__id">{{ product.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ControlPanel",
  data: () => ({
    banknoteAcceptor: null,
    unavailableBanknote: false,
    unavailableProductMessage: false,
    productId: null,
    errorTime: 2000
  }),
  computed: {
    topMessage() {
      let message = "Insert banknotes...";
      if (this.unavailableBanknote) return (message = "Unknown banknote!");
      if (this.banknotes.length) {
        message = `Inserted money: ${this.banknotesSummary} R.`;
        if (this.isMaxPrice) message += " Enough for any product.";
      }
      return message;
    },
    productMessage() {
      let message = this.isMinPrice ? "Choose product..." : ".";
      if (this.unavailableProductMessage)
        return (message = this.unavailableProductMessage);
      if (this.product) message = "Success!";
      return message;
    },
    isMinPrice() {
      return this.minPrice <= this.banknotesSummary;
    },
    isMaxPrice() {
      return this.maxPrice <= this.banknotesSummary;
    },
    ...mapState("goods", {
      goods: state => state.list
    }),
    ...mapState("controlPanel", [
      "banknotes",
      "product",
      "changes",
      "availableBanknotes",
      "availableCoins"
    ]),
    ...mapGetters("controlPanel", ["minPrice", "maxPrice", "banknotesSummary"])
  },
  methods: {
    addBanknote() {
      const banknote = +this.banknoteAcceptor;
      if (this.availableBanknotes.some(someItem => someItem === banknote)) {
        this.ADD_BANKNOTE(banknote);
        this.unavailableBanknote = false;
      } else {
        this.unavailableBanknote = true;
        setTimeout(() => {
          this.unavailableBanknote = false;
        }, this.errorTime);
      }
    },
    chooseProduct() {
      this.unavailableProductMessage = false;
      const productId = +this.productId;
      const product = this.goods.find(findItem => findItem.id === productId);
      if (product) {
        if (this.banknotesSummary >= product.price) {
          this.ADD_PRODUCT(product);
        } else {
          this.unavailableProductMessage = "Not enough money!";
          setTimeout(() => {
            this.unavailableProductMessage = false;
          }, this.errorTime);
        }
      } else {
        this.unavailableProductMessage = "Enter the correct number!";
        setTimeout(() => {
          this.unavailableProductMessage = false;
        }, this.errorTime);
      }
    },
    takeProduct() {},
    // ...mapActions("controlPanel", ["addBanknote"]),
    ...mapMutations("controlPanel", ["ADD_BANKNOTE", "ADD_PRODUCT"])
  }
};
</script>

<style></style>
