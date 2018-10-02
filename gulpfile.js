const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const watch = require("gulp-watch");
const cleanCSS = require("gulp-clean-css");
const concatCSS = require("gulp-concat-css");
const imagemin = require('gulp-imagemin');


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

/*Sammanslå och minifiera CSS-filer*/
gulp.task("convertcss", function(){
    return gulp.src("src/css/*.css")
        .pipe(concatCSS("main.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("pub/css"));
});

/*Minifiera bilder*/
gulp.task('convertimg', function(){
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('pub/images'));
});


/*Uppdateringskoll med gulptillägget gulp-watch*/
gulp.task("watcher", function(){
    watch("src/js/*.js", function(){
        gulp.start("convertjs");
    });

    watch("src/*.html", function(){
        gulp.start("html");
    });
    watch("src/css/*.css", function(){
        gulp.start("convertcss");
    });
watch("src/images/*", function(){
        gulp.start("convertimg");
})

});

gulp.task("default", ["html", "convertjs", "convertcss", "convertimg", "watcher"]);