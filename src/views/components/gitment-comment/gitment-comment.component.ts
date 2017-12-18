import Vue from 'vue';
import { mapState } from "vuex";
import { RootState } from "@/store";
import Gitment from 'gitment';


export default Vue.extend({
  name: 'gitment-comment',
  computed: {
    ...mapState({
      gitmentOptions: (state: RootState) => state.meta.hexoConfig.theme.gitment
    })
  },
  mounted() {
    if (!this.gitmentOptions.enable) {
      return;
    }

    // https://github.com/imsun/gitment#3-render-gitment
    const gitment = new Gitment({
      id: this.$route.path,
      owner: this.gitmentOptions.github_id,
      repo: this.gitmentOptions.repository_name,
      oauth: {
        client_id: this.gitmentOptions.client_id,
        client_secret: this.gitmentOptions.client_secret,
      },
      perPage: this.gitmentOptions.per_page,
      maxCommentHeight: this.gitmentOptions.max_comment_height
    });

    this.$nextTick(() => {
      gitment.render('lite-gitment-root');
    });
  }
});
