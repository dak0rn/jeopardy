define('input-field', {
    template: `<input
      :value="value"
      :class="['block w-full border border-gray-300 shadow-inner rounded px-2 py-1', { 'opacity-25': disabled }]"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      :type="type" />`,

    props: {
        value: String,
        disabled: Boolean,
        type: {
            type: String,
            default: 'text'
        }
    }
});
