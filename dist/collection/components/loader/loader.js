import Combinatorics from 'js-combinatorics';
import { h } from "@stencil/core";
import { isEqual as loIsEqual, sample as loSample } from 'lodash-es';
export class Loader {
    constructor() {
        this.chances = [];
        this.chance = null;
    }
    componentWillLoad() {
        return new Promise((resolve) => {
            if (!this.chances.length)
                this.generateChances(9);
            if (!this.interval)
                this.interval = setInterval(() => this.getChance(), 100);
            resolve();
        });
    }
    generateChances(int) {
        const baseN = Combinatorics.baseN([0, 1], int);
        this.chances = baseN.toArray();
        this.getChance();
    }
    getChance() {
        const chance = loSample(this.chances);
        if (loIsEqual(chance, this.chance))
            this.getChance();
        else
            this.chance = chance;
    }
    render() {
        return (h("div", { class: "loader" }, this.chance.map((int, i) => h("div", { class: int ? 'on' : null, key: `${int}${i}` }))));
    }
    static get is() { return "stellar-loader"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["loader.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["loader.css"]
    }; }
    static get properties() { return {
        "interval": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "interval",
            "reflect": false
        }
    }; }
    static get states() { return {
        "chances": {},
        "chance": {}
    }; }
}
