import{_ as e,c as a,a5 as s,o as r}from"./chunks/framework.COT_U_ro.js";const p=JSON.parse('{"title":"setState是异步更新还是同步更新","description":"","frontmatter":{"title":"setState是异步更新还是同步更新","tags":null},"headers":[],"relativePath":"drafts/setState是异步更新还是同步更新.md","filePath":"drafts/setState是异步更新还是同步更新.md"}'),o={name:"drafts/setState是异步更新还是同步更新.md"};function i(n,t,l,c,d,_){return r(),a("div",null,t[0]||(t[0]=[s('<h1 id="setstate是异步更新还是同步更新" tabindex="-1">setState是异步更新还是同步更新 <a class="header-anchor" href="#setstate是异步更新还是同步更新" aria-label="Permalink to &quot;setState是异步更新还是同步更新&quot;">​</a></h1><p>setState是异步更新还是同步更新据说是React面试中最常问的问题了（我好像没有被问到过），作为一个使用过React的人，我觉我有必要学习一下。</p><h2 id="结论" tabindex="-1">结论 <a class="header-anchor" href="#结论" aria-label="Permalink to &quot;结论&quot;">​</a></h2><p>先说结论：setState在React组件的生命周期以及合成时间中表现为异步更新，但是在setTimeout、setInterval以及DOM原生事件中表现问同步更新。</p><h2 id="为什么" tabindex="-1">为什么 <a class="header-anchor" href="#为什么" aria-label="Permalink to &quot;为什么&quot;">​</a></h2><p>当我们调用setState方法时，React会根据isBatchingUpdates这个变量来决定setState的行为。如果isBatchingUpdates为false则setState进行同步更新，如果为true setState不会立即执行更新而是将更新加入队列中等待以后进行批量更新。</p>',6)]))}const S=e(o,[["render",i]]);export{p as __pageData,S as default};
