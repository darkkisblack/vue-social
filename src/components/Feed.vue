<template>
    <div>
        <mcv-loading v-if="isLoading"/>
        <mcv-error-message v-if="error"/>
        <div v-if="feed">
            <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
                <div class="articles-meta">
                    <router-link 
                        :to="{
                            name: 'userProfile', 
                            params: {slug: article.author.username}
                            }">
                        <img :src="article.author.image" alt="">
                    </router-link>
                    <div class="info">
                        <router-link 
                            :to="{
                                name: 'userProfile', 
                                params: {slug: article.author.username}
                            }"
                            class="author"
                            >
                            {{article.author.username}}
                        </router-link>
                        <span class="date">{{article.createdAt}}</span>
                    </div>
                    <div class="pull-xs-right">
                        ADD TO FAVORITES
                    </div>
                </div>
                <router-link
                    :to="{
                        name: 'article',
                        params: {slug: article.slug}
                    }"
                    class="preview-link"
                >
                <h1>{{article.title}}</h1>
                <p>{{article.description}}</p>
                <span>Read more...</span>
                TAG LIST
                </router-link>
            </div>
            <mcv-pagination 
            :total="feed.articlesCount" 
            :limit="limit" 
            :current-page="currentPage"
            :url="baseUrl" />
        </div>
        
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination.vue'
import {limit} from '@/helpers/variables'
import queryString  from 'query-string'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from "@/components/ErrorMessage.vue";

export default {
    name: 'McvFeed',
    props: {
        apiUrl: {
            type: String,
            required: true
        }
    },
    components: {
        McvPagination,
        McvLoading,
        McvErrorMessage
    },
    data() {
        return {
            limit,
            /* url: '/' */
        }

    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error
        }),
        currentPage() {
            return Number(this.$route.query.page || '1')
        },
        baseUrl() {
            return this.$route.path
        },
        offset() {
            return this.currentPage * limit - limit
        }
    },
    watch: {
        currentPage() {
            this.fetchFeed()
        }
    },
    mounted() {
        this.fetchFeed()
    },
    methods: {
        fetchFeed() {
            const parsedUrl = queryString.parseUrl(this.apiUrl)
            const stringifiedParams = queryString.stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            })
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
        }
    }
}
</script>