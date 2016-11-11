'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
      yeoman.generators.Base.apply(this, arguments);
  
      this.option('name', {
            type: String,
            required: true,
            desc: 'Project name'
          });

    },

  // prompting: function () {
  //   var done = this.async();
  //
  //   done();
  // },
  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.options.name
        }
      );
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'), {
          name: this.options.name
        }
      );
      this.fs.copyTpl(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore'), {
          name: this.options.name
        }
      );
    },

    // Copy application files
    app: function() {

      // Empty folders
      // mkdirp.sync(path.join(this.destinationPath() , 'logs'));
      mkdirp.sync(path.join(this.destinationRoot(), 'logs'));

      // Server file
      this.fs.copyTpl(
        this.templatePath('_server.js'),
        this.destinationPath('server.js'),
        this.destinationPath('/views/index.ejs'), {
          name: this.options.name
        }
      );
    }
  },
  install: function () {
    this.installDependencies();
  }
});
