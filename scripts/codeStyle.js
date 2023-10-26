"use strict";

// inject font
hexo.extend.injector.register("head_end", () => {
  return `

    <style>
      pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2e3440}.hljs,.hljs-subst{color:#d8dee9}.hljs-selector-tag{color:#81a1c1}.hljs-selector-id{color:#8fbcbb;font-weight:700}.hljs-selector-attr,.hljs-selector-class{color:#8fbcbb}.hljs-property,.hljs-selector-pseudo{color:#88c0d0}.hljs-addition{background-color:rgba(163,190,140,.5)}.hljs-deletion{background-color:rgba(191,97,106,.5)}.hljs-built_in,.hljs-class,.hljs-type{color:#8fbcbb}.hljs-function,.hljs-function>.hljs-title,.hljs-title.hljs-function{color:#88c0d0}.hljs-keyword,.hljs-literal,.hljs-symbol{color:#81a1c1}.hljs-number{color:#b48ead}.hljs-regexp{color:#ebcb8b}.hljs-string{color:#a3be8c}.hljs-title{color:#8fbcbb}.hljs-params{color:#d8dee9}.hljs-bullet{color:#81a1c1}.hljs-code{color:#8fbcbb}.hljs-emphasis{font-style:italic}.hljs-formula{color:#8fbcbb}.hljs-strong{font-weight:700}.hljs-link:hover{text-decoration:underline}.hljs-comment,.hljs-quote{color:#4c566a}.hljs-doctag{color:#8fbcbb}.hljs-meta,.hljs-meta .hljs-keyword{color:#5e81ac}.hljs-meta .hljs-string{color:#a3be8c}.hljs-attr{color:#8fbcbb}.hljs-attribute{color:#d8dee9}.hljs-name{color:#81a1c1}.hljs-section{color:#88c0d0}.hljs-tag{color:#81a1c1}.hljs-template-variable,.hljs-variable{color:#d8dee9}.hljs-template-tag{color:#5e81ac}.language-abnf .hljs-attribute{color:#88c0d0}.language-abnf .hljs-symbol{color:#ebcb8b}.language-apache .hljs-attribute{color:#88c0d0}.language-apache .hljs-section{color:#81a1c1}.language-arduino .hljs-built_in{color:#88c0d0}.language-aspectj .hljs-meta{color:#d08770}.language-aspectj>.hljs-title{color:#88c0d0}.language-bnf .hljs-attribute{color:#8fbcbb}.language-clojure .hljs-name{color:#88c0d0}.language-clojure .hljs-symbol{color:#ebcb8b}.language-coq .hljs-built_in{color:#88c0d0}.language-cpp .hljs-meta .hljs-string{color:#8fbcbb}.language-css .hljs-built_in{color:#88c0d0}.language-css .hljs-keyword{color:#d08770}.language-diff .hljs-meta,.language-ebnf .hljs-attribute{color:#8fbcbb}.language-glsl .hljs-built_in{color:#88c0d0}.language-groovy .hljs-meta:not(:first-child),.language-haxe .hljs-meta,.language-java .hljs-meta{color:#d08770}.language-ldif .hljs-attribute{color:#8fbcbb}.language-lisp .hljs-name,.language-lua .hljs-built_in,.language-moonscript .hljs-built_in,.language-nginx .hljs-attribute{color:#88c0d0}.language-nginx .hljs-section{color:#5e81ac}.language-pf .hljs-built_in,.language-processing .hljs-built_in{color:#88c0d0}.language-scss .hljs-keyword,.language-stylus .hljs-keyword{color:#81a1c1}.language-swift .hljs-meta{color:#d08770}.language-vim .hljs-built_in{color:#88c0d0;font-style:italic}.language-yaml .hljs-meta{color:#d08770}
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
    
  `;
});
