<template>
  <div>
    <article class="post">
      <div class="post-header">
        <div class="tools" />
        <div class="user" />
      </div>
      <div class="post-body">
        <h1 class="post-title"
dir="auto">
          <NuxtLink to=""> {{ data.article.title }} </NuxtLink>
        </h1>
        <h3 class="post-subtitle"
dir="auto" v-if="data.article.subtitle">
          {{ data.article.subtitle }}
        </h3>
        <img
v-if="data.article.img" class="post-img" />
        <!-- nx: lazy load -->
        <div class="post-content">
          {{ data.article.content }}
          <div
v-if="data.article.more" class="post-more">see more..</div>
        </div>
      </div>
    </article>
    <NuxtLink :to="{ path: `/articles/` }"> Home </NuxtLink>
  </div>
</template>

<script>
import article from '~/other/db/article.js'
import eldeeb from '~/eldeeb'
/*
 import { root } from '../../eldeeb.config.js';
 import article from path.normalize(`${config.root}/other/db/article.js`) or use require()
 const eldeeb = require(`${config.root}/eldeeb`)
*/
export default {
  async asyncData(app) {
    let shortId = app.req.originalUrl.match(/\/articles\/(?:.*\/)?([^\/]+)/)
    eldeeb.log(shortId, 'shortId')
    if (shortId) shortId = shortId[1]

    return {
      data: {
        test: 'ok',
        article: await article(shortId).catch(err => {
          eldeeb.log(err, 'error')
          app.error({ statusCode: 404, message: 'The article not found' })
        }) //nx: catch error
      }
    }
  },
  head() {
    return {
      //title: this.data&&this.data.article&&this.data.article.title?this.data.article.title:"",
    }
  }

  //watchQuery:true
}
</script>

<style>
</style>
