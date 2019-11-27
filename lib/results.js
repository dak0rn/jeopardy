define('results', ['action-button'], function(ActionButton) {
    return {
        components: {
            ActionButton
        },

        template: `<div class="border border-grey-darker p-4 shadow my-4 max-w-sm mx-auto">
      <div class="flex w-full mb-4">
        <div class="font-bold text-red-500 flex-auto">
          {{state.team1.name}}<br />
          {{state.team1.score}}
        </div>
        <div class="text-right flex-auto font-bold text-blue-500">
          {{state.team2.name}}<br />
          {{state.team2.score}}
        </div>

    </div>
        <div class="text-right">
          <action-button text="New game" @click="$emit('newGame')" />
        </div>
    </div>`,
        props: {
            state: Object
        }
    };
});
