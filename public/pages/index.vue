<template lang="pug">
  .posts-page
    .posts-page__content
      .posts-page__list
        PostCard.posts-page__item(v-for="post in posts" :key="post.id" :post="post")
</template>

<script>
import PostCard from '~/components/post-card'
export default {
  components: {
    PostCard
  },
  async asyncData ({ app, redirect }) {
   const res = await app.$axios.$get('/posts')

    return {
      posts: res,
    };
  },
}
</script>
<style lang="scss">
.posts-page {
  &__content {
    max-width: 1850px;
    margin: auto;
    @media (max-width:767px) {
      padding: 0px 10px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      padding: 0px 10px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      padding: 0px 10px;
    }
  }
  &__list {
    margin-top: 182px;
    display: grid;
    grid-template-columns: repeat(4, 4fr);
    gap: 20px 20px;
    margin-bottom: 80px;
    @media (max-width:767px) {
      grid-template-columns: 1fr
    }
    @media (min-width: 768px) and (max-width: 991px) {
      grid-template-columns: repeat(2, 6fr);
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      grid-template-columns: repeat(3, 4fr);
    }
  }
}
.post-item {

}
</style>
