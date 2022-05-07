const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

gulp.task('clean', () => {
  return gulp
    .src(['lib'], {
      allowEmpty: true,
    })
    .pipe($.clean());
});

gulp.task('ts', () => {
  return gulp
    .src(['src/**/*.{ts,tsx}', '!src/**/*.test.*'])
    .pipe($.typescript.createProject('tsconfig.json')())
    .pipe(gulp.dest('lib'));
});

gulp.task('js', () => {
  return gulp
    .src(['lib/**/*.{js,jsx}'])
    .pipe(
      $.babel({
        sourceMap: true,
        presets: ['@babel/preset-env'],
        plugins: ['lodash'],
      }),
    )
    .pipe(
      $.terser({
        parse: {
          ecma: 8,
        },
        compress: {
          pure_funcs: ['console.log', 'console.info'],
          ecma: 5,
          warnings: false,
          // turn off flags with small gains to speed up minification
          arrows: false,
          collapse_vars: false,
          comparisons: false,
          computed_props: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          inline: false,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          switches: false,
          toplevel: false,
          typeofs: false,
          // a few flags with noticable gains/speed ratio
          // numbers based on out of the box vendor bundle
          booleans: true,
          if_return: true,
          sequences: true,
          unused: true,
          // required features to drop conditional branches
          conditionals: true,
          dead_code: true,
          evaluate: true,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      }),
    )
    .pipe(gulp.dest('lib'));
});

gulp.task('copy', () => {
  return gulp.src(['src/**/*.{mustache,d.ts}']).pipe(gulp.dest('lib'));
});

gulp.task('default', gulp.series('clean', 'ts', gulp.parallel('js', 'copy')));
