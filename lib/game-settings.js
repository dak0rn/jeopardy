define('game-settings', ['input-field', 'action-button'], function(InputField, ActionButton) {
    return {
        components: {
            InputField,
            ActionButton
        },

        template: `<div class="border border-grey-darker p-4 shadow my-4 max-w-sm mx-auto">
			<h1 class="font-bold">Game Settings</h1>

			<label>Name of team 1:<span class="ml-4 inline-block w-4 h-4 bg-red-300"></span></label>
			<input-field v-model="team1" />

			<label class="mt-3 block">Name of team 2:<span class="ml-4 inline-block w-4 h-4 bg-blue-300"></span></label>
			<input-field v-model="team2" />

			<label class="mt-3 block">
				Question file:
			</label>

			<action-button @click="$refs.filePicker.click()" :text="filename || 'Select file'" />
			<input type="file" ref="filePicker" @change="fileSelected" id="file-picker" class="hidden" />

			<div v-if="unevenFile" class="my-4 bg-yellow-300 border border-yellow-500 p-3">
				The selected file does not have the same number of questions in every category
			</div>

			<div v-if="invalidFile" class="my-4 bg-red-300 border border-red-500 p-3">
				The selected file is a not a valid question JSON file.
			</div>

			<div class="mt-3 text-right">
				<action-button :disabled="!canSubmit" @click="submit" text="Start game" />
			</div>

			<button
				v-if="questions"
				@click="showFile = !showFile"
				class="border-0 bg-white text-blue-600 rounded-none text-xs">
			Toggle file contents
			</button>

			<pre v-if="questions && showFile" class="bg-gray-300 p-2 border border-gray-500 overflow-auto mt-2" style="font-size: 9px; max-height: 200px;">{{JSON.stringify(this.questions, null, 2)}}</pre>
		</div>`,

        data() {
            return {
                team1: '',
                team2: '',
                showFile: false,
                invalidFile: false,
                questions: null,
                filename: null,
                unevenFile: false
            };
        },

        computed: {
            canSubmit() {
                return this.team1 && this.team2 && this.questions;
            }
        },

        methods: {
            submit() {
                this.$emit('submit', this.questions, this.team1, this.team2);
            },

            valueChanged(name, event) {
                this.$emit(`changed:${name}`, event.target.value);
            },

            fileSelected(event) {
                const [file] = event.target.files;
                if (!file) {
                    return;
                }

                this.invalidFile = false;
                this.unevenFile = false;

                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const json = JSON.parse(reader.result);
                        let firstLength = -1;

                        for (const category in json) {
                            if (!Array.isArray(json[category])) {
                                delete json[category];
                            }

                            if (-1 === firstLength) {
                                firstLength = json[category].length;
                            } else if (firstLength !== json[category].length) {
                                this.unevenFile = true;
                            }

                            json[category] = json[category].map(question => {
                                if ('object' !== typeof question || null === question || Array.isArray(question)) {
                                    return { failed: true };
                                }

                                return Object.assign({}, question, { answeredBy: null, failed: false });
                            });
                        }

                        this.questions = json;
                        this.filename = file.name;
                    } catch (err) {
                        console.error(err);
                        this.invalidFile = true;
                    }
                };

                reader.readAsText(file);
            }
        }
    };
});
