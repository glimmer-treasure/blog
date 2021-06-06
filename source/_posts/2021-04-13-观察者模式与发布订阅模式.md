---
title: 观察者模式与发布订阅模式
abbrlink: 3859766526
date: 2021-04-13 20:43:47
tags:
---
## 观察者模式与发布订阅模式

## 观察者模式

在观察者模式下，观察者对象订阅目标对象，当目标对象发生变化时会通知所有订阅了该目标对象的观察者。

这是一个很好的设计模式，但是在实现过程中有一个问题，那就是目标对象不仅要实现一个方法去通知观察者，还要有一个方法去收集所有订阅了该目标对象的观察者。也就是说目标对象不仅要能通知观察者还要能够管理观察者。

```javascript
class Subject {
    observers = []
    // 收集和管理观察者
    subscribe(observer) {
        this.observers.push(observer)
        const unsubscribe = () => {
            this.observers = this.observers.filter(ele => ele !== observer)
        }
        return unsubscribe
    }
    notify() {
        this.observers.forEach(observer => observer.update())
    }
}

class Observer {
    constructor(fn) {
        this.fn = fn
    }
    subscribe(subject) {
        subject.subscribe(this)
    }
    update() {
        this.fn()
    }
}

const o1 = new Observer(() => console.log('o1'))
const o2 = new Observer(() => console.log('o2'))
const o3 = new Observer(() => console.log('o3'))
const sub = new Subject()

o1.subscribe(sub)
o2.subscribe(sub)
o3.subscribe(sub)

sub.notify()

```

从这段代码中我们可以看到目标对象实现了notify和subscribe两个方法还要有一个属性observers来存放所有订阅了该目标对象的观察者们。虽然观察者模式很好，但是目标对象不符合单一职责原则，因此会造成与观察者对象耦合度较高的问题。

## 发布订阅模式

为了解决观察者模式中由于目标对象职责过多而造成的目标对象与观察者对象耦合度较高的问题，人们提出发布订阅模式。在发布订阅模式中，目标对象的订阅功能和对观察者的管理功能被删除，仅保留发布（通知）功能。我们现在称其为发布者（publisher）。观察者功能不变，我们现在称之为订阅者（subscriber）。至于订阅和管理观察者的功能，我们单独抽取出来形成一个事件总线。如图所示

![](./imgs/发布订阅.png)

总体来说当发布者状态改变时只需要发出相应的事件给事件总线，至于哪个订阅者订阅了发布者以及如何通知订阅者则统统交给事件总线进行处理。这样既减少发布者（目标对象）的功能也实现了发布者（目标对象）与订阅者（观察者）的解耦。代码如下

```javascript
class EventBus {
    listeners = {}
    subscribe(eventName, subscriber) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].push(subscriber)
        } else {
            this.listeners[eventName] = [subscriber]
        }
        const unsubscribe = () => {
            this.listeners[eventName] = this.listeners[eventName].filter(ele => ele !== subscriber)
        }
        return unsubscribe
    }
    notify(eventName) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(subscriber => {
                subscriber.update()
            });
        }
    }
}

class Publisher {
    publish(eventBus, eventName) {
        eventBus.notify(eventName)
    }
}

class Subscriber {
    constructor(fn) {
        this.fn = fn
    }
    subscribe(eventBus, eventName) {
        this.unsubscribe = eventBus.subscribe(eventName, this)
    }
    update() {
        this.fn()
    }
}

const eventBus = new EventBus()
const subscribe1 = new Subscriber(() => console.log('subscribe1')).subscribe(eventBus, 'click1')
const subscribe2 = new Subscriber(() => console.log('subscribe2')).subscribe(eventBus, 'click1')
const subscribe3 = new Subscriber(() => console.log('subscribe3')).subscribe(eventBus, 'click1')
const publish1 = new Publisher()
const publish2 = new Publisher()
const publish3= new Publisher()
publish1.publish(eventBus, 'click1')
publish2.publish(eventBus, 'click1')
publish3.publish(eventBus, 'click1')
```
