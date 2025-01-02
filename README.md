# 美益达影视 M3U8 广告过滤器

## 简介

这是一个用于过滤美益达影视网站视频播放中 M3U8 广告片段的油猴脚本。它可以自动识别和移除视频播放列表中的广告内容，提供更流畅的观影体验。

## 功能特点

- 自动拦截并过滤 M3U8 播放列表中的广告片段
- 支持两种广告识别规则：
  - 包含 `/video/` 路径的片段
  - URL 长度为 35 字符的片段
- 同时支持 Fetch 和 XHR 请求的拦截
- 支持嵌套 M3U8 播放列表的处理

## 安装方法

1. 首先安装油猴插件（Tampermonkey）

   - [Chrome 版本](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox 版本](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. 点击下面的安装链接安装脚本：
   [安装脚本](链接到你的脚本托管地址)

## 使用说明

- 安装完成后，脚本会自动在美益达影视网站（mydys1.com）运行
- 无需任何配置，即可自动过滤视频中的广告片段
- 可以通过浏览器控制台查看脚本的运行日志

## 技术细节

- 使用 JavaScript 编写
- 通过代理方式拦截网络请求
- 支持的请求类型：
  - Fetch API
  - XMLHttpRequest (XHR)

## 兼容性

- 网站：www.mydys1.com
- 浏览器：支持现代浏览器（Chrome、Firefox、Edge 等）
- 需要安装 Tampermonkey 或类似的用户脚本管理器

## 更新日志

- 2025-01-02：初始版本发布

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个脚本。

## 免责声明

本脚本仅供学习交流使用，请勿用于商业用途。使用本脚本时请遵守相关法律法规。
