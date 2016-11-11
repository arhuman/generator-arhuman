'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  // Configurations will be loaded here.
  // Ask for user input
  prompting: function() {

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the legendary ' + chalk.red('generator-arhuman') + ' generator!'
    ));

    var done = this.async();
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        // Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      {
        type: 'list',
        name: 'type',
        message: 'What do you want?',
        choices: [
              {
                name: 'Command line application',
                value: 'cli'
              },
              {
                name: 'Express app',
                value: 'express'
              },
              {
                name: 'ES2015 Class',
                value: 'class6'
              }
            ],
        // Defaults to the project's folder name if the input is skipped
        default: 'express'
      }
    ];
    this.prompt( prompts, function(answers) {
      this.props = answers;
      done();
    }.bind(this));
  },

  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function() {
      if (this.props.type == 'cli') {
        this.composeWith('arhuman:cli', { options: { name: this.props.name } }, { local: require.resolve('../cli') });
      } else if (this.props.type == 'class6') {
        this.composeWith('arhuman:class6', { options: { name: this.props.name } }, { local: require.resolve('../class6') });
      } else if (this.props.type == 'express') {
        this.composeWith('arhuman:express', { options: { name: this.props.name } }, { local: require.resolve('../express') });
      }
    },

    // Copy application files
    app: function() {
      if (this.props.type == 'cli') {
        this.composeWith('arhuman:cli', { options: { name: this.props.name } }, { local: require.resolve('../cli') });
      } else if (this.props.type == 'class6') {
        this.composeWith('arhuman:class6', { options: { name: this.props.name } }, { local: require.resolve('../class6') });
      } else if (this.props.type == 'express') {
        this.composeWith('arhuman:express', { options: { name: this.props.name } }, { local: require.resolve('../express') });
      }
    }
  },
  install: function() {
    this.installDependencies();
  }
});
