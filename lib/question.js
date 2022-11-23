define('question', ['action-button'], function(ActionButton) {
    const sound = new Howl({
        src: 'song.mp3',
        loop: true
    });

    return {
        components: {
            ActionButton
        },
        template: `<div class="fixed right-0 top-0 left-0 bottom-0">
			<div class="bg-black opacity-50 absolute right-0 top-0 left-0 bottom-0"></div>

			<div class="absolute right-0 top-0 left-0 bottom-0">
				<div class="bg-white max-w-xl mx-auto mt-8">

					<div class="text-center font-bold">
					    <div class="float-left text-sm cursor-help mx-2" @click="showAnswer">?</div>
					    <div class="float-right text-sm cursor-pointer mx-2" @click="$emit('cancel')">&times;</div>
						{{category}} - {{difficulty}}
					</div>
					
					<div v-if="!image" class="bg-gray-300 text-center text-2xl p-8">{{answer}}</div>
					<img v-else :src="image" class="block my-4 mx-auto" style="max-width: 90%;" />

					<div v-if="1 === team" class="bg-red-300 text-center text-2xl p-8">
						{{state.team1.name}}
					</div>

					<div v-if="2 === team" class="bg-blue-300 text-center text-2xl p-8">
						{{state.team2.name}}
					</div>

					<div class="flex" v-if="null !== team">
						<div class="flex-auto px-2 py-4">
							<action-button text="WRONG" @click="wrongAnswer" />
						</div>
						<div class="flex-auto text-center py-4" v-if="changed">
							<action-button text="CANCEL" @click="$emit('questionFailed', eventPayload)" />
						</div>
						<div class="flex-auto text-right px-2 py-4">
							<action-button text="RIGHT" @click="answeredCorrectly" />
						</div>
					</div>

					<div v-if="null === team" class="flex text-xs">
						<div class="flex-auto py-1 px-2 bg-red-300 w-1/2">
							<kbd>p</kbd>
						</div>
						<div class="flex-auto text-right bg-blue-300 py-1 px-2 w-1/2">
							<kbd>y</kbd> / <kbd>z</kbd>
						</div>
					</div>
					<div v-if="null !== team" class="py-1 px-2 flex text-xs">
						<div class="flex-auto">
							<kbd>Backspace</kbd>
						</div>
						<div class="flex-auto text-right">
							<kbd>Space</kbd>
						</div>
					</div>
				</div>
			</div>
		</div>`,

        props: {
            state: Object,
            category: String,
            difficulty: Number,
            solution: String,
            index: Number
        },

        data() {
            return {
                team: null,
                changed: false
            };
        },

        computed: {
            answer() {
                let answer = null;

                this.state.questions[this.category].forEach(q => {
                    if (null !== q && q.difficulty === this.difficulty) {
                        answer = q.answer;
                    }
                });

                return answer;
            },

            image() {
                let image = null;

                this.state.questions[this.category].forEach(q => {
                    if (null !== q && q.difficulty === this.difficulty) {
                        image = q.image;
                    }
                });

                return image;
            },

            eventPayload() {
                return {
                    category: this.category,
                    difficulty: this.difficulty,
                    team: this.team,
                    index: this.index
                };
            }
        },

        methods: {
            answeredCorrectly() {
                this.$emit('scored', this.eventPayload);
            },

            keyPressed(event) {
                if (null === this.team) {
                    sound.stop();

                    if ('p' === event.key) {
                        this.team = 1;
                    }

                    if ('y' === event.key || 'z' === event.key) {
                        this.team = 2;
                    }
                } else {
                    if (32 === event.keyCode) {
                        this.answeredCorrectly();
                    }

                    if (8 === event.keyCode) {
                        this.wrongAnswer();
                    }
                }
            },

            wrongAnswer() {
                if (this.changed) {
                    this.$emit('bothLost', this.eventPayload);
                    return;
                }

                this.changed = true;
                this.$emit('playerFailed', this.eventPayload);

                if (1 === this.team) {
                    this.team = 2;
                } else {
                    this.team = 1;
                }
            },

            showAnswer() {
                alert(this.solution);
            }
        },

        mounted() {
            document.body.addEventListener('keydown', this.keyPressed);
            sound.play();
        },

        beforeDestroy() {
            document.body.removeEventListener('keydown', this.keyPressed);
        }
    };
});