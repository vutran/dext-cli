# Dext Package Manager (dpm)

[![license](https://img.shields.io/github/license/vutran/dext-cli.svg?maxAge=2592000&style=flat-square)](LICENSE) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/dext-app/Lobby)

> [Dext](https://github.com/vutran/dext) command-line interface tool.

![](screenshot.png?raw=true)

## Install

```bash
$ npm install -g dext-cli
```

_Requires [Dext](https://github.com/DextApp/dext)._

## Usage

```bash
# installs a new plugin/theme
$ dpm install dext-my-plugin

# uninstalls an existing plugin/theme
$ dpm uninstall dext-my-plugin

# sets a new theme
$ dpm theme dext-my-theme

# search for a plugin/theme
$ dpm search github

# creates a symlink (current directory) to dext plugin directory (for development)
$ dpm link

# unlinks the current directory
$ dpm unlink
```

## Related

* [dext](https://github.com/DextApp/dext) - The Dext smart launcher
* [dext-core-utils](https://github.com/DextApp/dext-core-utils) - Utility modules shared between Dext and Dext Package Manager.

## License

MIT © [Vu Tran](https://github.com/vutran/)
