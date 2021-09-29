<template lang="pug">
  .post-item
    .post-item__top-info
      .post-item__image-block
        img.post-item__image(:src="postData.image")
        .post-item__label.typical-label # {{ postData.tag }}
      nuxt-link.post-item__title(:to="{ name: 'posts-id', params: { id: postData.id }}")  {{ postData.name }}
      .post-item__description
        p {{ post.description }}
    .post-item__bottom-info
      .post-item__date.text-date {{ postData.date }}
      .post-item__like.like-block(@click="toggleLike" :class="postData.liked ? 'like-block_active': ''")
        svg(width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M7.67974 13L6.6607 12.0109C2.87569 8.76087 0.400879 6.57065 0.400879 3.88587C0.400879 1.69565 2.1478 0 4.40425 0C5.64166 0 6.87906 0.565217 7.67974 1.4837C8.48041 0.565217 9.71781 0 10.9552 0C13.2117 0 14.9586 1.69565 14.9586 3.88587C14.9586 6.57065 12.4838 8.76087 8.69878 12.0109L7.67974 13Z" )
        .like-block__count  {{ postData.like }}


</template>
<script>
export default {
  props: {
    post: { type: Object, default: () => {}}
  },
  data() {
    return {
      postData: null,
    }
  },
  created() {
    this.postData = this.post
  },
  methods: {
    toggleLike() {
      this.postData.liked = !this.postData.liked
      if (this.postData.liked) {
        this.postData.like++
      }
      else {
        this.postData.like--
      }

      try {
        this.$axios.$put(`posts/${this.postData.id}`, this.postData)
      } catch (e) {
        console.error(e)
      }

    }
  }
}
</script>
<style lang="scss">
.post-item {
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  &__image-block {
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 21px;
    position: relative;
  }
  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    text-decoration: none;
  }
  &__image {
    max-width: 100%;
  }
  &__description {
    margin-top: 28px;
    color: #666565;
    font-size: 15px;
    line-height: 22px;
  }
  &__date {
    font-style: italic;
    font-weight: normal;
    font-size: 13px;
    line-height: 22px;
    color: #909599;
  }
  &__bottom-info {
    display: flex;
    justify-content: space-between;
  }
  &__like {}
  &__like-count {}
  &__label {
    position: absolute;
    bottom: 10px;
    left: 5px;
  }
}

</style>
