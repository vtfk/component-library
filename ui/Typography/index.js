import n from"react";import e from"prop-types";function i(){return(i=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(n[t]=i[t])}return n}).apply(this,arguments)}function t(n,e){if(null==n)return{};var i,t,a=function(n,e){if(null==n)return{};var i,t,a={},r=Object.keys(n);for(t=0;t<r.length;t++)i=r[t],e.indexOf(i)>=0||(a[i]=n[i]);return a}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(t=0;t<r.length;t++)i=r[t],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(n,i)&&(a[i]=n[i])}return a}function a(e){var a=e.as,r=e.className,o=e.children,s=t(e,["as","className","children"]),l=a||"h1";return n.createElement(l,i({className:"typography heading-one ".concat(r||"")},s),o)}function r(e){var a=e.as,r=e.className,o=e.children,s=t(e,["as","className","children"]),l=a||"h2";return n.createElement(l,i({className:"typography heading-two ".concat(r||"")},s),o)}function o(e){var a=e.as,r=e.className,o=e.children,s=t(e,["as","className","children"]),l=a||"h3";return n.createElement(l,i({className:"typography heading-three ".concat(r||"")},s),o)}function s(e){var a=e.as,r=e.className,o=e.children,s=t(e,["as","className","children"]),l=a||"h4";return n.createElement(l,i({className:"typography heading-four ".concat(r||"")},s),o)}function l(e){var a=e.className,r=e.children,o=e.size,s=t(e,["className","children","size"]);return n.createElement("p",i({className:"typography paragraph ".concat(a||""," ").concat(o||"")},s),r)}function p(e){var a=e.href,r=e.onClick,o=e.className,s=e.noStyle,l=e.leftIcon,p=e.rightIcon,c=e.children,h=e.size,g=t(e,["href","onClick","className","noStyle","leftIcon","rightIcon","children","size"]);return n.createElement(n.Fragment,null,a&&n.createElement("a",i({href:a,className:"typography link ".concat(o||""," ").concat(s?"no-style":""," ").concat(h||""," ").concat(l||p?"has-icon":"")},g),l&&n.createElement("span",{className:"link-icon left-icon"},l),c,p&&n.createElement("span",{className:"link-icon right-icon"},p)),r&&n.createElement("button",i({onClick:r,className:"typography link ".concat(o||""," ").concat(s?"no-style":""," ").concat(h||""," ").concat(l||p?"has-icon":"")},g),l&&n.createElement("span",{className:"link-icon left-icon"},l),c,p&&n.createElement("span",{className:"link-icon right-icon"},p)))}function c(e){var a=e.href,r=e.className,o=t(e,["href","className"]);return n.createElement(p,i({href:a,className:"visually-hidden focusable skip-link ".concat(r||"")},o))}function h(e){var a=e.className,r=e.children,o=e.size,s=t(e,["className","children","size"]);return n.createElement("p",i({className:"typography paragraph error ".concat(a||""," ").concat(o||""),role:"alert","aria-live":"assertive"},s),r)}!function(n,e){void 0===e&&(e={});var i=e.insertAt;if(n&&"undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===i&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),a.styleSheet?a.styleSheet.cssText=n:a.appendChild(document.createTextNode(n))}}('.typography {\n  margin: 0;\n  position: relative; }\n  .typography.paragraph {\n    font-family: "Nunito Sans", sans-serif;\n    font-size: 16px;\n    line-height: 24px;\n    min-height: 24px; }\n    .typography.paragraph.small {\n      font-size: 14px;\n      line-height: 24px;\n      min-height: 24px; }\n  .typography.error {\n    color: #D30014;\n    font-weight: bold; }\n  .typography.link {\n    background: none;\n    border: 0;\n    color: inherit;\n    font: inherit;\n    line-height: normal;\n    overflow: visible;\n    padding: 0;\n    border-radius: 0;\n    font-weight: normal;\n    cursor: pointer;\n    font-family: "Nunito Sans", sans-serif;\n    font-size: 16px;\n    line-height: 24px;\n    min-height: 24px;\n    color: inherit;\n    cursor: pointer; }\n    .typography.link:active, .typography.link:visited, .typography.link:focus {\n      color: inherit; }\n    .typography.link.no-style {\n      text-decoration: none; }\n    .typography.link.small {\n      font-size: 14px;\n      line-height: 24px;\n      min-height: 24px; }\n    .typography.link.has-icon .link-icon {\n      display: inline-block;\n      transition: all 200ms ease-in-out; }\n      .typography.link.has-icon .link-icon.left-icon {\n        margin-right: 16px; }\n      .typography.link.has-icon .link-icon.right-icon {\n        margin-left: 16px; }\n    .typography.link.has-icon:hover {\n      text-decoration: none; }\n      .typography.link.has-icon:hover .link-icon.left-icon {\n        transform: translateX(-4px); }\n      .typography.link.has-icon:hover .link-icon.right-icon {\n        transform: translateX(4px); }\n    .typography.link:hover {\n      text-decoration: underline; }\n  .typography.heading-one {\n    font-family: "Nunito", sans-serif;\n    font-size: 48px;\n    line-height: 66px;\n    min-height: 66px;\n    font-weight: 700; }\n    @media (max-width: 1000px) {\n      .typography.heading-one {\n        font-size: 36px;\n        line-height: 49px;\n        min-height: 49px; } }\n  .typography.heading-two {\n    font-family: "Nunito", sans-serif;\n    font-size: 36px;\n    line-height: 40px;\n    min-height: 40px;\n    font-weight: 400; }\n    @media (max-width: 1000px) {\n      .typography.heading-two {\n        font-size: 28px;\n        line-height: 38px;\n        min-height: 38px; } }\n  .typography.heading-three {\n    font-family: "Nunito", sans-serif;\n    font-size: 21px;\n    line-height: 28px;\n    min-height: 28px;\n    font-weight: 400; }\n    @media (max-width: 1000px) {\n      .typography.heading-three {\n        font-size: 18px;\n        line-height: 24px;\n        min-height: 24px; } }\n  .typography.heading-four {\n    font-family: "Nunito", sans-serif;\n    font-size: 16px;\n    line-height: 25px;\n    min-height: 25px;\n    font-weight: 700; }\n  .typography.visually-hidden {\n    position: absolute;\n    overflow: hidden;\n    clip: rect(1px, 1px, 1px, 1px);\n    width: 1px;\n    height: 1px; }\n    .typography.visually-hidden.focusable:active, .typography.visually-hidden.focusable:focus {\n      position: inherit;\n      overflow: visible;\n      clip: auto;\n      width: auto;\n      height: auto; }\n  .typography.skip-link {\n    position: fixed !important;\n    z-index: 999999 !important;\n    display: block;\n    top: 0;\n    left: 0;\n    right: 0;\n    padding: 8px;\n    text-align: center;\n    background: #BFDCB2; }\n'),a.propTypes={className:e.string,children:e.node.isRequired},r.propTypes={className:e.string,children:e.node.isRequired},o.propTypes={className:e.string,children:e.node.isRequired},s.propTypes={className:e.string,children:e.node.isRequired},l.propTypes={className:e.string,size:e.string,children:e.node.isRequired},p.propTypes={href:e.string,onClick:e.func,className:e.string,noStyle:e.bool,leftIcon:e.node,rightIcon:e.node,size:e.string,children:e.node.isRequired},c.propTypes={href:e.string,className:e.string},h.propTypes={children:e.node,className:e.string,size:e.string};export{h as ErrorMessage,a as Heading1,r as Heading2,o as Heading3,s as Heading4,p as Link,l as Paragraph,c as SkipLink};
