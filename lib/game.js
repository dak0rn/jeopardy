define('game', ['question', 'action-button'], function(Question, ActionButton) {
    return {
        components: {
            Question,
            ActionButton
        },

        template: `<div>
			<div class="border border-grey-darker p-4 shadow my-4 mx-auto" style="min-width: 900px; max-width: 90%">
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

				<div class="flex w-full overflow-auto">
					<div
						class="mr-2 flex flex-col flex-grow"
						v-for="(questions, category) in state.questions"
						:key="category">

						<div class="py-2 px-4 font-bold bg-gray-300 h-16 text-center" style="min-width: 8rem">
							{{category}}
						</div>

						<div
							v-for="(question, index) in questions"
							:class="[
								'px-4 py-4 text-center mt-2',
								{
									'cursor-pointer bg-gray-200 hover:bg-green-300 hover:shadow': !question.failed && !question.answeredBy,
									'cursor-help': question.failed || question.answeredBy,
									'bg-red-300': 1 === question.answeredBy,
									'bg-blue-300': 2 === question.answeredBy,
									'bg-gray-400': question.failed
								}
							]"
							@click="
								() => {
									if(question.failed || question.answeredBy !== null) {
										alert(question.question)
										return;
									}

									show = [category, question, index];
								}
							"
							:key="index">
							<span v-if="!question.failed && null === question.answeredBy">
								{{question.difficulty}}
							</span>

							<span v-if="question.answeredBy">
								{{state['team' + question.answeredBy].name}}
							</span>

							<span v-if="question.failed">
								x(
							</span>
						</div>
					</div>
				</div>

				<question
					@scored="playerHasScored"
					@bothLost="bothLost"
					@playerFailed="$emit('playerFailed', $event)"
					@cancel="closeQuestion"
					v-if="null !== show" :state="state" :category="show[0]" :solution="show[1].question" :difficulty="show[1].difficulty" :index="show[2]" />
			</div>

			<div class="opacity-25 hover:opacity-100 absolute bottom-0 right-0 p-2">
				<action-button @click="$emit('cancel')" text="Cancel game" />
			</div>
		</div>`,
        props: {
            state: Object
        },

        data() {
            return {
                show: null // [title, {...}, index]
            };
        },

        methods: {
            playerHasScored(obj) {
                this.closeQuestion();
                this.$emit('scored', obj);
            },

            bothLost(obj) {
                this.closeQuestion();
                this.$emit('bothLost', obj);
            },

            closeQuestion() {
                this.show = null;
            }
        }
    };
});