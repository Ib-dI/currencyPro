import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: '/currencyPro/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                results: resolve(__dirname, "results.html"),
            },
        },
        target: "es2020", // ou un niveau plus récent si vous utilisez des fonctionnalités modernes
    },
});
