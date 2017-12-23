import Vue from 'vue';
import Component from 'vue-class-component';
import { Context } from '@/interfaces/fetch.interface';
import { Fetch_Tags } from '@/store/types';
import { Tag } from '@/models/posts-list.class';
import { RootState } from '@/store';

@Component({
  name: 'tags-page'
})
export default class TagsPage extends Vue {
  search = '';

  get tags(): Tag[] {
    return (this.$store.state as RootState).tags.tags;
  }

  get displayTags():Tag[] {
    const search = this.$data.search;
    return search.length ?
      this.tags.filter(tag => tag.slug.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      : this.tags;
  }

  async fetch({ store, route }: Context) {
    await store.dispatch(`tags/${Fetch_Tags}`);
  }
}
