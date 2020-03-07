export default function setPrompt({ message, placeholder, type = 'text', options }) {
    this.prompter = Object.assign(Object.assign({}, this.prompter), { show: true, message,
        placeholder,
        type,
        options });
    return new Promise((resolve, reject) => {
        this.prompter.resolve = resolve;
        this.prompter.reject = reject;
    });
}
