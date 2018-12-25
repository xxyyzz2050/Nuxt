<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <h1>Error</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="90"
        height="90"
        fill="#DBE1EC"
        viewBox="0 0 48 48"
      >
        <path
          d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
        />
      </svg>

      <div class="title">{{ message }}</div>
      <p v-if="statusCode === 404" class="description">
        <NuxtLink class="error-link"
to="/"
>
Back to the home page
</NuxtLink>
      </p>

      <p v-else class="description">
        An error occurred while rendering the page. Check developer tools
        console for details.
      </p>

      <div class="logo">
        <a href="https://nuxtjs.org"
target="_blank" rel="noopener">
          Nuxt.js
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    //when using eslint, type and default value are required, if the type is array or object, default must be a function  https://stackoverflow.com/a/53660944/9474643 https://vuejs.org/v2/guide/components-props.html#Prop-Types
    error: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  head() {
    return {
      title: this.error.message || 'Error!',
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },

  // Only on debug mode
  data() {
    return {
      mounted: false
    }
  },

  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || 'Error'
    }
  },
  watch: {
    error(newErr) {
      if (newErr) {
        console.error(newErr)
      }
    }
  },
  mounted() {
    this.mounted = true
  },
  created() {
    console.error(this.error)
  }
}
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  background: #f7f8fb;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494e;
  margin-bottom: 8px;
}
.__nuxt-error-page .description {
  color: #7f828b;
  line-height: 21px;
  margin-bottom: 10px;
}
.__nuxt-error-page a {
  color: #7f828b !important;
  text-decoration: none;
}
.__nuxt-error-page .logo {
  position: fixed;
  left: 12px;
  bottom: 12px;
}
</style>
