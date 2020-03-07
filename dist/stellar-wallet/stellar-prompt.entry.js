import { r as registerInstance, h, c as getElement } from './core-a2a3688f.js';
import { i as loDefer } from './lodash-abc806aa.js';

const Prompt = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
        return (h("div", { class: "prompt-wrapper", style: this.prompter.show ? null : { display: 'none' } }, h("div", { class: "prompt" }, this.prompter.message ? h("p", null, this.prompter.message) : null, this.prompter.options
            ? h("div", { class: "select-wrapper" }, h("select", { onInput: (e) => this.update(e) }, this.prompter.options.map((option) => h("option", { value: `${option.code}:${option.issuer}`, selected: this.input === `${option.code}:${option.issuer}` }, option.code))))
            : h("input", { type: this.prompter.type, placeholder: this.prompter.placeholder, value: this.input, onInput: (e) => this.update(e), style: this.prompter.type === 'password' ? { 'font-size': '18px' } : null }), h("div", { class: "actions" }, h("button", { class: "cancel", type: "button", onClick: () => this.cancel() }, "Cancel"), h("button", { class: "submit", type: "button", onClick: () => this.submit() }, "OK")))));
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "prompter": ["watchHandler"]
    }; }
    static get style() { return "\@charset \"UTF-8\";\n/* $font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;\n$font-mono: monospace;\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n} */\n/* HTML5 display-role reset for older browsers */\n/* article, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol, ul {\n  list-style: none;\n}\nblockquote, q {\n  quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \'\';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n* {\n  box-sizing: border-box;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: $font-family;\n  font-size: 15px;\n  outline: none;\n  appearance: none;\n  border-radius: 0;\n}\ninput,\nselect,\nbutton {\n  height: 30px;\n} */\nbutton {\n  border: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  position: relative;\n  background-color: #3279fc;\n  color: white;\n  margin: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  justify-items: center;\n  padding: 0 10px;\n  cursor: pointer;\n}\nbutton.loading {\n  color: transparent;\n  pointer-events: none;\n}\nbutton.small {\n  font-size: 12px;\n  height: 20px;\n}\n\n:host {\n  display: block;\n  font-size: 15px;\n}\n:host .prompt-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  min-height: 100vh;\n  min-width: 100vw;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n:host .prompt {\n  background-color: white;\n  padding: 20px;\n  max-width: 350px;\n  width: 100%;\n  position: relative;\n}\n:host .prompt p {\n  margin-bottom: 10px;\n}\n:host .prompt input {\n  width: 100%;\n  margin: 0;\n  padding: 5px;\n  outline: none;\n  border: 1px solid black;\n  text-transform: uppercase;\n}\n:host .prompt input:focus {\n  border-color: #3279fc;\n}\n:host .select-wrapper {\n  position: relative;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n:host .select-wrapper select {\n  border-color: #3279fc;\n  padding: 0 10px;\n  min-width: 100px;\n}\n:host .select-wrapper:after, :host .select-wrapper:before {\n  font-size: 12px;\n  position: absolute;\n  right: 10px;\n  color: green;\n}\n:host .select-wrapper:after {\n  content: \"◀\";\n  top: calc(50% - 5px);\n  -webkit-transform: translate(0, -50%) rotate(90deg);\n  transform: translate(0, -50%) rotate(90deg);\n}\n:host .select-wrapper:before {\n  content: \"▶\";\n  top: calc(50% + 5px);\n  -webkit-transform: translate(0, -50%) rotate(90deg);\n  transform: translate(0, -50%) rotate(90deg);\n}\n:host .actions {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  margin-top: 10px;\n}\n:host .actions button {\n  margin: 0;\n  min-width: 50px;\n}\n:host .actions .cancel {\n  background: none;\n  border: 1px solid #3279fc;\n  color: #3279fc;\n}\n:host .actions .submit {\n  margin-left: 10px;\n}"; }
};

export { Prompt as stellar_prompt };
