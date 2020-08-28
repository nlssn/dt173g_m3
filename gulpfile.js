/* Load the required modules */
const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulpSass = require('gulp-sass');

/* Set up SASS default compiler */
sass.compiler = require('node.sass');

/* Set paths as consts for easy access */
const htmlPath = 'src/*html';
const sassPath = 'src/assets/sass/**/*.scss';
const cssPath = 'src/assets/css/**/*.css';
const scriptsPath = 'src/assets/js/**/*.js';
const imagesPath = 'src/assets/images/*';

/*
 * TASK: Clean
 * Removes the dist folder
 */
function clean() {
   return del(['dist/']);
}

/*
 * TASK: html
 * Move all HTML files to dist, then tell bSync to refresh.
 */
function html() {
   return src(htmlPath)
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
}

/*
 * TASK: sass
 * Transpile SASS files to CSS.
 * Place new files in cssPath, which will trigger css task.
 */

function sass() {
   return src(sassPath)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(dest(cssPath));
}

/*
 * TASK: css
 * First concatenate all CSS files into one file.
 * Use postcss to simoultaneously;
 *  - add vendor prefixes with autoprefixer
 *  - minify the code with cssnano
 * Then move the new file to dist.
 * Finally tell bSync to inject the new styles.
 */
function css() {
   return src(cssPath)
      .pipe(concat('global.css'))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(dest('dist/assets/css'))
      .pipe(browserSync.stream());
}

/*
 * TASK: scripts
 * First concatenate all JS files into one file.
 * Use terser to minify the code.
 * Then move the new file to dist.
 * Finally tell bSync to inject the new scripts.
 */
function scripts() {
   return src(scriptsPath)
      .pipe(concat('global.js'))
      .pipe(terser())
      .pipe(dest('dist/assets/js'))
      .pipe(browserSync.stream());
}

/*
 * TASK: images
 * Use imagemin to compress all available images.
 * Move all image files to dist, then tell bSync to refresh.
 */
function images() {
   return src(imagesPath)
      .pipe(imagemin())
      .pipe(dest('dist/assets/images'))
      .pipe(browserSync.stream());
}

/*
 * TASK: serve
 * Initialize bSync to start serving files from dist folder.
 * Watch all folders and do their respective task if any files are changed.
 */
function serve() {
   browserSync.init({
      server: 'dist/'
   });
   
   watch([htmlPath], { intervall: 1000 }, html);
   watch([sassPath], { intervall: 1000 }, sass);
   watch([cssPath], { intervall: 1000 }, css);
   watch([scriptsPath], {intervall: 1000 }, scripts);
   watch([imagesPath], {intervall: 1000 }, images);
}

/* Export all public tasks - type gulp <task> to use */
exports.clean = clean;
exports.html = html;
exports.css = css;
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;

/* Export default command - type gulp to use */
exports.default = series(clean, parallel(html, css, scripts, images), serve);