let mix = require("laravel-mix")
let path = require("path")

require( 'laravel-mix-tailwind' )

mix.setPublicPath( path.resolve( "./" ) )
mix.js("assets/scripts/app.js", "assets/build");
mix.sass("assets/styles/app.scss", "assets/build");
mix.tailwind();
mix.browserSync({
    proxy: "matthiasbenoit-portfolio.local",
    host: "matthiasbenoit-portfolio.local",
    injectChanges: false,
    files: ["./assets/build", "./views"],
    port: 8080,
    open: true // Mettre à "true" pour ouvrir un onglet automatiquement (http://localhost:8080)
});
mix.version();
