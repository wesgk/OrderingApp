module.exports = function(config){
  config.set({

    basePath : 'app',

    files : [
      'lib/angular/angular.js',
      'lib/angular/angular-*.js',
      '../test/lib/angular-mocks.js',
      '../test/lib/sinon-1.15.0.js',
      'js/app.js',
      'js/controllers/*.js',
      //'js/directives/*.js',
      'js/services/*.js',
      //'../test/unit/*.js'
      //'../test/unit/OrderListControllerSpec.js'
      // '../test/unit/UserListControllerSpec.js',
      '../test/unit/EditOrderControllerSpec.js'
      //'../test/unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    shim: {"angular-mocks": {deps:["angular", "boot"], exports: "angular.mock"}},

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
