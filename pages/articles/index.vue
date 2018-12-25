<template>
  <div>
    <div id="data" style="display:block"><b>articles:</b>{{ data }}</div>
    <ul>
      <li v-for="(post, index) in data.articles" :key="index">
        <NuxtLink :to="{ path: `/articles/${post.link}` }">
          <!--use params with name(not path) to="{name:id,params: { id: post._id } }"-->
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
/*
const vue=require('vue'),vuex=require('vuex') //or req(..).default??
vue.use(vuex)
//console.log(Vuex);
const store = new vuex.Store({
  state:{test:"OK"}
})
*/
//import { root } from '~/eldeeb.config.js'
import articles from '~/other/db/articles_index.js' //nx: const articles = require(path.normalize(`${root}/store/db/articles_index.js`))

export default {
  async asyncData(app) {
    console.log(await articles)
    return {
      data: {
        test: 'ok',
        articles: await articles.catch(err => console.log('error:', err))
      }
    }
  },
  title: 'Articles',
  template: '<div>$template </div>'
}
</script>
