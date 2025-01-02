// ==UserScript==
// @name         美益达影视M3U8广告过滤器
// @namespace    http://tampermonkey.net/
// @version      2025-01-02
// @description  过滤m3u8播放列表中的广告片段
// @author       Dust-Nian
// @match        https://www.mydys1.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mydys1.com
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @connect      *
// ==/UserScript==

(function () {
  "use strict";

  GM_log("M3U8广告过滤器已启动");

  // 创建一个代理来拦截Fetch请求
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = args[0];
    if (typeof url === "string" && url.includes(".m3u8")) {
      GM_log("拦截到Fetch M3U8请求:", url);
      const response = await originalFetch.apply(this, args);
      const clone = response.clone();
      const content = await clone.text();

      if (!content.includes(".ts") && content.includes(".m3u8")) {
        GM_log("检测到嵌套M3U8，原始内容:", content);
        return response;
      }

      GM_log("处理M3U8内容，原始内容:", content);
      const filteredContent = filterAds(content);
      return new Response(filteredContent, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }
    return originalFetch.apply(this, args);
  };

  // 创建一个代理来拦截XHR请求
  const XHR = XMLHttpRequest.prototype;
  const originalOpen = XHR.open;
  const originalSend = XHR.send;
  const originalSetRequestHeader = XHR.setRequestHeader;

  XHR.open = function (...args) {
    this._url = args[1];
    this._method = args[0];
    return originalOpen.apply(this, args);
  };

  XHR.send = function (...args) {
    if (this._url && this._url.includes(".m3u8")) {
      GM_log("拦截到XHR M3U8请求:", this._url);

      const originalOnReadyStateChange = this.onreadystatechange;
      this.onreadystatechange = function () {
        if (this.readyState === 4) {
          const content = this.responseText;
          if (content) {
            if (!content.includes(".ts") && content.includes(".m3u8")) {
              GM_log("检测到嵌套M3U8，原始内容:", content);
            } else {
              GM_log("处理M3U8内容，原始内容:", content);
              Object.defineProperty(this, "responseText", {
                value: filterAds(content),
                writable: false,
              });
            }
          }
        }
        if (originalOnReadyStateChange) {
          originalOnReadyStateChange.apply(this, arguments);
        }
      };
    }
    return originalSend.apply(this, args);
  };

  // 过滤广告的函数
  function filterAds(content) {
    let lines = content.split("\n");
    GM_log("总行数：", lines.length);

    let filteredLines = [];
    let isSegmentLine = false;
    let lastExtInf = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 跳过空行
      if (!line) continue;

      // 处理以#开头的行
      if (line.startsWith("#")) {
        // 如果是EXTINF行，先不添加，保存起来
        if (line.startsWith("#EXTINF:")) {
          lastExtInf = line;
          isSegmentLine = true;
        } else {
          filteredLines.push(line);
          isSegmentLine = false;
        }
        continue;
      }

      // 处理非#开头的内容行（通常是分片URL）
      if (isSegmentLine) {
        // 规则1：检查是否包含 /video/ 的广告
        // 规则2：检查长度是否为35的广告
        const isVideoAd = line.includes("/video/");
        const isLengthAd = line.length === 35;

        if (isVideoAd || isLengthAd) {
          GM_log("发现广告片段：", line);
          GM_log("广告类型：", isVideoAd ? "video路径" : "35字符");
        } else {
          // 不是广告，添加EXTINF行和分片行
          filteredLines.push(lastExtInf);
          filteredLines.push(line);
        }
        isSegmentLine = false;
      } else {
        // 不是分片行的其他内容，直接保留
        filteredLines.push(line);
      }
    }

    GM_log("过滤后行数：", filteredLines.length);
    let filteredContent = filteredLines.join("\n");
    return filteredContent;
  }
})();
