<template>
  <div class="page__showcase">
    <div class="page__showcase-body">
      <ul class="product-list">
        <li v-for="item in list" :key="item.id" class="product-list__item">
          <div
            :class="[
              'product',
              banknotesSummary <= item.price || 'product_active'
            ]"
          >
            <span class="product__name">{{ item.name }}</span>
            <span class="product__desc">{{ item.description }}</span>
            <span class="product__price">{{ item.price }} R</span>
            <span class="product__id">{{ item.id }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "VendingScreen",
  computed: {
    ...mapState("goods", ["list"]),
    ...mapGetters("controlPanel", ["banknotesSummary"])
  }
};
</script>
