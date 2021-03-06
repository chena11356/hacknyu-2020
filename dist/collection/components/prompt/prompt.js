import { h } from "@stencil/core";
import { defer as loDefer } from 'lodash-es';
export class Prompt {
    watchHandler(newValue, oldValue) {
        if (newValue.show === oldValue.show)
            return;
        if (newValue.show) {
            this.input = null;
            if (newValue.options)
                this.input = this.input || `${newValue.options[0].code}:${newValue.options[0].issuer}`;
            else
                loDefer(() => this.element.shadowRoot.querySelector('input').focus());
        }
        else {
            this.prompter.message = null;
            this.prompter.placeholder = null;
            this.prompter.options = null;
        }
    }
    componentDidLoad() {
        addEventListener('keyup', (e) => {
            if (this.prompter.show)
                e.keyCode === 13
                    ? this.submit()
                    : e.keyCode === 27
                        ? this.cancel()
                        : null;
        });
    }
    cancel() {
        this.prompter = Object.assign(Object.assign({}, this.prompter), { show: false });
        this.prompter.reject(null);
    }
    submit() {
        this.prompter = Object.assign(Object.assign({}, this.prompter), { show: false });
        this.prompter.resolve(this.input);
    }
    update(e) {
        this.input = e.target.value.toUpperCase();
    }
    render() {
        return (h("div", { class: "prompt-wrapper", style: this.prompter.show ? null : { display: 'none' } },
            h("div", { class: "prompt" },
                this.prompter.message ? h("p", null, this.prompter.message) : null,
                this.prompter.options
                    ? h("div", { class: "select-wrapper" },
                        h("select", { onInput: (e) => this.update(e) }, this.prompter.options.map((option) => h("option", { value: `${option.code}:${option.issuer}`, selected: this.input === `${option.code}:${option.issuer}` }, option.code))))
                    : h("input", { type: this.prompter.type, placeholder: this.prompter.placeholder, value: this.input, onInput: (e) => this.update(e), style: this.prompter.type === 'password' ? { 'font-size': '18px' } : null }),
                h("div", { class: "actions" },
                    h("button", { class: "cancel", type: "button", onClick: () => this.cancel() }, "Cancel"),
                    h("button", { class: "submit", type: "button", onClick: () => this.submit() }, "OK")))));
    }
    static get is() { return "stellar-prompt"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["prompt.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["prompt.css"]
    }; }
    static get properties() { return {
        "prompter": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "Prompter",
                "resolved": "Prompter",
                "references": {
                    "Prompter": {
                        "location": "local"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "input": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "prompter",
            "methodName": "watchHandler"
        }]; }
}
