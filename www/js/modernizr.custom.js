window.Modernizr=function(a,b,c){function d(a){s.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&s[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+v.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+w.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.8.3",n={},o=!0,p=b.documentElement,q="modernizr",r=b.createElement(q),s=r.style,t=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),u="Webkit Moz O ms",v=u.split(" "),w=u.toLowerCase().split(" "),x={},y=[],z=y.slice,A=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:q+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',q,'">',a,"</style>"].join(""),j.id=q,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=p.style.overflow,p.style.overflow="hidden",p.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),p.style.overflow=i),!!g},B=function(){function a(a,f){f=f||b.createElement(d[a]||"div"),a="on"+a;var g=a in f;return g||(f.setAttribute||(f=b.createElement("div")),f.setAttribute&&f.removeAttribute&&(f.setAttribute(a,""),g=e(f[a],"function"),e(f[a],"undefined")||(f[a]=c),f.removeAttribute(a))),f=null,g}var d={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return a}(),C={}.hasOwnProperty;l=e(C,"undefined")||e(C.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return C.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=z.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(z.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(z.call(arguments)))};return d}),x.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:A(["@media (",t.join("touch-enabled),("),q,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c},x.csstransitions=function(){return i("transition")};for(var D in x)l(x,D)&&(k=D.toLowerCase(),n[k]=x[D](),y.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof o&&o&&(p.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),r=j=null,n._version=m,n._prefixes=t,n._domPrefixes=w,n._cssomPrefixes=v,n.hasEvent=B,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=A,p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(o?" js "+y.join(" "):""),n}(this,this.document),Modernizr.addTest("filereader",function(){return!!(window.File&&window.FileList&&window.FileReader)});