import Vue from 'vue';
import debounce from 'lodash.debounce';

// https://github.com/FranckFreiburger/vue-resize-sensor/blob/master/src/resize-sensor.vue

export default Vue.extend({
  props: {
    initial: {
      type: Boolean,
      default: false,
    }
  },
  data: function () {
    return {
      size: {
        width: -1,
        height: -1
      }
    };
  },
  methods: {
    reset: function () {
      const expand: any = this.$el.firstChild;
      const shrink: any = this.$el.lastChild;
      expand.scrollLeft = 100000;
      expand.scrollTop = 100000;
      shrink.scrollLeft = 100000;
      shrink.scrollTop = 100000;
    },
    update: function () {
      this.size.width = this.$el.offsetWidth;
      this.size.height = this.$el.offsetHeight;
    }
  },
  watch: {
    size: {
      deep: true,
      handler: debounce((function (this: any, size) {
        this.reset();
        this.$emit('resize', { width: this.size.width, height: this.size.height });
      }), 1000)
    }
  },
  render: function (create: any) {
    const style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
    const styleChild = 'position: absolute; left: 0; top: 0;';
    return create('div', {
      style: style + 'animation-name: resizeSensorVisibility;',
      on: {
        '~animationstart': (this as any).update
      }
    }, [
        create('div', {
          style: style,
          on: {
            scroll: (this as any).update
          }
        }, [
            create('div', {
              style: styleChild + 'width: 100000px; height: 100000px;'
            })
          ]),
        create('div', {
          style: style,
          on: {
            scroll: (this as any).update
          }
        }, [
            create('div', {
              style: styleChild + 'width: 200%; height: 200%;'
            })
          ]),
      ]);
  },
  beforeDestroy: function () {

    this.$emit('resize', { width: 0, height: 0 });
    this.$emit('resizeSensorBeforeDestroy');
  },
  mounted: function () {
    if (this.initial === true)
      this.$nextTick(this.update);

    if (this.$el.offsetParent !== this.$el.parentNode)
      (this.$el.parentNode as any).style.position = 'relative';
    if ('attachEvent' in this.$el && !('AnimationEvent' in window)) {
      var onresizeHandler = () => {
        this.update();
        removeOnresizeEvent();
      };

      var removeOnresizeEvent = () => {

        (this.$el as any).detachEvent('onresize', onresizeHandler);
        this.$off('resizeSensorBeforeDestroy', removeOnresizeEvent);
      };

      (this.$el as any).attachEvent('onresize', onresizeHandler);
      this.$on('resizeSensorBeforeDestroy', removeOnresizeEvent);
      this.reset();
    }
  }
});
