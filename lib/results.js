define('results', ['action-button'], function (ActionButton) {
    return {
        components: {
            ActionButton
        },

        template: `
      <div>
        <canvas ref="canvas" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: -1"></canvas>

        <div class="border border-grey-darker p-4 shadow my-4 max-w-sm mx-auto">
          <div class="flex w-full mb-4">
            <div class="font-bold text-red-500 flex-auto">
              {{state.team1.name}}<br />
              {{state.team1.score}} points
            </div>
            <div class="text-right flex-auto font-bold text-blue-500">
              {{state.team2.name}}<br />
              {{state.team2.score}} points
            </div>
    
          </div>
            <div class="text-right mt-12">
              <action-button text="New game" @click="$emit('newGame')" />
            </div>
        </div>
      </div>
`,
        props: {
            state: Object
        },

        mounted() {
            const config = {
                "target": this.$refs.canvas,
                "max": "1000",
                "size": "1",
                "animate": true,
                "props": ["circle", "square", "triangle", "line"],
                "colors": [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
                "clock": "50",
                "rotate": false,
                "width": "1800",
                "height": "1074",
                "start_from_edge": true,
                "respawn": false
            };

            const confetti = new ConfettiGenerator(config);
            confetti.render();
        }
    };
});