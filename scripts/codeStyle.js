"use strict"

// inject font
hexo.extend.injector.register("head_end", () => {
  return `

    <style>
      pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em
      }
      code.hljs {
        padding: 3px 5px
      }
      /*!
        Theme: Tokyo-night-Dark
        origin: https://github.com/enkia/tokyo-night-vscode-theme
        Description: Original highlight.js style
        Author: (c) Henri Vandersleyen <hvandersleyen@gmail.com>
        License: see project LICENSE
        Touched: 2022
      */
      /*  Comment */
      .hljs-meta,
      .hljs-comment {
        color: #565f89
      }
      /* Red */
      /*INFO: This keyword, HTML elements, Regex group symbol, CSS units, Terminal Red */
      .hljs-tag,
      .hljs-doctag,
      .hljs-selector-id,
      .hljs-selector-class,
      .hljs-regexp,
      .hljs-template-tag,
      .hljs-selector-pseudo,
      .hljs-selector-attr,
      .hljs-variable.language_,
      .hljs-deletion {
        color: #f7768e
      }
      /*Orange */
      /*INFO: Number and Boolean constants, Language support constants */
      .hljs-variable,
      .hljs-template-variable,
      .hljs-number,
      .hljs-literal,
      .hljs-type,
      .hljs-params,
      .hljs-link {
        color: #ff9e64
      }
      /*  Yellow */
      /* INFO:  	Function parameters, Regex character sets, Terminal Yellow */
      .hljs-built_in,
      .hljs-attribute {
        color: #e0af68
      }
      /* cyan */
      /* INFO: Language support functions, CSS HTML elements */
      .hljs-selector-tag {
        color: #2ac3de
      }
      /* light blue */
      /* INFO: Object properties, Regex quantifiers and flags, Markdown headings, Terminal Cyan, Markdown code, Import/export keywords */
      .hljs-keyword,
      .hljs-title.function_,
      .hljs-title,
      .hljs-title.class_,
      .hljs-title.class_.inherited__,
      .hljs-subst,
      .hljs-property {
        color: #7dcfff
      }
      /*Green*/
      /* INFO: Object literal keys, Markdown links, Terminal Green */
      .hljs-selector-tag {
        color: #73daca
      }
      /*Green(er) */
      /* INFO: Strings, CSS class names */
      .hljs-quote,
      .hljs-string,
      .hljs-symbol,
      .hljs-bullet,
      .hljs-addition {
        color: #9ece6a
      }
      /* Blue */
      /* INFO:  	Function names, CSS property names, Terminal Blue */
      .hljs-code,
      .hljs-formula,
      .hljs-section {
        color: #7aa2f7
      }
      /* Magenta */
      /*INFO: Control Keywords, Storage Types, Regex symbols and operators, HTML Attributes, Terminal Magenta */
      .hljs-name,
      .hljs-keyword,
      .hljs-operator,
      .hljs-keyword,
      .hljs-char.escape_,
      .hljs-attr {
        color: #bb9af7
      }
      /* white*/
      /* INFO: Variables, Class names, Terminal White */
      .hljs-punctuation {
        color: #c0caf5
      }
      .hljs {
        background: #1a1b26;
        color: #9aa5ce
      }
      .hljs-emphasis {
        font-style: italic
      }
      .hljs-strong {
        font-weight: bold
      }
    </style>

    <style>
    .md-text .highlight>table {
      background: #2E3440;
    }
    .highlight .code{
      width: 100% ;
    }
    .highlight .code .hljs{
      background: #2E3440;
    }
    .code pre{
      padding: 0 !important;
    }
    .md-text .highlight .code:before ,
    .highlight .code .copy-btn,
    .highlight .code .copy-btn:hover {
      color: #fff;
      opacity: 0.4;
    }
    .highlight .code .copy-btn.success:hover{
      color:#3dc550;
      opacity: 0.75;
    }
    .highlight .code .copy-btn:hover{
      opacity: 0.6;
    }

    .md-text .highlight > table> tbody > tr .gutter {
      border-right: 1px double #2E3440;
    }
    
    
    .md-text .highlight, pre:not([class]):has(>code) {
      margin: 0;
    }
    </style>
    
  `
})
