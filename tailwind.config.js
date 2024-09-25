/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {gridTemplateColumns: {
            "menu": "176px 1fr 300px"
            },
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
