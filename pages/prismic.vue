<template>
  <article>
    <h1 class="article-title" v-html="$prismic.dom.RichText.asHtml(document.data.title, $prismic.linkResolver)"></h1>
    <div class="cover">
      <img :src="document.data.cover_image.url" :alt="document.data.cover_image.alt"  />
      <!--<img :src="$prismic.dom.Link.url(document.data.cover_image.url, $prismic.linkResolver)" :alt="document.data.cover_image.alt"  />-->
    </div>
      <div class="article-content" v-html="$prismic.dom.RichText.asHtml(document.data.content, $prismic.linkResolver)"></div>

<div id="test">
  <b>test:</b> {{document}}
</div>
  </article>
</template>

<script>
export default {
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.getByUID('article', 'article-1')
    console.log('document:', document)

    if (document && !document.error) {
      return { document } //  return document
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style scoped>
.title {
  margin: 50px 0;
}
</style>
