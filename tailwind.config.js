/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html","./results.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brands: "#355FE5",
                dark: "#OA112F"
            },
        },
    },
    plugins: [require('tailwindcss-pseudo')({
        empty: true, // Permet l'utilisation de :empty
        // Ajoute la classe not-first-child
        notFirst: true,
    })],
};
