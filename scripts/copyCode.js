// "use strict";

// hexo.extend.injector.register("body_end", () => {
//   return `
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast@1.4.0/dist/css/iziToast.min.css">
//   `;
// });

// // code block copy
// hexo.extend.injector.register("body_end", function () {
//   return `
//   <style>
//     .highlight {
//       position: relative;
//     }
//     .highlight .code .copy-btn{
//       position: absolute;
//       top: 0;
//       right: 0;
//       padding: 4px 0.5rem;
//       opacity: 0.25;
//       font-weight: 700;
//       color: var(--theme);
//       cursor: pointer;
//       transination: opacity 0.3s;
//     }
//     .highlight .code .copy-btn:hover{
//       color: var(--text-code);
//       opacity: 0.75;
//     }
//     .highlight .code .copy-btn.success {
//       color: var(--swiper-theme-color);
//       opacity: 0.75;

//     }
//     .highlight .code .copy-btn.warning {
//       color: var(--text-code);
//       opacity: 0.75;
//     }

//   </style>
//   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/izitoast@1.4.0/dist/js/iziToast.min.js"></script>
//   <script>
//     const codeElementArr = document.querySelectorAll('.code')
//     codeElementArr.forEach(code => {
//       const codeBeforeWidth = window.getComputedStyle(code, '::before').width.split('px')[0]
//       const codeBeforePadding = window.getComputedStyle(code, '::before').padding.split(' ').pop().split('px')[0]

//       // copy btn
//       const codeCopyBtn = document.createElement('div')
//       codeCopyBtn.classList.add('copy-btn')
//       codeCopyBtn.style.right = Number(codeBeforeWidth) + Number(codeBeforePadding) * 2 + 'px'
//       codeCopyBtn.innerText = '复制代码'
//       code.appendChild(codeCopyBtn)

//       codeCopyBtn.addEventListener('click', async () => {
//         const currentCodeElement = code.children[0]?.innerText
//         await copyCode(currentCodeElement)

//         codeCopyBtn.innerText = '复制成功'
//         codeCopyBtn.classList.add('success')

//         setTimeout(() => {
//           codeCopyBtn.innerText = '复制代码'
//           codeCopyBtn.classList.remove('success')
//         },1000)
//       })
//     })

//     async function copyCode(currentCode) {
//       // console.log(currentCode)
//       // console.log('复制代码')
//       if (navigator.clipboard) {
//         try {
//           await navigator.clipboard.writeText(currentCode)

//           iziToast.info({
//             timeout: 3000, // 关闭弹窗的时间
//             // icon: 'Fontawesome', // 图标类别
//             closeOnEscape: 'true', // 允许使用Esc键关闭弹窗
//             transitionIn: 'bounceInLeft', // 弹窗打开动画
//             transitionOut: 'fadeOutRight', // 弹窗关闭动画
//             displayMode: 'replace', // 替换已经打开的弹窗
//             layout: '2', // Medium模式
//             position: 'topRight', // 弹窗位置
//             //icon: 'fad fa-copy', // 图标类名
//             iconUrl:'https://image-1309791158.cos.ap-guangzhou.myqcloud.com/其他/1122star.svg',
//             backgroundColor: '#03cafc', // 弹窗背景色
//             title: '耶，复制成功了', // 通知标题
//             message: '＼(☆o☆)／，希望能对你有点帮助吧' // 通知消息内容
//           });
//         } catch (error) {
//           // 未获得用户许可
//           codeCopyBtn.innerText = '未获得用户许可'
//           codeCopyBtn.classList.add('warning')
//           setTimeout(() => {
//             codeCopyBtn.innerText = '复制代码'
//             codeCopyBtn.classList.remove('warning')
//           },1000)

//           iziToast.info({
//             timeout: 3000, // 关闭弹窗的时间
//             // icon: 'Fontawesome', // 图标类别
//             closeOnEscape: 'true', // 允许使用Esc键关闭弹窗
//             transitionIn: 'bounceInLeft', // 弹窗打开动画
//             transitionOut: 'fadeOutRight', // 弹窗关闭动画
//             displayMode: 'replace', // 替换已经打开的弹窗
//             layout: '2', // Medium模式
//             position: 'topRight', // 弹窗位置
//             //icon: 'fad fa-copy', // 图标类名
//             iconUrl:'https://image-1309791158.cos.ap-guangzhou.myqcloud.com/其他/1122star.svg',
//             backgroundColor: '#f53900', // 弹窗背景色
//             color: '#fff',
//             title: '没有获得您的许可，复制失败了', // 通知标题
//             // message: '我的原则，只有三个字，看心情' // 通知消息内容
//           });
//         }
//       } else {
//         codeCopyBtn.innerText = '当前浏览器不支持此api'
//         codeCopyBtn.classList.add('warning')
//         setTimeout(() => {
//           codeCopyBtn.innerText = '复制代码'
//           codeCopyBtn.classList.remove('warning')
//         },1000)

//         iziToast.info({
//           timeout: 3000, // 关闭弹窗的时间
//           // icon: 'Fontawesome', // 图标类别
//           closeOnEscape: 'true', // 允许使用Esc键关闭弹窗
//           transitionIn: 'bounceInLeft', // 弹窗打开动画
//           transitionOut: 'fadeOutRight', // 弹窗关闭动画
//           displayMode: 'replace', // 替换已经打开的弹窗
//           layout: '2', // Medium模式
//           position: 'topRight', // 弹窗位置
//           //icon: 'fad fa-copy', // 图标类名
//           iconUrl:'https://image-1309791158.cos.ap-guangzhou.myqcloud.com/其他/1122star.svg',
//           backgroundColor: '#f53900', // 弹窗背景色
//           title: '当前浏览器不支持此api', // 通知标题
//           message: '听我的，换个浏览器吧' // 通知消息内容
//         });
//       }
//     }
//   </script>
//   `;
// });
