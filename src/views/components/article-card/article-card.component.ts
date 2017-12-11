import Vue from 'vue';
import Component from 'vue-class-component';
import { Post } from '@/models/posts-list.class';


@Component({
    name: 'article-card',
    props: {
        format: {
            required: true,
            type: String
        },
        post: {
            required: true,
            validator: obj => obj instanceof Post
        },
        type: {
            required: true,
            default: 'card',
            type: String,
            validator: str => str === 'card' || str === 'detail'
        }
    }
})
export default class ArticleCard extends Vue {
    format: string;
    post: Post;
    type: 'card' | 'detail';
}