<template lang="pug">
  .post-detail-page
    .post-detail-page__banner
      img(:src="page.image")
    .post-detail-page__wrap.container
      .post-detail-page__data.text-date {{ page.date }}
      h1.post-detail-page__title.text-date {{ page.name }}
      .post-detail-page__content(v-html="page.detail_text")
      .post-detail-page__like.like-block(@click="toggleLike" :class="page.liked ? 'like-block_active': ''")
        svg(width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M7.67974 13L6.6607 12.0109C2.87569 8.76087 0.400879 6.57065 0.400879 3.88587C0.400879 1.69565 2.1478 0 4.40425 0C5.64166 0 6.87906 0.565217 7.67974 1.4837C8.48041 0.565217 9.71781 0 10.9552 0C13.2117 0 14.9586 1.69565 14.9586 3.88587C14.9586 6.57065 12.4838 8.76087 8.69878 12.0109L7.67974 13Z")
        .like-block__count  {{ page.like }}
      .post-detail-page__labels
        .post-detail-page__label.typical-label.typical-label_dark(v-for="label in labels") # {{ label }}
</template>
<script>
export default {
  async asyncData ({ app, params, redirect }) {
    const res = await app.$axios.$get(`/posts/${params.id}`).catch(e => console.error(e))
    return {
      page: res
    };
  },
  data() {
    return {}
  },
  computed: {
    labels() {
      return this.page.tag.split(' ')
    }
  },
  methods: {
    toggleLike() {
      this.page.liked = !this.page.liked
      if (this.page.liked) {
        this.page.like++
      }
      else {
        this.page.like--
      }
      try {
        this.$axios.$put(`posts/${this.page.id}`, this.page)
      } catch (e) {
        console.error(e)
      }
    }

  }
}
</script>
<style lang="scss">
.post-detail-page {
  background: #fff;
  min-height: 100vh;
  &__banner {
    height: 400px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  &__data {
    margin-bottom: 10px;
  }
  &__title {
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 44px;
    margin-bottom: 35px;
    color: #000000;
  }
  &__content {
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #666565;
    margin-bottom: 25px;
  }
  &__like {
    display: inline-flex;
    margin-bottom: 21px;
  }
  &__labels {
    border-top: 1px solid rgba(141, 190, 80, 0.5);
    padding-top: 10px;
    padding-bottom: 10px;
  }
  &__label + &__label {
    margin-left: 10px;
  }
}
</style>
