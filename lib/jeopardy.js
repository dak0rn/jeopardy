define('jeopardy', ['game-settings', 'game', 'results'], function(GameSettings, Game, Results) {
    const createData = function() {
        return {
            team1: {
                name: '',
                score: 0
            },

            team2: {
                name: '',
                score: 0
            },

            questions: null,

            questionsClosed: 0
        };
    };

    return {
        components: {
            GameSettings,
            Game,
            Results
        },

        template: `<div>
      <game-settings v-if="showSettings" @submit="startGame" />

      <game
        v-if="showGamefield"
        :state="state"
        @scored="playerHasScored"
		@cancel="cancelGame"
        @bothLost="bothLost"
        @questionFailed="questionFailed"
		@playerFailed="playerFailed"
        />

      <results @newGame="newGame" :state="state" v-if="showResults" />
    </div>`,

        data() {
            const saved = window.localStorage['jeopardy'];
            const state = saved ? JSON.parse(saved) : createData();

            return {
                state
            };
        },

        computed: {
            showResults() {
                if (null === this.state.questions) {
                    return false;
                }

                let noQuestions = 0;

                Object.keys(this.state.questions).forEach(category => {
                    noQuestions += this.state.questions[category].length;
                });

                return this.state.questionsClosed === noQuestions;
            },

            showGamefield() {
                return this.state.questions !== null && !this.showResults;
            },

            showSettings() {
                return this.state.questions === null;
            }
        },

        methods: {
            startGame(questions, team1, team2) {
                this.state.team1.name = team1;
                this.state.team2.name = team2;
                this.state.questions = questions;
            },

            playerHasScored(obj) {
                const { team, difficulty, category, index } = obj;

                this.state['team' + team].score += difficulty;
                this.state.questions[category][index].answeredBy = team;

                this.state.questionsClosed++;
            },

            playerFailed(obj) {
                const { team, difficulty } = obj;

                this.state['team' + team].score -= difficulty;
            },

            bothLost(obj) {
                const { difficulty, category, index } = obj;
                this.playerFailed(obj);
                this.state.questions[category][index].failed = true;

                this.state.questionsClosed++;
            },

            newGame() {
                window.localStorage['jeopardy'] = null;
                this.state = createData();
            },

            cancelGame() {
                this.newGame();
            },

            questionFailed(obj) {
                const { difficulty, category, index } = obj;
                this.state.questions[category][index].failed = true;
                this.state.questionsClosed++;
            }
        },

        watch: {
            state: {
                deep: true,
                handler(newValue) {
                    window.localStorage['jeopardy'] = JSON.stringify(newValue);
                }
            }
        }
    };
});