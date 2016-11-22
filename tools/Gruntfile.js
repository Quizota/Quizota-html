// NOTE:
// To combine all js files, remember to remove these lines:
// 'js/script.js',
// '!<%= distDir %>/js/script.js',
// and edit the html files at line:
// <!-- _build:js js/regeringen.js -->


module.exports = function(grunt) {

	"use strict";

	// require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-rev');




	grunt.initConfig({

		devDir: '../www-dev',
		distDir: '../www',

		clean: {
			options: { force: true },
			dist: [
				'.tmp',
				'<%= distDir %>/css/',
				'<%= distDir %>/fonts/',
				'<%= distDir %>/img/',
				'<%= distDir %>/js/',
				'<%= distDir %>/*.html'
			]
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= devDir %>',
					dest: '<%= distDir %>/',
					src: [
						'sink.html',
						'*.php',
						'*.{ico,png,jpg,gif,txt,xml}',
						'.htaccess',
						'img/**/*',
						'images/**/*',
						// 'css/fontface.css',
						'fonts/*.{woff,eot,ttf,svg}',
						// 'js/script.js',
						'data/**/*',
						// 'js/**/*'
						'js/*.js'
					]
				},
				{
					expand: true,
					dot: true,
					cwd: '.tmp/concat/',
					dest: '<%= distDir %>/',
					src: [
						'css/**/*'
					]
				}]
			},
			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= devDir %>',
					dest: '<%= distDir %>/',
					src: [
						'sink.html',
						'*.php',
						'*.{ico,png,jpg,gif,txt,xml}',
						'.htaccess',
						'img/{,*/}*.{jpg,jpeg,png,gif,webp,cur}',
						'images/{,*/}*.{jpg,jpeg,png,gif,webp,cur}',
						// 'css/fontface.css',
						'fonts/*.{woff,eot,ttf,svg}',
						'data/**/*'
					]
				},
				{
					expand: true,
					dot: true,
					cwd: '.tmp/concat/',
					dest: '<%= distDir %>/',
					src: [
						'css/**/*',
						'js/**/*'
					]
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					// removeCommentsFromCDATA: true,
					// // https://github.com/yeoman/grunt-usemin/issues/44
					// //collapseWhitespace: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= devDir %>',
					src: ['*.html', 'template/**/*.html'],
					dest: '<%= distDir %>'
				}]
			}
		},
		svgmin: {
			options: {
				plugins: [
					{removeViewBox: false}
					// {removeUselessStrokeAndFill: false},
					// {
					// 	convertPathData: {
					// 		straightCurves: false // advanced SVGO plugin option
					// 	}
					// },
					// {removeRasterImages:true}
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= devDir %>/img',
					src: '**/*.svg',
					dest: '<%= distDir %>/img'
				},
				{
					expand: true,
					cwd: '<%= devDir %>/images',
					src: '**/*.svg',
					dest: '<%= distDir %>/images'
				}]
			}
		},
		// imagemin: {                          // Task
		// 	// static: {                          // Target
		// 	//   options: {                       // Target options
		// 	//     optimizationLevel: 3,
		// 	//     svgoPlugins: [{ removeViewBox: false }],
		// 	//     use: [mozjpeg()]
		// 	//   },
		// 	//   files: {                         // Dictionary of files
		// 	//     'dist/img.png': 'src/img.png', // 'destination': 'source'
		// 	//     'dist/img.jpg': 'src/img.jpg',
		// 	//     'dist/img.gif': 'src/img.gif'
		// 	//   }
		// 	// },
		// 	dynamic: {                         // Another target
		// 	  // options: {                       // Target options
		// 	  //   optimizationLevel: 3,
		// 	  // },
		// 	  files: [{
		// 		expand: true,
		// 		cwd: '<%= devDir %>',
		// 		src: ['img/**/*.png'],
		// 		dest: '<%= distDir %>'
		// 	  }]
		// 	}
		// },
		uglify: {
			options:{
				compress: true,
				mangle: true
			},
			// dev: {
			// 	files: [
			// 		{
			// 			src: '<%= distDir %>/js/conditional-resource/*.js',  // source files mask
			// 			dest: '<%= distDir %>/js/conditional-resource/',    // destination folder
			// 			expand: true,    // allow dynamic building
			// 			flatten: true,   // remove all unnecessary nesting
			// 			// ext: '.min.js'   // replace .js to .min.js
			// 		}
			// 	],
			// 	options:{
			// 		compress: true,
			// 		mangle: false
			// 	}
			// },
			dist: {
				files: [
					// {
					// 	src: '<%= distDir %>/js/conditional-resource/*.js',  // source files mask
					// 	dest: '<%= distDir %>/js/conditional-resource/',    // destination folder
					// 	expand: true,    // allow dynamic building
					// 	flatten: true,   // remove all unnecessary nesting
					// 	// ext: '.min.js'   // replace .js to .min.js
					// }
				]
			}
		},
		concurrent: {
			dev: [
				'newer:sass'
				// 'sass'
			],
			dist: [
				'sass',
				'svgmin',
				// 'imagemin',
				'htmlmin'
			]
		},
		useminPrepare: {
			// html: '<%= devDir %>/index.html',
			html: ['<%= devDir %>/{,*/}*.html'],
			options: {
				dest: '<%= distDir %>'
			}
		},
		usemin: {
				// html: '<%= distDir %>/index.html'
				html: ['<%= distDir %>/{,*/}*.html']
		},
		browserSync: {
			dev: {
				bsFiles: {
					src : ['<%= devDir %>/**/*.html', '<%= devDir %>/**/*.js', '<%= devDir %>/**/*.css']
				},
				options: {
					watchTask: true,
					browser: "chrome",
					ports: {
						min: 3003,
						max: 3005
					},
					ghostMode: {
						clicks: false,
						scroll: false,
						links: false, // must be false to avoid interfering with angular routing
						forms: false
					},
					server: {
						baseDir: "<%= devDir %>"
					}
				}
			}
		},
		// jshint: {
		// 	options: {
		// 		jshintrc: '.jshintrc'
		// 	},
		// 	all : {
		// 		src : ['<%= devDir %>/js/**/*.js']
		// 	}
		// },
		rev: {
			dist: {
				files: {
					src: [
						'<%= distDir %>/js/{,*/}*.js',
						'!<%= distDir %>/js/script.js',
						'<%= distDir %>/css/{,*/}*.css'/*,
						'!<%= distDir %>/css/fontface.css'*/
					]
				}
			}
		},
		watch: {
			options : {
				interrupt: true
			},
			// js: {
			// 	files: ['<%= devDir %>/js/**/*.js'],
			// 	tasks: ['newer:jshint' ]
			// },
			// html : {
			// 	files: ['<%= devDir %>/**/*.html']
			// },
			// css: {
			// 	files: ['<%= devDir %>/css/**/*.css']
			// },
			sass: {
				files: ['<%= devDir %>/scss/**/*.scss'],
				tasks: ['sass:dev']
			}
		},
		sass: {
			options: {
				sourceMap: true,
				sourceComments: false,
				includePaths: [
					'<%= devDir %>/vendor/bootstrap-sass/assets/stylesheets',
					'<%= devDir %>/vendor/bootstrap-sass/assets/stylesheets/bootstrap',
					//'<%= devDir %>/vendor/animate.scss/source',
					'<%= devDir %>/vendor/animate-sass'
				],
				// outputStyle: 'compressed' , nested, 'expanded' ,  'compact'
				outputStyle: 'compressed'
			},
			dev: {
				files: {
					'<%= devDir %>/css/style.css': '<%= devDir %>/scss/style.scss'/*,
					'<%= devDir %>/css/fontface.css': '<%= devDir %>/scss/fontface.scss'*/
				}
				// files: [{
				// 	expand: true,
				// 	cwd: '<%= devDir %>/scss/',
				// 	src: [
				// 		'**/*.scss',
				// 		'!**/_*.scss'
				// 	],
				// 	dest: '<%= devDir %>/css/',
				// 	ext: '.css'
				// }]
			}
		},
		connect: {
			// test : {
			// 	options: {
			// 		port: 8887,
			// 		base: '<%= devDir %>',
			// 		keepalive: false,
			// 		livereload: false,
			// 		open: false
			// 	}
			// },
			dist: {
				options: {
					port: 3002,
					hostname: 'localhost',
					base: '<%= distDir %>',
					keepalive: true,
					livereload: false,
					open: true
				}
			}
		}
	});


	grunt.registerTask('dev', ['concurrent:dev', 'browserSync', 'watch']);
	grunt.registerTask('build', [
		'clean',
		'useminPrepare',
		'concurrent:dist',
		'concat',
		'copy:dist',
		'uglify',
		// 'rev',
		'usemin'
	]);
	grunt.registerTask('buildquick', [
		'clean',
		'useminPrepare',
		'concurrent:dist',
		'concat',
		'copy:dev',
		// 'rev',
		'usemin'
	]);

};