#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var path = require('path');
var args = require('args');
var chalk = require('chalk');
var ora = require('ora');
var dext_core_utils_1 = require('dext-core-utils');
var debug = process.env.NODE_ENV === 'development';
args.command(['search', 's'], 'Seach for plugins or themes.', function(
  name,
  sub
) {
  var searchTerm = sub[0];
  if (!searchTerm) {
    console.log(chalk.yellow('Search must be called with an search term'));
    return;
  }
  var spinner = ora(
    chalk.green('Searching for "' + searchTerm + '"...')
  ).start();
  return dext_core_utils_1.api
    .search(searchTerm)
    .then(function(results) {
      spinner.color = 'green';
      spinner.text = chalk.green('Results for "' + searchTerm + '":');
      spinner.succeed();
      var resultsMessage;
      if (results.length) {
        resultsMessage = results.reduce(function(prev, result) {
          return prev + '- ' + result.name + ': ' + result.desc + '\n';
        }, '');
      } else {
        resultsMessage = chalk.yellow('no packages found');
      }
      console.log(resultsMessage);
    })
    .catch(function(err) {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});
args.command(['install', 'i'], 'Install a new plugin or theme.', function(
  name,
  sub
) {
  var plugin = sub[0];
  var spinner = ora(chalk.green(plugin + ' : Installing...')).start();
  return dext_core_utils_1.api
    .install(plugin, dext_core_utils_1.utils.paths.getPluginPath(plugin), {
      debug: debug,
    })
    .then(function() {
      spinner.color = 'green';
      spinner.text = chalk.green(plugin + ' : Installed successfully!');
      spinner.succeed();
    })
    .catch(function(err) {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});
args.command(['uninstall', 'u'], 'Uninstall a plugin or theme.', function(
  name,
  sub
) {
  var plugin = sub[0];
  var spinner = ora(chalk.green(plugin + ' : Uninstalling...')).start();
  return dext_core_utils_1.api
    .uninstall(plugin, dext_core_utils_1.utils.paths.getPluginPath(plugin))
    .then(function() {
      spinner.color = 'green';
      spinner.text = chalk.green(plugin + ' : Uninstalled successfully!');
      spinner.succeed();
    })
    .catch(function(err) {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});
args.command(['theme', 't'], 'Sets a theme.', function(name, sub) {
  var theme = sub[0];
  var spinner = ora(chalk.green(theme + ' : setting theme...')).start();
  return dext_core_utils_1.api
    .setTheme(theme)
    .then(function() {
      spinner.color = 'green';
      spinner.text = chalk.green(theme + ' : Theme has been set successfully!');
      spinner.succeed();
    })
    .catch(function(err) {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});
args.command(['link'], 'Creates a symlink for the current plugin.', function() {
  var plugin = path.basename(process.cwd());
  var spinner = ora(chalk.green('Linking...')).start();
  return dext_core_utils_1.api
    .createSymLink(plugin, process.cwd())
    .then(function(data) {
      spinner.color = 'green';
      spinner.text = chalk.green(
        'Linked: ' + data.srcPath + ' -> ' + data.destPath
      );
      spinner.succeed();
    })
    .catch(function(err) {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});
args.command(
  ['unlink'],
  'Removes the symlink for the current plugin.',
  function() {
    var plugin = path.basename(process.cwd());
    var spinner = ora(chalk.green('Unlinking...')).start();
    return dext_core_utils_1.api
      .removeSymLink(plugin)
      .then(function(data) {
        spinner.color = 'green';
        spinner.text = chalk.green('Unlinked: ' + data.destPath);
        spinner.succeed();
      })
      .catch(function(err) {
        spinner.color = 'red';
        spinner.text = chalk.red(err);
        spinner.fail();
      });
  }
);
args.command(['config'], 'Display the raw config.', function() {
  return dext_core_utils_1.api
    .getConfig()
    .then(function(data) {
      return console.log(JSON.stringify(data, null, 2));
    })
    .catch(function(err) {
      return console.error(chalk.red(err));
    });
});
var flags = args.parse(process.argv);
if (Object.keys(flags).length > 0) {
  args.showHelp();
}
