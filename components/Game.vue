<template>
    <div ref="game"></div>
</template>

<script>
import GameController from '~/game/GameController'

export default {

    data(){
        return {
            controller: null
        }
    },

    mounted(){
        this.controller = new GameController({
            width: 1280,
            height: 720,
            container: this.$refs.game
        });
    }

}
</script>

