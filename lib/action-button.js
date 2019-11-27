define('action-button', {
    template: `<button :disabled="disabled" style="outline: none" :class="['action-button-shadow focus:bg-yellow-500 focus:border-yellow-600 rounded px-4 py-1 border border-blue-700 bg-blue-500 text-white', { 'opacity-25': disabled}]" @click="$emit('click')">{{text}}</button>`,
    props: {
        text: String,
        disabled: Boolean
    }
});
