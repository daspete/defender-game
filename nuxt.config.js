const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
      base: '/defender-game/'
    }
} : {}

module.exports = {

    head: {
        titleTemplate: '%s - Core Defender',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Meta description' }
        ]
    },

    css: [
        '~/assets/css/styles.scss'
    ],

    ...routerBase

}