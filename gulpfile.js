//criar as variaveis que hospedarão as dependencias necessárias

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//criar as tarefas:

//compile sass & Inject into browser
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());

   
});


//move js to src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                     'node_modules/popper.js/dist/umd/popper.min.js' ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());              
});



//watch sass and serve
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./"
    });

    //continuous watchi command on sass to compile ad run everytime we save it
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


//mover a pasta de fonts para a src e o  css do fontawesome 
gulp.task('fonts', function (){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

gulp.task('fa', function (){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

//comando para iniciar todas as tasks
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);