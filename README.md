# deskcord

A minimal Discord client that pops up from the taskbar tray.

This is a heavy work-in-progress and is not fully ready for use yet.

> **Warning:** It is not recommended that you use this application with a Discord user account. Custom clients are against the Discord Terms of Service and can possibly result in an account ban. This software is for educational purposes only.

## Requirements

 - NodeJS v10 or later
 - Electron
 - `markdown`, `electron-settings`, and `discord.js` NPM modules
 - Windows(?)

## Configuration and Setup

```sh
cd deskcord
echo "{\"token\": \"(token goes here)\"}" >> config.json # sets configuration options
electron .
```

## Screenshots

#### Channel Drawer

![Screenshot](https://cdn.discordapp.com/attachments/376375897109954560/535995913181593600/electron_2019-01-18_20-31-32.png)

#### Chat area

![Screenshot](https://cdn.discordapp.com/attachments/376375897109954560/535995914192420875/electron_2019-01-18_20-31-10.png)

#### Full perspective

![Screenshot](https://cdn.discordapp.com/attachments/376375897109954560/535997485861306388/unknown.png)
