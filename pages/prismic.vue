<template>
  <section>
    <div v-html="$prismic.dom.RichText.asHtml(document.data.title, $prismic.linkResolver)"></div>
  </section>
</template>
 
<script>
export default {
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.getByUID('page', 'my-page')

    if (document) {
      return { document }
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
