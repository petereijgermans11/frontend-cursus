var gulp = require('gulp');
var reactEasy = require('gulp-react-easy');

gulp.task('build', () => reactEasy({
        file: 'src/js/index.jsx'
    })
        .to('bundle.js')
        .pipe(gulp.dest('./dist')));

gulp.task('copy_index_html', () => gulp.src('src/index.html').pipe(gulp.dest('./dist')));

gulp.task('watch_js', () => gulp.watch('src/js/**/*', ['build']));

gulp.task('watch_index_html', () => gulp.watch('src/index.html', ['copy_index_html']));

gulp.task('default', ['watch_js', 'watch_index_html', 'copy_index_html', 'build']);