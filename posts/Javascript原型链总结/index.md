---
title: JavaScript原型链总结
date: 2024-09-12 19:10:32
categories:
tags: 
    - JavaScript
    - 前端

---

# JavaScript原型链总结

在JavaScript中有两个重要且基础的链，一个是作用域链一个是原型链。今天对原型链做一个总结。

## 什么是原型链
什么是原型链？我们知道继承是对象语言的特性之一，任何包含对象的语言都有继承这一特性。在Java与C++中是基于类实现的继承，因此在Java与C++中访问一个对象的属性，如果该对象上没有这个属性，那么就会去父类上找该属性，如果还是没有，就会去父类的父类上找，以此类推直到找到为止；或者直到基类仍没有找到该属性，那么就返回null。JavaScript则不同，它没有采用基于类的继承实现方式，而是采用了原型链的实现方式。在JavaScript中访问一个对象的属性，如果该对象没有此属性，那么就会去该对象的原型对象上去找此属性，如果原型对象上也没有此属性，那么就去原型对象的原型对象上找此属性，以此类推，直到找到此属性为止；或者一直没有找到则返回null。
由以上可知，原型链就是JavaScript语言中实现继承的方式，也是JavaScript语言中对象属性的访问机制。

## 与原型相关的属性（\_\_proto\_\_与[[Prototype]]）

熟悉JavaScript的同学都知道，JavaScript对象的``__proto__``属性指向该对象的原型，但这是一个非标准属性。在ECMAScript 标准中对象``[[Prototype]]``的属性用于指定对象的原型，并且在标准中提供了``Object.getPrototypeOf``和``Object.setPrototypeOf``这两个方法分别用于访问和修改对象的``[[Prototype]]``属性。在下面的讲述中我们将使用ECMAScript 标准中的属性和方法来讨论JavaScript的原型链。

## 构造函数与原型链

```javascript
function Man() {}
var tom = new Man()
```

在上述代码中我们首先声明了一个函数``Man``，在JavaScript中如果在函数调用前使用``new``关键字那么该函数就变成了构造函数，函数调用就会返回该构造函数生成的实例对象。因此``Man``也是一个构造函数，所以在代码的第二行我们创建了``Man``的一个对象``tom``。通过之前的讲述，我们知道``tom``对象的``[[Prototype]]``属性保存了``tom``对象的原型。

一般来说所有通过``Man``函数创建的对象都应该共享同一个原型对象，因此该原型对象应该保存在对象的构造函数中。事实也确实如此构造函数的``prototype``属性就是所有通过此构造函数生成的对象的原型对象。因此``Object.getPrototypeOf(tom) === Man.prototype``。

既然可以通过构造函数访问对象的原型对象，那么也应该能通过原型对象访问到构造函数才对（因为构造函数和原型对象是一一对应的关系）。因此在JavaScript中原型对象的``constructor``属性指向了与原型对象相对应的构造函数。即``Object.getPrototypeOf(tom).constructor === Man``。

<BlogImage src="/Javascript原型链总结/images/构造函数与原型链.svg" caption="构造函数与原型链" />

## 普通对象的原型链

```javascript
var example = {}
```

上述代码中我们声明了一个普通对象``example``。下面我们分析一下这个普通对象``example``的原型链。

普通对象的构造函数为``Object``, 因此``example``对象的原型对象为``Object.prototype``。``Object.prototype``也是一个对象，它的原型对象为``null``。由此可知``Object.prototype``对象是一切对象的根对象。

<BlogImage src="/Javascript原型链总结/images/Javascript原型链总结/普通对象的原型链.svg" caption="普通对象的原型链" />

## 函数对象的原型链

在JavaScript中一切皆对象，函数也是对象，那么函数对象的原型链是什么呢？

```javascript
function Man() {}
var tom = new Man()
```

我们还以以上代码进行分析，我们已经知道了对象``tom``的原型为``Man.prototype``，那么``Man.prototype``的原型是什么呢？``Man.prototype``作为一个对象，是通过构造函数``Object``创建的，因此``Man.prototype``的原型是``Object.prototype``。即``Object.getPrototypeOf(Man.prototype) === Object.prototype``。因此``Man.prototype``的原型链为``Man.prototype --> Object.prototype --> null``。

<BlogImage src="/Javascript原型链总结/images/原型的原型.svg" caption="原型的原型" />

函数``Man``作为一个对象，那它的原型链是什么呢？在JavaScript中函数对象也有构造函数，函数对象的构造函数为``Function``。因此函数对象``Man``的原型为``Function.prototype``。``Function.prototype``对象作为一个普通对象，因此``Function.prototype``的原型为``Object.prototype``。所以函数对象``Man``的原型链为``Man --> Function.prototype --> Object.prototype --> null``。

<BlogImage src="/Javascript原型链总结/images/函数对象的原型链.svg" caption="函数对象的原型链" />

既然函数对象的构造函数``Function``也是一个对象那么``Function``对象的原型是什么呢？在JavaScript中，``Function``对象被认为是由``Function``构造函数生成的对象。因此``Function``对象的原型也是``Function.prototype``。即``Function``对象的原型链为``Function --> Function.prototype --> Object.prototype --> null``。

<BlogImage src="/Javascript原型链总结/images/Function对象的原型链.svg" caption="Function对象的原型链" />

## ES6中的继承与原型链

在ES6中为了让JavaScript与主流的语言更接近推出了新的``class``语法用于对象编程。虽然使用了``class``语法但是本质上还是JavaScript以前的构造函数的语法糖。下面我们讨论一下再ES6中"类"与"继承"的原型链。

```javascript
class Human {}
class Man extends Human {}
var tom = new Man()
```

上述代码中我们先声明了``Human``类，然后又声明了一个继承自``Human``类的``Man``类，最后再创造了一个``Man``类的实例对象``tom``。这里存在两条原型链。一条是: ``tom --> Man.prototype --> Human.prototype --> Object.prototype --> null``，这个是实例对象的原型链。另一条是``Man --> Human --> Function.prototype --> Object.prototype --> null``, 这个是类对象的原型链。

<BlogImage src="/Javascript原型链总结/images/类与继承的原型链.svg" caption="类与继承的原型链" />