import Vue from 'vue';

export default Vue.extend({
  name: 'detailable-content',
  props: {
    html: {
      required: true,
      type: String
    }
  }
})
