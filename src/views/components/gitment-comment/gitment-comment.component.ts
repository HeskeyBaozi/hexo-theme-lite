import Vue from 'vue';
import { mapState } from "vuex";
import { RootState } from "@/store";
import Gitment from 'gitment';

declare const location: Location;


export default Vue.extend({
  name: 'gitment-comment',
  props: {
    isImplicit: {
      required: true,
      type: Boolean
    },
    slugOrSource: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapState({
      gitmentOptions: (state: RootState) => state.meta.themeConfig.gitment
    })
  },
  mounted() {
    if (!this.gitmentOptions.enable) {
      return;
    }

    // https://github.com/imsun/gitment#3-render-gitment
    const gitment = new Gitment({
      id: this.slugOrSource,
      owner: this.gitmentOptions.github_id,
      repo: this.gitmentOptions.repository_name,
      oauth: {
        client_id: this.gitmentOptions.client_id,
        client_secret: this.gitmentOptions.client_secret,
      },
      title: this.$route.path,
      perPage: this.gitmentOptions.per_page,
      maxCommentHeight: this.gitmentOptions.max_comment_height
    });

    this.$nextTick(() => {
      gitment.render('lite-gitment-root');
    });
  }
});
