//подключение с помощью ES Modules, в package.json прописывается поле "type": "module"
import gulp from 'gulp'; //подключение gulp, основной движок
import * as dartSass from 'sass';  // импортируем компилятора Sass
import gulpSass from 'gulp-sass'; //подключение SASS, установка: sass-движок + gulp-sass-плагин
import rename from 'gulp-rename'; //подключение gulp-rename, переименование файлов
import cleanCSS from 'gulp-clean-css'; //подключение gulp-clean-css, минификация CSS
import babel from 'gulp-babel'; //подключение gulp-babel + @babel/core-двигатель, +@babel/preset-env-правила, транспиляция JS
import concat from 'gulp-concat'; //подключение gulp-concat, объединение JS
import uglify from 'gulp-uglify'; //подключение gulp-uglify, минификация JS
import sourcemaps from 'gulp-sourcemaps'; // для отладки кода
import autoprefixer from 'gulp-autoprefixer'; // авто добавление нужных префиксов
import imagemin from 'gulp-imagemin'; // сжатие и оптимизация изображений
import htmlmin from 'gulp-htmlmin'; // минификация HTML
import size from 'gulp-size'; // информация размеры файлов
import newer from 'gulp-newer'; // отслеживает только новые файлы
import browserSync from 'browser-sync'; // локальный сервер
import {deleteAsync} from 'del'; //подключение del, удаление файлов и папок

const sass = gulpSass(dartSass);  // связываем компилятор и плагин

//настройка путей до файлов в которых будем работать
const paths = {
    html: {
        src: 'src/*.html', // путь где будет разработка -откуда
        dest: 'dist'// каталог назначения финальной версии -куда
    },
    styles: {
        src: ['src/styles/**/*.sass', 'src/styles/**/*.scss'], // путь где будет разработка -откуда
        dest: 'dist/css/'// каталог назначения финальной версии -куда
    },
    scripts: {
        src: 'src/scripts/**/*.js', // путь где будет разработка -откуда
        dest: 'dist/js/'// каталог назначения финальной версии -куда
    },
    images: {
        src: 'src/img/**',
        dest: 'dist/img/'
    }
}

//создаем асинхронную функцию для очистки каталога dist
async function clean() {
    await deleteAsync(['dist/*', '!dist/img']); //['dist'] - очистить всё содержимое, кроме img; 
    // ['dist/**', '!dist'] - только файлы, но не папку
}

//создаем функцию для работы с HTML
function html() {
    return gulp.src(paths.html.src)
    .pipe(htmlmin( { collapseWhitespace: true } ))  // запуск минификации
    .pipe(size( {
        showFiles: true // опции
    } )) // инфо размер файла
    .pipe(gulp.dest(paths.html.dest)) // путь для сохранения результата
    .pipe(browserSync.stream()); // вызов сервер
}

//создаем функцию для обработки стилей
function styles() {
    return gulp.src( paths.styles.src ) //из объекта paths, каталог styles
    .pipe(sourcemaps.init()) //начало, карта для отладки кода
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({   // автопрефиксы
        cascade: false,       // форматирование: Компактно, без выравнивания
        overrideBrowserslist: ['> 1%', 'last 2 versions'] // браузеры, доля рынка более 1%, версии
    }))
    .pipe(cleanCSS()) // Минификация
    .pipe(rename({ // Переименование
        basename: 'main', // новое имя
        suffix: '.min' // новое расширение
    }))
    .pipe(sourcemaps.write('.')) //конец, карта для отладки кода
    .pipe(size( {
        showFiles: true // опции
    } )) // инфо размер файла
    .pipe(gulp.dest(paths.styles.dest)) // Запись
    .pipe(browserSync.stream()); // вызов сервер
}

//создаем функцию для обработки скриптов
function scripts() {
    return gulp.src( paths.scripts.src, { //из объекта paths, каталог scripts
        sourcemaps: true // включение карты
    } )
    .pipe(sourcemaps.init()) //начало, карта для отладки кода
    .pipe(babel({ // Преобразование современный ES6 → старый ES5 JS
        presets: ['@babel/env'] // правила преобразования
    }))
    .pipe(concat('main.js')) // Объединение всех JS файлов
    .pipe(uglify())          // Минификация
    .pipe(rename({ basename: 'main', suffix: '.min' })) // Переименование
    .pipe(sourcemaps.write('.')) //конец, карта для отладки кода
    .pipe(size( {
        showFiles: true // опции
    } )) // инфо размер файла
    .pipe(gulp.dest(paths.scripts.dest)) // Запись
    .pipe(browserSync.stream()); // вызов сервер
}

//создаем функцию для работы с изображениями
function img() {
    return gulp.src(paths.images.src, { // путь к исходным изображениям
        encoding: false // Без encoding: false, Gulp по умолчанию читает файлы как строки (UTF-8)
    })
    .pipe(newer(paths.images.dest)) // отслеживание, будет работать только с новыми файлами
    .pipe(imagemin())     // запуск оптимизации
    .pipe(size( {
        showFiles: true // опции
    } )) // инфо размер файла
    .pipe(gulp.dest(paths.images.dest)); // путь для сохранения результата
}

//создаем функцию для отслеживания изменений
function watch() {
    browserSync.init({ // инициализация
        server: {
            baseDir: "./dist/"
        }
    })
    //что мы хотим ослеживать, указать путь и задачу 
    gulp.watch( paths.html.dest).on('change', browserSync.reload) //настройка сервера
    gulp.watch( paths.html.src, html) //настройка сервера
    gulp.watch( paths.styles.src, styles) //каталог: styles, должна выполнится задача: styles
    gulp.watch( paths.scripts.src, scripts) //каталог: scripts, должна выполнится задача: scripts
    gulp.watch( paths.images.src, img) // отслеживание изображений
}

//функция для последовательного выполнения задач
const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch);

export { clean }; //вызов команды для выполнения функции clean,ввод в командной строке:gulp clean
export { img }; //вызов команды для выполнения функции img,ввод в командной строке:gulp img
export { html }; //вызов команды для выполнения функции htmlmin,ввод в командной строке:gulp html
export { styles }; //вызов команды для выполнения функции styles: gulp styles
export { scripts }; //вызов команды для выполнения функции scripts: gulp scripts
export { watch }; //вызов команды для выполнения функции watch: gulp watch
export { build }; // вызов команды для выполнения build: gulp build
export default build; // Экспорт по умолчанию вызывается командой: gulp