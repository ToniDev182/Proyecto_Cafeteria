const { src, dest, watch, series } = require('gulp');


// CSS Y SASS
const sass = require('gulp-sass')(require('sass')); // Usando gulp-sass con node-sass
const postcss = require('gulp-postcss'); // Necesario para PostCSS
const autoprefixer = require('autoprefixer'); // Autoprefixer como plugin de PostCSS
const sourcemaps = require('gulp-sourcemaps'); //Nos dice en que archivo de sass se encuentra el codigo original
const cssnano = require('cssnano'); //

// // IMAGENES  
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Compila SCSS a CSS 
function css() {
    return src('src/scss/**/*.scss') // Busca todos los archivos .scss en la carpeta
        .pipe(sourcemaps.init()) // inicia el sourcemap
        .pipe(sass().on('error', sass.logError)) // Compila SCSS y maneja errores
        .pipe(postcss([autoprefixer(), cssnano()])) // Usa autoprefixer como plugin de postcss // usa la dependencia css nano para optimizar codigo css
        .pipe(sourcemaps.write('.'))  //  grabamos el sourcemap
        .pipe(dest('build/css')); // Guarda el resultado en build/css
}


function imagenes() {

    return src('src/img/**/*') // todos los archivos * Carga todas las imagenes
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))

}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png, jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png, jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img')) 
}


// Observa cambios en los archivos SCSS
function dev() {
    watch('src/scss/**/*.scss', css); // Observa todos los archivos SCSS //integra los cambios
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
/* exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif; */
exports.default = series(/* imagenes, versionAvif, versionWebp, */ css, dev);


// series - se inicia una tarea, y hasta que finaliza , inicia la siguiente
// parallel - Todas inician al mismo tiempo


