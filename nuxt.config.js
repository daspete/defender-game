const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
      base: '/defender-game/'
    }
} : {}

module.exports = {

    css: [
        '~/assets/css/styles.scss'
    ],

    ...routerBase

}