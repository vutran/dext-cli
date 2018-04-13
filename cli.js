#!/usr/bin/env node

const path = require('path');
const args = require('args');
const chalk = require('chalk');
const ora = require('ora');
const { api, utils } = require('dext-core-utils');

const debug = process.env.NODE_ENV === 'development';

args.command(['search', 's'], 'Seach for plugins or themes.', (name, sub) => {
  const searchTerm = sub[0];
  if (!searchTerm) {
    console.log(chalk.yellow('Search must be called with an search term'));
    return;
  }

  const spinner = ora(chalk.green(`Searching for "${searchTerm}"...`)).start();
  return api
    .search(searchTerm)
    .then(results => {
      spinner.color = 'green';
      spinner.text = chalk.green(`Results for "${searchTerm}":`);
      spinner.succeed();

      let resultsMessage;
      if (results.length) {
        resultsMessage = results.reduce(
          (prev, result) => `${prev}- ${result.name}: ${result.desc}\n`,
          ''
        );
      } else {
        resultsMessage = chalk.yellow('no packages found');
      }
      console.log(resultsMessage);
    })
    .catch(err => {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});

args.command(
  ['install', 'i'],
  'Install a new plugin or theme.',
  (name, sub) => {
    const plugin = sub[0];
    const spinner = ora(chalk.green(`${plugin} : Installing...`)).start();
    return api
      .install(plugin, utils.paths.getPluginPath(plugin), { debug })
      .then(() => {
        spinner.color = 'green';
        spinner.text = chalk.green(`${plugin} : Installed successfully!`);
        spinner.succeed();
      })
      .catch(err => {
        spinner.color = 'red';
        spinner.text = chalk.red(err);
        spinner.fail();
      });
  }
);

args.command(
  ['uninstall', 'u'],
  'Uninstall a plugin or theme.',
  (name, sub) => {
    const plugin = sub[0];
    const spinner = ora(chalk.green(`${plugin} : Uninstalling...`)).start();
    return api
      .uninstall(plugin, utils.paths.getPluginPath(plugin))
      .then(() => {
        spinner.color = 'green';
        spinner.text = chalk.green(`${plugin} : Uninstalled successfully!`);
        spinner.succeed();
      })
      .catch(err => {
        spinner.color = 'red';
        spinner.text = chalk.red(err);
        spinner.fail();
      });
  }
);

args.command(['theme', 't'], 'Sets a theme.', (name, sub) => {
  const theme = sub[0];
  const spinner = ora(chalk.green(`${theme} : setting theme...`)).start();
  return api
    .setTheme(theme)
    .then(() => {
      spinner.color = 'green';
      spinner.text = chalk.green(`${theme} : Theme has been set successfully!`);
      spinner.succeed();
    })
    .catch(err => {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});

args.command(['link'], 'Creates a symlink for the current plugin.', () => {
  const plugin = path.basename(process.cwd());
  const spinner = ora(chalk.green('Linking...')).start();
  return api
    .createSymLink(plugin, process.cwd())
    .then(data => {
      spinner.color = 'green';
      spinner.text = chalk.green(`Linked: ${data.srcPath} -> ${data.destPath}`);
      spinner.succeed();
    })
    .catch(err => {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});

args.command(['unlink'], 'Removes the symlink for the current plugin.', () => {
  const plugin = path.basename(process.cwd());
  const spinner = ora(chalk.green('Unlinking...')).start();
  return api
    .removeSymLink(plugin)
    .then(data => {
      spinner.color = 'green';
      spinner.text = chalk.green(`Unlinked: ${data.destPath}`);
      spinner.succeed();
    })
    .catch(err => {
      spinner.color = 'red';
      spinner.text = chalk.red(err);
      spinner.fail();
    });
});

args.command(['config'], 'Display the raw config.', () =>
  api
    .getConfig()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.error(chalk.red(err)))
);

const flags = args.parse(process.argv);

if (Object.keys(flags).length !== 0) {
  args.showHelp();
}
