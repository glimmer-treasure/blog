---
title: setState是异步更新还是同步更新
tags:
---

# setState是异步更新还是同步更新

setState是异步更新还是同步更新据说是React面试中最常问的问题了（我好像没有被问到过），作为一个使用过React的人，我觉我有必要学习一下。

## 结论

先说结论：setState在React组件的生命周期以及合成时间中表现为异步更新，但是在setTimeout、setInterval以及DOM原生事件中表现问同步更新。

## 为什么

当我们调用setState方法时，React会根据isBatchingUpdates这个变量来决定setState的行为。如果isBatchingUpdates为false则setState进行同步更新，如果为true setState不会立即执行更新而是将更新加入队列中等待以后进行批量更新。
