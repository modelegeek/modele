// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

// Register a global custom directive called v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  },
  update: function (el) {
    el.focus()
  }
});

Vue.directive('draggable', {
  bind: function (el, binding) {
    el.style.position = 'absolute';
    let startX, startY, initialMouseX, initialMouseY;

    function mouseMove (e) {
      let dx = e.clientX - initialMouseX;
      let dy = e.clientY - initialMouseY;
      let tableDetail = binding.value;
      tableDetail.y = startY + dy;
      tableDetail.x = startX + dx;
      return false;
    }

    function mouseUp () {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    }

    el.addEventListener('mousedown', function (e) {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
      return false;
    });
  },
});