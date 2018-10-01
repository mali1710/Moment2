const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const watch = require("gulp-watch");


/*Flytta HTML-filer*/
gulp.task("html", function(){
    return gulp.src("src/*.html")
        .pipe(gulp.dest("pub/"))
});

/*Sammanslå och minifiera JavaScript*/
gulp.task("convertjs", function(){
    return gulp.src("src/js/*.js")
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("pub/js"));
});

/*Uppdateringskoll med gulptillägget gulp-watch*/
gulp.task("watcher", function(){
    watch("src/js/*.js", function(){
        gulp.start("convertjs");
    });
    watch("src/*.html", function(){
        gulp.start("html");
    });
})

gulp.task("default", ["html", "convertjs", "watcher"]);