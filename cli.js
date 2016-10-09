#!/usr/bin/env node

const path = require('path');
const args = require('args');
const chalk = require('chalk');
const ora = require('ora');
const { api, utils } = require('dext-core-utils');

args.command(['install', 'i'], 'Install a new plugin or theme.', (name, sub) => {
  const plugin = sub[0];
  const spinner = ora(`${plugin} : Installing...`).start();
  return api.install(plugin, utils.paths.getPluginPath(plugin))
    .then(() => {
      spinner.text = chalk.green(`${plugin} : Installed successfully!`);
      spinner.succeed();
    })
    .catch(err => {
      spinner.fail();
      console.error(chalk.red(err));
    });
});

args.command(['uninstall', 'u'], 'Uninstall a plugin or theme.', (name, sub) => {
  const plugin = sub[0];
  const spinner = ora(`${plugin} : Uninstalling...`).start();
  return api.uninstall(plugin, utils.paths.getPluginPath(plugin))
    .then(() => {
      spinner.text = chalk.green(`${plugin} : Uninstalled successfully!`);
      spinner.succeed();
    })
    .catch(err => {
      spinner.fail();
      console.error(chalk.red(err));
    });
});

args.command(['theme', 't'], 'Sets a theme.', (name, sub) => {
  const theme = sub[0];
  return api.setTheme(theme)
  .then(() => console.log(chalk.green(`${theme} has been set successfully!`)))
  .catch(err => console.error(chalk.red(err)));
});

args.command(['link'], 'Creates a symlink for the current plugin.', () => {
  const plugin = path.basename(process.cwd());
  return api.createSymLink(plugin, process.cwd())
    .then((data) => {
      console.log(chalk.green(`Linked: ${data.srcPath} -> ${data.destPath}`));
    })
    .catch(err => console.error(chalk.red(err)));
});

args.command(['unlink'], 'Removes the symlink for the current plugin.', () => {
  const plugin = path.basename(process.cwd());
  return api.removeSymLink(plugin)
    .then((data) => {
      console.log(chalk.green(`Unlinked: ${data.destPath}`));
    })
    .catch(err => console.error(chalk.red(err)));
});

args.command(['config'], 'Display the raw config.', () => api.getConfig()
  .then((data) => {
    console.log(chalk.green(JSON.stringify(data, null, 2)));
  })
  .catch(err => console.error(chalk.red(err))));

const flags = args.parse(process.argv);

if (Object.keys(flags).length !== 0) {
  args.showHelp();
}
