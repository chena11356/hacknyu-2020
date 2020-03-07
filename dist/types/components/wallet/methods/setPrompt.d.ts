interface setPrompt {
    message: string;
    placeholder: string;
    type: string;
    options: Array<any>;
}
export default function setPrompt({ message, placeholder, type, options }: setPrompt): Promise<string>;
export {};
