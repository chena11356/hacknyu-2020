export interface Prompter {
    show: boolean;
    type?: string;
    message?: string;
    placeholder?: string;
    options?: Array<any>;
    resolve?: Function;
    reject?: Function;
}
export declare class Prompt {
    private element;
    prompter: Prompter;
    private input;
    watchHandler(newValue: Prompter, oldValue: Prompter): void;
    componentDidLoad(): void;
    cancel(): void;
    submit(): void;
    update(e: any): void;
    render(): any;
}
