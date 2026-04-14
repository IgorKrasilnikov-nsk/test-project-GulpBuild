# Простая тестовая сборка Gulp
С помощью этих файлов можно быстро настроить сборку проекта на Gulp.

## Input
|| HTML | Styles | Scripts | Images |
|:---|:------:|:-----:|:----:|:-----:|
| **Каталог** | src/ | src/styles/ | src/scripts/ | src/img/ |
| **Расширение** | .html | .css, .sass, .scss | .js | .jpg, .png, .gif |

## Output
|| HTML | CSS | JavaScript | Images |
|:---|:------:|:-----:|:----:|:-----:|
| **Путь** | dist/ | dist/css/style.min.css | dist/js/main.min.js | dist/img/ |

## Инструкция:
1. Скачать все файлы в любую директорию
2. Ввести в терминале команду: npm i (должен быть установлен node.js)
3. Выполнить команду: gulp (запуск таска default)
4. Писать свой код и наслаждаться автоматической сборкой проекта.

## Ссылки:
[Документация Gulp на русском языке](https://webdesign-master.ru/blog/docs/gulp-documentation.html?ysclid=mnu73e1p2358942648)

## Установленные NPM пакеты:
[gulp](https://www.npmjs.com/package/gulp) Таск-менеджер Gulp  
[sass](https://www.npmjs.com/package/sass) Компилятор Sass  
[gulp-sass](https://www.npmjs.com/package/gulp-sass) Компиляция Sass и Scss файлов  
[gulp-babel](https://www.npmjs.com/package/gulp-babel) Транспилер  
[@babel/core](https://www.npmjs.com/package/@babel/core) Ядро Babel  
[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) Пресет для компиляции Babel  
[gulp-concat](https://www.npmjs.com/package/gulp-concat) Объединение файлов в один  
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) Минификация и оптимизация JS кода  
[gulp-rename](https://www.npmjs.com/package/gulp-rename) Переименование файлов  
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) Минификация и оптимизация CSS файлов  
[del](https://www.npmjs.com/package/del) Безопасное удаление каталогов и файлов  
[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) Минификация HTML файлов  
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) Карта строк кода для инструментов  разработчика   
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) Автоматическое добавление префиксов в CSS   
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) Сжатие изображений   
[gulp-newer](https://www.npmjs.com/package/gulp-newer) Отслеживание только новых файлов  
[gulp-size](https://www.npmjs.com/package/gulp-size) Отображение информации о размерах файлов в терминале  
[browser-sync](https://browsersync.io/docs/gulp) Автоматическое обновление сайта при изменении файлов  