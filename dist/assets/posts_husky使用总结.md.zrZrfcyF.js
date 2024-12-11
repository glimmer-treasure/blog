import{_ as i,c as a,a5 as t,o as n}from"./chunks/framework.COT_U_ro.js";const r=JSON.parse('{"title":"husky使用总结","description":"","frontmatter":{"title":"husky使用总结","abbrlink":1211766758,"date":"2021-04-21T20:42:12.000Z","tags":["前端"]},"headers":[],"relativePath":"posts/husky使用总结.md","filePath":"posts/husky使用总结.md"}'),h={name:"posts/husky使用总结.md"};function p(l,s,k,e,o,d){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="husky使用总结" tabindex="-1">husky使用总结 <a class="header-anchor" href="#husky使用总结" aria-label="Permalink to &quot;husky使用总结&quot;">​</a></h1><p>在做前端工程化时husky可以说是一个必不可少的工具。husky可以让我们向项目中方便添加git hooks。通常情况下我只需要如下两步就可在项目中引入并设置好husky：</p><ol><li><p>将husky添加到项目的开发依赖中</p><p><code>npm install -D husky</code></p></li><li><p>在package.json中设置我们需要的git hooks</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;husky&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;hooks&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;pre-commit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npm run test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在commit之前先执行npm run test命令</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;commit-msg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;commitlint -e $HUSKY_GIT_PARAMS&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 校验commit时添加的备注信息是否符合我们要求的规范</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li></ol><p>在之前的项目中我们通常都是这样完成对husky的引入和设置的。但是今天在我新建的项目中这样设置竟然不起作用了，经过一番查看才知道原来最新版本的husky（6.0.0）已经做了破坏性的变更，之前的设置方式已经失效了。</p><h2 id="husky为什么放弃了之前的配置方式" tabindex="-1">husky为什么放弃了之前的配置方式 <a class="header-anchor" href="#husky为什么放弃了之前的配置方式" aria-label="Permalink to &quot;husky为什么放弃了之前的配置方式&quot;">​</a></h2><p>根据官方的说法，之前husky的工作方式是这样的，为了能够让用户设置任何类型的git hooks都能正常工作，husky不得不创建所有类型的git hooks。这样在git 工作的每个阶段都会调用husky所设置的脚本，在这个脚本中husky会检查用户是否配置该hook，如果有就运行用户配置的命令，如果没有就继续往下执行。</p><p>这样做的好处就是无论用户设置什么类型的git hook husky都能确保其正常运行。但是缺点也是显而易见的，即使用户没有设置任何git hook，husky也向git中添加了所有类型的git hook。</p><p>那有没有可能让husky只添加我们需要的git hook呢？作者尝试过解决这个问题，但是失败了。究其失败的根本原因，就是因为husky需要在两个地方进行配置才能完成一个完整的git hook功能。一个是在package.json中配置git hook所要执行的真正命令，一个是在.git/hooks/中配置相对应的git hook。也就是说无论是添加还是删除git hook就要保证在这两个地方同步执行对应的操作。作者无法找到一个可靠的方法来同步这两个地方的配置，因此失败了。</p><p>作者认为这个问题是由husky工作模型的自身缺陷导致的，如果想要解决就不得不另辟蹊径采用一种新的工作模型。因此新版husky做了破坏性的变更。</p><h2 id="新版husky的工作原理" tabindex="-1">新版husky的工作原理 <a class="header-anchor" href="#新版husky的工作原理" aria-label="Permalink to &quot;新版husky的工作原理&quot;">​</a></h2><p>新版的husky使用了从git 2.9开始引入的一个新功能core.hooksPath。core.hooksPath可以让你指定git hooks所在的目录而不是使用默认的.git/hooks/。这样husky可以使用<code>husky install</code>将git hooks的目录指定为.husky/，然后使用<code>husky add</code>命令向.husky/中添加hook。通过这种方式我们就可以只添加我们需要的git hook，而且所有的脚本都保存在了一个地方（.husky/目录下）因此也就不存在同步文件的问题了。</p><h2 id="新版husky实践" tabindex="-1">新版husky实践 <a class="header-anchor" href="#新版husky实践" aria-label="Permalink to &quot;新版husky实践&quot;">​</a></h2><ol><li><p>安装husky</p><p><code>npm install -D husky</code></p></li><li><p>在packgae.json中添加prepare脚本</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;prepare&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;husky install&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>prepare脚本会在<code>npm install</code>（不带参数）之后自动执行。也就是说当我们执行npm install安装完项目依赖后会执行 <code>husky install</code>命令，该命令会创建.husky/目录并指定该目录为git hooks所在的目录。</p></li><li><p>添加git hooks，运行一下命令创建git hooks</p><p><code>npx husky add .husky/pre-commit &quot;npm run test&quot;</code></p><p>运行完该命令后我们会看到.husky/目录下新增了一个名为pre-commit的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。pre-commit脚本内容如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dirname</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;)/_/husky.sh&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  test</span></span></code></pre></div><p>可以看到该脚本的功能就是执行npm run test这个命令</p></li></ol><h2 id="需要注意的点" tabindex="-1">需要注意的点 <a class="header-anchor" href="#需要注意的点" aria-label="Permalink to &quot;需要注意的点&quot;">​</a></h2><p>在项目中我们会使用commit-msg这个git hook来校验我们commit时添加的备注信息是否符合规范。在以前的我们通常是这样配置：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;husky&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;hooks&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;commit-msg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;commitlint -e $HUSKY_GIT_PARAMS&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 校验commit时添加的备注信息是否符合我们要求的规范</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>在新版husky中$HUSKY_GIT_PARAMS这个变量不再使用了，取而代之的是$1。在新版husky中我们的commit-msg脚本内容如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dirname</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;)/_/husky.sh&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#--no-install 参数表示强制npx使用项目中node_modules目录中的commitlint包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commitlint</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --edit</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> $1</span></span></code></pre></div><p>这个脚本应该也能使用类似于<code>npx husk add .husky/commit-msg &quot;npx --no-install commitlint --edit $1&quot;</code>这样的命令进行添加，但是由于本人对shell编程不熟，不知道如何将$1当成一个普通的字符串输出的文件中去，所以一直没有成功。希望有知道的大神能够告诉我一下。</p><p>感谢知乎用户@chuan大佬的帮助，对于commit-msg hook我们可以使用以下命令来创建git hook所要执行的脚本 <code>npx husky add .husky/commit-msg &#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;</code></p>`,20)]))}const c=i(h,[["render",p]]);export{r as __pageData,c as default};
