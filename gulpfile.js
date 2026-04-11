//подключение с помощью ES Modules, в package.json прописывается поле "type": "module"
import gulp from 'gulp'; //подключение gulp, основной движок
import less from 'gulp-less'; //подключение gulp-less, компиляция LESS в CSS
import rename from 'gulp-rename'; //подключение gulp-rename, переименование файлов
import cleanCSS from 'gulp-clean-css'; //подключение gulp-clean-css, минификация CSS
import babel from 'gulp-babel'; //подключение gulp-babel, транспиляция JS
import concat from 'gulp-concat'; //подключение gulp-concat, объединение JS
import uglify from 'gulp-uglify'; //подключение gulp-uglify, минификация JS
import {deleteAsync} from 'del'; //подключение del, удаление файлов и папок

//настройка путей до файлов в которых будем работать
const paths = {
    styles: {
        src: 'src/styles/**/*.less', // путь где будет разработка -откуда
        dest: 'dist/css/'// каталог назначения финальной версии -куда
    },
    scripts: {
        src: 'src/scripts/**/*.js', // путь где будет разработка -откуда
        dest: 'dist/js/'// каталог назначения финальной версии -куда
    }
}


//создаем асинхронную функцию для очистки каталога dist
async function clean() {
    await deleteAsync(['dist']); //['dist'] - папка и все содержимое; 
    // ['dist/**', '!dist'] - только файлы, но не папку
}

//создаем функцию для обработки стилей
function styles() {
    return gulp.src( paths.styles.src ) //из объекта paths, каталог styles
    .pipe(less()) // Компиляция, преобразование в css LESS → CSS
    .pipe(cleanCSS()) // Минификация
    .pipe(rename({ // Переименование
        basename: 'main', // новое имя
        suffix: '.min' // новое расширение
    })) 
    .pipe(gulp.dest(paths.styles.dest)) // Запись
}

//создаем функцию для обработки скриптов
function scripts() {
    return gulp.src( paths.scripts.src, { //из объекта paths, каталог scripts
        sourcemaps: true // включение карты
    } )
    .pipe(babel({ // Преобразование современный ES6 → старый ES5 JS
        presets: ['@babel/env'] // правила преобразования
    }))
    .pipe(concat('main.js')) // Объединение всех JS файлов
    .pipe(uglify())          // Минификация
    .pipe(rename({ basename: 'main', suffix: '.min' })) // Переименование
    .pipe(gulp.dest(paths.scripts.dest)); // Запись
}

//создаем функцию для отслеживания изменений
function watch() {
    //что мы хотим ослеживать, указать путь и задачу 
    gulp.watch( paths.styles.src, styles) //каталог: styles, должна выполнится задача: styles
    gulp.watch( paths.scripts.src, scripts) //каталог: scripts, должна выполнится задача: scripts
}

//функция для последовательного выполнения задач
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch); 

export { clean }; //вызов команды для выполнения функции clean,ввод в командной строке:gulp clean
export { styles }; //вызов команды для выполнения функции styles: gulp styles
export { scripts }; //вызов команды для выполнения функции scripts: gulp scripts
export { watch }; //вызов команды для выполнения функции watch: gulp watch
export { build }; // вызов команды для выполнения build: gulp build
export default build; // Экспорт по умолчанию вызывается командой: gulp