const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
      base: '/<repository-name>/'
    }
} : {}

module.exports = {

    css: [
        '~/assets/css/styles.scss'
    ],

    ...routerBase

}