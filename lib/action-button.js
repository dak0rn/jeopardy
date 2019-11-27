define('action-button', {
    template: `<button :disabled="disabled" :class="['rounded shadow px-4 py-1 border border-blue-700 bg-blue-500 text-white', { 'opacity-25': disabled}]" @click="$emit('click')">{{text}}</button>`,
    props: {
        text: String,
        disabled: Boolean
    }
});
