# M3U8 Ad Filter for MeiYiDa Video

[中文文档](./md/README_CN.md)

## Introduction

This is a Tampermonkey script designed to filter out advertisement segments from M3U8 playlists on the MeiYiDa video website. It automatically identifies and removes ad content from video playlists, providing a smoother viewing experience.

## Features

- Automatically intercepts and filters ads in M3U8 playlists
- Supports two ad identification rules:
  - Segments containing `/video/` path
  - URLs with exactly 35 characters
- Supports both Fetch and XHR request interception
- Handles nested M3U8 playlists

## Installation

1. First, install the Tampermonkey browser extension

   - [Chrome Version](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox Version](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. Click the link below to install the script:
   [Install Script](link-to-your-script-hosting)

## Usage

- The script automatically runs on the MeiYiDa video website (mydys1.com)
- No configuration needed - ads are filtered automatically
- You can check the script's operation logs in the browser console

## Technical Details

- Written in JavaScript
- Uses proxy method to intercept network requests
- Supported request types:
  - Fetch API
  - XMLHttpRequest (XHR)

## Compatibility

- Website: www.mydys1.com
- Browsers: Supports modern browsers (Chrome, Firefox, Edge, etc.)
- Requires Tampermonkey or similar userscript manager

## Changelog

- 2025-01-02: Initial release

## License

MIT License

## Contributing

Issues and Pull Requests are welcome to improve this script.

## Disclaimer

This script is for educational and personal use only. Commercial use is prohibited. Please comply with all relevant laws and regulations when using this script.
