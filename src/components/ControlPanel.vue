<template>
  <div class="page__control-panel">
    <div class="page__control-panel-body" id="control-panel">
      <form class="form">
        <label class="text-board form__label">
          <span class="text-board__text">{{ topMessage }}</span>
        </label>
        <div class="form__input-container">
          <input
            v-model="coinAcceptor"
            class="form__input"
            type="text"
            placeholder="..."
            :disabled="!product || !maxPrice"
          />
        </div>
        <span class="form__desc">
          Available banknotes:
          <span v-for="(item, index) in availableBanknotes" :key="index">
            {{
              `${availableBanknotes.length - 1 === index ? "or" : ""} ${item}${
                availableBanknotes.length - 1 === index ? "" : ","
              }`
            }}
          </span>
          <br />
          The machine gives change <br />in
          <span v-for="(item, index) in availableCoins" :key="index">
            {{
              `${availableCoins.length - 1 === index ? "and" : ""} ${item}${
                availableCoins.length - 1 === index ? "" : ","
              }`
            }}
          </span>
          R coins
        </span>
      </form>
      <form class="form">
        <label class="text-board form__label">
          <span class="text-board__text">{{
            isMinPrice ? "Choose product..." : "."
          }}</span>
        </label>
        <div class="form__input-container">
          <input
            v-model="productId"
            class="form__input form__input_disable"
            type="text"
            :disabled="!isMinPrice"
            placeholder="."
          />
        </div>
      </form>
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
              <div class="product">
                <span class="product__name">{{ item.name }}</span>
                <span class="product__desc">{{ item.description }}</span>
                <span class="product__price">{{ item.price }} R</span>
                <span class="product__id">{{ item.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ControlPanel",
  data: () => ({
    coinAcceptor: null,
    productId: null
  }),
  computed: {
    topMessage() {
      let message = "Insert banknotes...";

      return message;
    },
    isMinPrice() {
      return this.minPrice <= this.banknotesSummary;
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
    ...mapActions("controlPanel", {})
  }
};
</script>

<style></style>
