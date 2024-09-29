import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/tailwind-config/tailwind.config";

console.log(sharedConfig);

const config: Pick<Config, "content" | "presets"> = {
    content: [
        "./app/**/*.tsx",
        // "./components/**/*.tsx",
        // "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    presets: [sharedConfig]
};

export default config;
