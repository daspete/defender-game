<template>
    <div class="wrapper" style="width: 1280px;">
        <div style="text-align: center">
            <game></game>
        
            <a href="https://github.com/daspete/defender-game/">Source @ github</a>
        </div>
    </div>
</template>

<script>
import Game from '~/components/Game'

export default {

    components: {
        Game
    },

    head(){
        return {
            title: 'TestLevel',
            meta: [
                { name: 'description', content: 'Defend the core, bugs are everywhere :O' }
            ]
        }
    }

}
</script>
