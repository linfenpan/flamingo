var gulp  = require("gulp");
var prefixer = require("./plugin/gulp-prefixer");

gulp.task("default", function(){
    console.log("*********** 默认处理任务 ***********");
    gulp.src("dev/*.js")
        .pipe(prefixer("/* by da宗熊 */\n"))
        .pipe(gulp.dest("js"));
});
