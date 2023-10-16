"use strict";

// inject font
hexo.extend.injector.register("head_end", () => {
  return `

    <style>
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#011627;color:#d6deeb}.hljs-keyword{color:#c792ea;font-style:italic}.hljs-built_in{color:#addb67;font-style:italic}.hljs-type{color:#82aaff}.hljs-literal{color:#ff5874}.hljs-number{color:#f78c6c}.hljs-regexp{color:#5ca7e4}.hljs-string{color:#ecc48d}.hljs-subst{color:#d3423e}.hljs-symbol{color:#82aaff}.hljs-class{color:#ffcb8b}.hljs-function{color:#82aaff}.hljs-title{color:#dcdcaa;font-style:italic}.hljs-params{color:#7fdbca}.hljs-comment{color:#637777;font-style:italic}.hljs-doctag{color:#7fdbca}.hljs-meta,.hljs-meta .hljs-keyword{color:#82aaff}.hljs-meta .hljs-string{color:#ecc48d}.hljs-section{color:#82b1ff}.hljs-attr,.hljs-name,.hljs-tag{color:#7fdbca}.hljs-attribute{color:#80cbc4}.hljs-variable{color:#addb67}.hljs-bullet{color:#d9f5dd}.hljs-code{color:#80cbc4}.hljs-emphasis{color:#c792ea;font-style:italic}.hljs-strong{color:#addb67;font-weight:700}.hljs-formula{color:#c792ea}.hljs-link{color:#ff869a}.hljs-quote{color:#697098;font-style:italic}.hljs-selector-tag{color:#ff6363}.hljs-selector-id{color:#fad430}.hljs-selector-class{color:#addb67;font-style:italic}.hljs-selector-attr,.hljs-selector-pseudo{color:#c792ea;font-style:italic}.hljs-template-tag{color:#c792ea}.hljs-template-variable{color:#addb67}.hljs-addition{color:#addb67ff;font-style:italic}.hljs-deletion{color:#ef535090;font-style:italic}
    </style>

    <style>
    .md-text .highlight>table {
      background: #26292c;
    }
    .highlight .code{
      width: 100% ;
    }
    .highlight .code .hljs{
      background: #26292c;
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
      border-right: 1px double #2f3333;
    }
    
    
    .md-text .highlight, pre:not([class]):has(>code) {
      margin: 0;
    }
    </style>
    
  `;
});
