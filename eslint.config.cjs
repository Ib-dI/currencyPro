module.exports = {
    root: true,
    extends: ["plugin:tailwindcss/recommended"],
    overrides: [
        {
            files: ["*.html", "*.blade.php"],
            parser: "@angular-eslint/template-parser",
        },
    ],
};
