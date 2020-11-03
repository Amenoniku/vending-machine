<template>
  <div class="page__control-panel">
    <div class="page__control-panel-body" id="control-panel">
      <form class="form">
        <label class="text-board form__label"
          ><span class="text-board__text">Insert banknotes...</span></label
        >
        <div class="form__input-container">
          <input class="form__input" type="text" placeholder="..." />
        </div>
        <span class="form__desc"
          >Available banknotes: 50, 100, <br />200, 500 or 1000 R. <br />The
          machine gives change <br />in 1, 2, 5 and 10 R coins.</span
        >
      </form>
      <form class="form">
        <label class="text-board form__label"
          ><span class="text-board__text">.</span></label
        >
        <div class="form__input-container">
          <input
            class="form__input form__input_disable"
            type="text"
            disabled=""
            placeholder="."
          />
        </div>
      </form>
      <div class="output">
        <div class="text-board output__text-board">
          <span class="text-board__text">.</span>
        </div>
        <div class="output__bottom">
          <div class="output__output" id="changeOutput"></div>
          <div
            class="output__output output__output_product"
            id="productOutput"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ControlPanel",
  computed: {
    ...mapState("goods", {
      goods: state => state.list
    })
  },
  methods: {
    ...mapActions("goods", {})
  }
};
</script>

<style></style>
