'use strict';
//Require dependencies
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var Base = require('yeoman-generator');
const {spawn} = require('child_process');
const child = spawn('pwd');
// code = execSync('direnv allow');
module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'description',
        message: 'Describe your project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name'
      },
      {
        type: 'confirm',
        name: 'env',
        message: 'Do you want me to create _envrc for this project'
      },
    ]).then((answers) => {
      this.props = answers;
      this.log('app name', answers.name);
      this.log('app description', answers.description);
      this.log('app developer', answers.author);
      this.log('cool feature', answers.env);
    });
  }
  writing() {
    //Copy the configuration files
    // copyTpl takes third parameter which is a list of data which can be bound to template file after extraction.
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('server.js'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_utils.js'),
      this.destinationPath('utils.js')
    );
    this.fs.copy(
      this.templatePath('_readme.md'),
      this.destinationPath('README.md')
    );
    if (this.props.env) {
      this.fs.copy(
        this.templatePath('._envrc'),
        this.destinationPath('.envrc')
      );
    }
    this.fs.copy(
      this.templatePath('._gitignore'),
      this.destinationPath('.gitignore')
    );
    if(this.props.env){
      try {
        child.stdout.on('data', (data) => {
          console.log(`child stdout:\n${data}`);
        });
      } catch (e) {
        console.log('error', e);
      }
    }
  }
  install(){
    this.yarnInstall()
  }
};
