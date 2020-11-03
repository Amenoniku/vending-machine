<template>
  <div class="page">
    <VendingScreen />
    <ControlPanel />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VendingScreen from "@/components/VendingScreen";
import ControlPanel from "@/components/ControlPanel";

export default {
  name: "app",
  components: { VendingScreen, ControlPanel },
  methods: {
    ...mapActions("goods", {
      getGoods: "getList"
    })
  },
  created() {
    this.getGoods();
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
