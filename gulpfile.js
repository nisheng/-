/*
	项目的配置文件   记录的是项目的任务
*/

/*
	var 模块名 = require('模块名');
	
	声明任务  gulp.task(taskname,[依赖的任务],function(){})
	
	输入源(操作的文件路径): gulp.src(文件目录)

	输出： gulp.dest(输出路径);

	管道: pipe()  用于传输文件

*/

//引入gulp模块及其他模块
var gulp = require('gulp');

//copy单个文件
gulp.task('copyhtml',function(){
	gulp.src('src/index.html').pipe( gulp.dest('dist') );
});

//copy js目录下所有js文件
//gulp.task('copyjs',function(){
	//gulp.src('src/js/**/*.js').pipe( gulp.dest('dist/js') );
//});

//copy js目录中所有的文件
gulp.task('copyjs',function(){
	gulp.src('src/js/**/*').pipe( gulp.dest('dist/js') );
});

//copy src img中的所有png图片
gulp.task('copyPng',function(){
	gulp.src('src/img/*.png').pipe( gulp.dest('dist/img') );
});

//copy src img中的所有png和jpg图片
gulp.task('copyImg',function(){
	/*
		{}代表匹配集合，匹配的内容用 ， 分割
	*/
	gulp.src('src/img/*.{jpg,png}').pipe( gulp.dest('dist/img') );
});

//同时操作多个文件
gulp.task('copyData',function(){
	gulp.src(['src/json/**/*','src/xml/**/*'])
		.pipe( gulp.dest( 'dist/data' ) );
});



/*
	压缩图片
*/
var imgMin = require('gulp-imagemin');
gulp.task('imgMin',function(){
	gulp.src('src/img/*')
		.pipe( imgMin() ) //利用gulp-imagemin进行图片压缩
		.pipe( gulp.dest('dist/img') );
});

/*
	js压缩
*/
//引入需要用到的模块
var  jsMin  = require('gulp-uglify');
gulp.task('jsMin',function(){
	gulp.src('src/js/index.js')
		.pipe( jsMin() )
		.pipe( gulp.dest('dist/js/') );
});

/*
	编译sass及压缩css
*/
var css = require('gulp-sass-china'),
	notify = require('gulp-notify'),
    plumber = require('gulp-plumber');
gulp.task('cssMin',function(){
	gulp.src('src/scss/*.{scss,sass}')
		//异常处理
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		 }))
		.pipe( css({
			outputStyle: 'expanded' //输出格式  如果想压缩  改为 compressed
		}) ) //编译sass
		.pipe( gulp.dest('src/css') );
});

//监听（不能单独存在）  gulp只能运行任务
/*
	gulp.watch(监听目录,[任务集合]);
*/
gulp.task('scss',function(){
	gulp.watch('src/scss/*.{scss,sass}',['cssMin']);
});

/*
	服务
*/
var connect = require('gulp-connect');
gulp.task('server',function(){
	connect.server({
		root: 'src',   // 指定服务器的根目录
		livereload: true //是否支持重新加载
	});
});

/*

	自动刷新  （服务+监听）
*/
/*gulp.task('watch',function(){
	gulp.watch('src/index.html',function(){
		//当文件改动时，重新加载（刷新）
		gulp.src('src/index.html').pipe( connect.reload() );
	});
});*/
gulp.task('watch',function(){
	gulp.watch(['src/*.html','src/css/*.css','src/js/*'],function(){
		//当文件改动时，重新加载（刷新）
		gulp.src('src/index.html').pipe( connect.reload() );
	});
});
gulp.task('server-watch',['server','watch','scss']);
