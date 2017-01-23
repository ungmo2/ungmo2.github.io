---
layout: post
title: Javascript <strong>Object-Oriented Programming</strong>
subtitle: 자바스크립트 객체지향 프로그래밍
categories: javascript
section: javascript
---

* TOC
{:toc}

Javascript는 멀티-패러다임 언어로 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향형 언어다.

비록 다른 객체지향 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, Javascript는 강력한 객체지향 프로그래밍 능력들을 지니고 있다. 간혹 클래스가 없어서 객체지향이 아니라고 생각하는 사람들도 있으나 프로토타입 방식의 객체지향 언어다.

프로토타입 기반 언어인 자바스크립트와 클래스 기반 언어의 특성을 구분해서 파악할 필요가 있다.

<!-- # 1. 객체지향 프로그래밍 (Object-Oriented Programming)

객체지향 프로그래밍은 실제 세계에 기반한 모델을 만들기 위해 추상화를 사용하는 프로그래밍 패러다임이다.

오늘날 많은 유명한 프로그래밍 언어(Java, C++, C#, Python, PHP, Ruby, Object-C)는 객체지향 프로그래밍을 지원한다.

객체지향 프로그래밍은 함수들의 집합 혹은 단순한 컴퓨터의 명령어들의 목록이라는 기존의 프로그래밍에 대한 전통적인 관점에 반하여, 관계성있는 객체들의 집합이라는 관점으로 접근하는 소프트웨어 디자인으로 볼 수 있다.

각 객체는 메시지를 받을 수도 있고, 데이터를 처리할 수도 있으며, 또다른 객체에게 메시지를 전달할 수도 있다. 각 객체는 별도의 역할이나 책임을 갖는 작은 독립적인 기계 또는 부품으로 볼 수 있다.

객체지향 프로그래밍은 보다 유연하고 유지보수하기 쉬우며 확장성 측면에서서도 유리한 프로그래밍을 하도록 의도되었고, 대규모 소프트웨어 개발에 널리 사용되고 있다.

객체지향 프로그래밍이 갖는 modularity(모듈화)에 기반한 강력한 힘에 의해, 객체지향적인 코드는 개발을 보다 단순하게 했고, 시간이 흐른 뒤에도 보다 쉽게 이해할 수 있도록 했으며, 복잡한 상황이나 절차들을 덜 모듈화된 프로그래밍 방법들보다 더 직접적으로 분석하고, 코딩하고, 이해할 수 있도록 만들었다. -->

# 1. Class, Constructor, Method

클래스 기반 언어(Java, C++, C#, Python, PHP, Ruby, Object-C)의 클래스란 같은 종류의 집단에 속하는 속성(attribute)과 행위(behavior)를 정의한 것으로 객체지향 프로그램의 기본적인 사용자 정의 데이터형(user define data type)이라고 할 수 있다. 결국 클래스는 객체 생성에 사용되는 패턴 혹은 청사진(blueprint) 이다.

클래스 기반 언어는 클래스로 객체의 기본적인 형태와 기능을 정의하고 생성자로 인스턴스를 생성하여 사용한다. 이런 형태의 언어에서 모든 인스턴스는 오직 클래스에서 정의된 범위 내에서만 작동하며 런타임에 그 구조를 변경할 수 없다. 반면 프로토타입 기반 언어는 객체의 자료구조(Property)와 메서드를 동적으로 변경할 수 있다.

정확성, 안정성, 예측성 측면에서 클래스 기반 언어가 프로토타입 기반 언어보다 좀 더 나은 결과를 보장한다. 하지만 프로토타입 기반 언어는 동적으로 객체의 구조와 동작 방식을 변경할 수 있다는 장점이 있다.

Java나 C#, C++과 같은 클래스 기반 언어는 class 키워드를 제공하고 이것으로 클래스를 정의할 수 있다. 생성자는 클래스명과 동일하며 메서드로 구현된다.

```java
class Person {
  private String name;

  public Person(String name) {
    this.name = name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }
}

public class MainClass {
  public static void main(String[] args) {
    Person me = new Person("Lee");

    String name= me.getName();
    System.out.println(name); // Lee

    me.setName("Kim");

    name= me.getName();
    System.out.println(name); // Kim
  }
}
```

자바스크립트의 객체 생성 방식은 클래스 기반 언어와는 다르다. 자바스크립트는 객체를 생성하기 위해 먼저 class를 만들 필요가 없다. class문을 흔하게 볼 수 있는 C++이나 자바와는 달리 자바스크립트는 class문이 포함되지 않은 프로토타입 기반 언어이다.

프로토타입 기반 프로그래밍은 클래스가 존재하지 않는 객체지향 프로그래밍 스타일로 프로토타입 체인과 클로저 등으로 객체 지향 언어의 상속, 캡슐화(정보 은닉) 등의 개념을 구현할 수 있다.

이로 인해 때때로 class 기반 언어에 익숙한 프로그래머들은 혼란을 일으킨다. 자바스크립트에서는 함수 객체로 많은 것을 할 수 있는데 클래스, 생성자, 메서드도 모두 함수로 구현이 가능하다.

[ECMAScript 6](./js-es6)에서 새롭게 [클래스](./js-es6#class)가 도입되었다. ES6의 Class는 기존 prototype 기반 객체지향 프로그래밍보다 Class 기반 언어에 익숙한 프로그래머가 보다 빠르게 학습할 수 있는 단순하고 깨끗한 새로운 문법을 제시하고 있다. ES6의 Class가 새로운 객체지향 모델을 제공하는 것이 아니며 Class도 사실 함수이고 기존 prototype 기반 패턴의 [Syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)이다.
{: .info}

```javascript
function Person(name) {
  this.name = name;

  this.setName = function(name) {
    this.name = name;
  }
  this.getName = function() {
    return this.name;
  }
}

var me = new Person('Lee');
console.log(me.getName());

me.setName('Kim');
console.log(me.getName());
```

클래스 기반 언어의 인스턴스 생성과 매우 유사한 방식으로 객체를 생성할 수 있다. 생성자 함수 Person은 클래스이자 생성자의 역할을 한다.

하지만 이 코드는 문제가 많다. Person 생성자 함수로 여러개의 객체를 생성해보자.

```javascript
var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('Choi');
```

이 방식으로 객체를 생성하면 메서드 setName, getName이 중복되어 생성된다. 즉, 각 인스턴스가 동일한 메서드를 각자 소유한다. 이는 메모리 낭비인데 생성되는 인스턴스가 많아지거나 메서드가 크거나 많다면 무시할 수 없는 문제이다.

이같은 문제를 해결하려면 다른 접근 방식이 필요한데 그 해답은 프로토타입이다.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.setName = function(name) {
  this.name = name;
}
Person.prototype.getName = function() {
  return this.name;
}

var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('choi');

console.log(me.getName());
console.log(you.getName());
console.log(him.getName());

me.setName('me');
you.setName('you');
him.setName('him');

console.log(me.getName());
console.log(you.getName());
console.log(him.getName());
```

![prototype](/img/prototype.png)

Person() 생성자 함수의 prototype 프로퍼티가 가리키는 프로토타입 객체에 메서드를 추가하면 프로토타입 체인에 의해 모든 인스턴스는 추가된 메서드에 접근할 수 있다.

아래는 더글라스 크락포드가 제안한 프로토타입 객체에 메서드를 추가하는 방식이다.

```javascript
Function.prototype.method = function(name, func) {
  if(!this.prototype[name]) // 동일한 이름의 메서드가 없으면 메서드를 추가
    this.prototype[name] = func;
}

function Person(name) {
  this.name = name;
}

Person.method('setName', function(name) {
  this.name = name;
});

Person.method('getName', function() {
  return this.name;
});

var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('choi');

console.log(me.getName());
console.log(you.getName());
console.log(him.getName());

me.setName('me');
you.setName('you');
him.setName('him');

console.log(me.getName());
console.log(you.getName());
console.log(him.getName());
```
<!--
## 1.2 Object (객체)

클래스의 인스턴스(실제로 메모리상에 할당된 것)이다. 객체는 자신 고유의 속성(attribute)을 가지며 클래스에서 정의한 행위(behavior)를 수행할 수 있다.

## 1.3 Property

객체의 속성으로 field, member, attribute 등과 같은 의미이다.

  프로퍼티란 객체의 일부로서 이름과 값의 쌍을 가지는 정보를 의미한다. 객체는 프로퍼티들을 포함하는 컨테이너라고 할 수 있다.

## 1.4 Method  
객체의 행위/능력(예: 걷기)이다. 프로퍼티의 값이 함수일 때 이것을 메서드라 한다.

메서드는 객체가 가지고 있는 동작(절차,방법,기능)이다. 기본적으로 함수와 메서드가 서로 일련의 동작을 실행하는 구문들의 집합이라는 점에서 동일하지만 메서드는 객체가 가지고 있는 동작이라는 점에서 차이가 있다.

메서드를 수행하기 위해서는 객체를 통해서 해당 메서드를 수행하여야 한다. 즉 그 동작을 수행하는 주체는 객체이며 그 동작을 수행하기 위해서는 객체에게 그 동작을 수행하라고 지시해야 한다. 함수는 그 동작을 수행하기 위해 객체에게 어떤을 동작을 수행하라고 명령하지 않아도 된다. (함수는 자체가 그 동작을 정의한 객체이다.)

즉, 메서드는 객체를 움직이는 동작이며 그 동작을 수행하기 위해서 객체의 정보인 프로퍼티를 사용할 수 있다.

## 1.5 Constructor (생성자)  

인스턴스화 되는 시점에서 호출되는 메서드이다.

## 1.6 Abstraction (추상화)  

현실세계의 사실을 그대로 객체로 표현하기 보다는 문제의 중요한 측면을 주목하여 상세내역을 없애나가는 과정을 의미한다. 객체지향에서는 클래스를 통해서 추상화를 지원하고 있으며, 이것은 다른 전통적 프로그래밍보다 강력한 추상화의 방법이다.

## 1.7 Encapsulation (캡슐화)

객체의 상세한 내용을 객체 외부에 철저히 숨기고 단순히 메시지만으로 객체와의 상호작용을 하게 하는 것을 말하며 다른 말로 정보 은닉(information hiding)이라고 한다. 즉, 캡슐화는 추상화와 거의 같은 개념이지만 추상화를 지원하며 보다 구체적이고 제한적이다.

  Java의 경우, 클래스를 선언하고 그 클래스를 구성하는 객체에 대하여 `public` 또는 `private` 등으로 한정할 수 있다. `public`으로 선언된 메서드 또는 데이터는 외부에서 사용이 가능하며, `private`으로 선언된 경우는 외부에서 참조할 수 없고 내부에서만 사용된다.

  이것은 클래스 외부에는 제한된 접근 권한을 제공하며 원하지 않는 외부의 접근에 대해 내부를 보호하는 작용을 한다. 이렇게 함으로써 이들 부분이 프로그램의 다른 부분들에 영향을 미치지 않고 변경될 수 있다.

## 1.8 Inheritance (상속)

추상화는 복잡한 프로그램을 간단하게 해주고 분석의 초점을 명확히 할 수 있다. 캡슐화는 객체의 내부구조와 실체를 분리함으로써 내부의 변경이 소스 프로그램에 미치는 영향을 최소화한다. 따라서 유지보수도 용이해진다.

  상속은 객체기술의 가장 핵심이 되는 개념으로 프로그램을 쉽게 확장할 수 있도록 해주는 강력한 수단이 된다. 앞의 두 개념은 객체지향이 아닌 개발 방법에서도 흉내를 낼 수 있으나 이것은 객체지향 언어와 개발 방법만의 특성이다.

  상속은 코드 재사용의 한 형태로 만약 새로 만들 클래스가 기존 클래스와 유사하다면 상속을 통해 동일한 부분은 그대로 사용하고 다른 부분만 구현하면 된다.  

  ```java
  class Animal {
    public Animal() {
      System.out.println("A new animal has been created!");
    }

    public void sleep() {
      System.out.println("An animal sleeps...");
    }

    public void eat() {
      System.out.println("An animal eats...");
    }
  }

  class Bird extends Animal {
    public Bird() {
      super();
      System.out.println("A new bird has been created!");
    }

    @Override
    public void sleep() {
      System.out.println("A bird sleeps...");
    }

    @Override
    public void eat() {
      System.out.println("A bird eats...");
    }
  }

  public class MainClass {
    public static void main(String[] args) {
      Animal animal = new Animal();
      Bird bird = new Bird();

      animal.sleep();
      animal.eat();

      bird.sleep();
      bird.eat();
    }
  }
  ```

  코드의 재사용은 소프트웨어 개발 비용을 현저하게 줄일 수 있는 잠재력이 있기 때문에 매우 중요하다.

## 1.9 Polymorphism (다형성)

동일한 이름의 메서드나 클래스가 있을 때 이것들이 다양한 방법으로 동작하는 것을 의미한다. 키보드의 키를 사용하는 방법은 '누른다'이지만 똑같은 동작 방법의 키라고 하더라도 ESC는 취소를 ENTER는 실행의 목적을 가지고 있다. 다형성이란 동일한 조작방법으로 동작시키지만 동작의 내용은 서로 다른 것을 의미한다.

## 1.10 객체 지향 5원칙

객체지향에서 지켜야 할 5개의 원칙을 말한다.   
[참고 : SOLID](https://ko.wikipedia.org/wiki/SOLID)  

  * 단일 책임 원칙 (Single responsibility principle)  
    한 클래스는 하나의 책임만 가져야 한다.

  * 개방-폐쇄 원칙 (Open/closed principle)  
    “소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.”

  * 리스코프 치환 원칙 (Liskov substitution principle)  
    “프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.”

  * 인터페이스 분리 원칙 (Interface segregation principle)  
    “특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.”

  * 의존관계 역전 원칙 (Dependency inversion principle)  
    프로그래머는 “추상화에 의존해야지, 구체화에 의존하면 안된다.” 의존성 주입은 이 원칙을 따르는 방법 중 하나다. -->

# 2. Inheritance (상속)

Java같은 클래스 기반 언어에서 상속(또는 확장)은 코드 재사용의 관점에서 매우 유용하다. 새롭게 정의할 클래스가 기존에 있는 클래스와 매우 유사하다면, 상속을 통해 다른 점만 구현하면 된다. 코드 재사용은 개발 비용을 현저히 줄일 수 있는 잠재력이 있기 때문에 매우 중요하다.

클래스 기반 언어의 객체는 클래스의 인스턴스이며 클래스는 다른 클래스로 상속될 수 있다. 자바스크립트는 클래스 패턴처럼 상속할 수 있지만 그 보다 더 표현적인 다른 패턴들도 지원한다. 훨씬 복잡한 방법들도 있지만 언제나 최선의 방법은 항상 단순함을 유지하는 것이다.

자바스크립트는 프로토타입 기반 언어인데 이 말은 객체가 다른 객체로 바로 상속된다는 것이다. 이러한 점이 자바스크립트의 약점으로 여겨지기도 하지만 프로토타입 상속 모델은 사실 고전적인 방법보다 강력한 방법이다. 프로토타입 기반 언어에서 고전적인 방식을 구현하는 것은 간단하지만 그 반대는 훨씬 더 어려운 일이다.

## 2.1 의사 클래스(Pseudo-classical) 패턴

자바스크립트는 자신의 프로토타입 본질과 모순되는 점이 있다. 클래스와 비슷하게 보이는 일부 복잡한 구문은 프로토타입 메커니즘을 명확히 나타내지 못하게 한다.

프로토타입 본성에 맞게 객체에서 다른 객체로 직접 상속하는 방법을 갖는 대신 생성자 함수를 통해 객체를 생성하는 불필요한 간접적인 단계가 있다.

```javascript
// 생성자 정의
var Mammal = function (name) {
  this.name = name;
};

// prototype 속성에 새로운 메서드 추가
Mammal.prototype.get_name = function ( ) {
  return this.name;
};

// prototype 속성에 새로운 메서드 추가
Mammal.prototype.says = function ( ) {
  return this.saying || '';
};

// 인스턴스 생성
var me = new Mammal('Lee');
var name = me.get_name( ); // 'Lee'

console.log(name);
```

![mammal](/img/mammal.png)
{: .w-450}

이제 생성자 함수를 정의하고 이 함수의 prototype을 Mammal 인스턴스로 대체하는 방식으로 또 다른 의사 클래스(Pseudo-class)를 만들 수 있다.

```javascript
var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
};

// Cat.prototype을 Mammal의 새 인스턴스로 대체
Cat.prototype = new Mammal();

// purr 메서드 추가.
Cat.prototype.purr = function (n) {
  var i, s = '';
  for (i = 0; i < n; i++) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};

// get_name 메서드를 Override
Cat.prototype.get_name = function ( ) {
  return this.says( ) + ' ' + this.name + ' ' + this.says( );
};

var myCat = new Cat('Mary');
var says = myCat.says( );
var purr = myCat.purr(5);
var name = myCat.get_name( );

console.dir(myCat);
console.log(says); // 'meow'
console.log(purr); // 'r-r-r-r-r'
console.log(name); // 'meow Mary meow'
```

![cat](/img/cat.png)

의사 클래스 패턴은 객체지향처럼 보이게 고안 됐지만 `private`는 전혀 없고 모든 프로퍼티는 `public`이다. 그리고 부모 메서드로 접근도 할 수 없다.

설상가상으로 생성자 함수의 사용에는 심각한 위험이 존재한다. 만약 생성자 함수를 호출할 때 `new` 연산자를 포함하는 것을 잊게 되면 `this`는 새로운 객체와 바인딩되지 않고 전역객체에 바인딩된다. (`new` 연산자와 함께 호출된 생성자 함수 내부의 `this`는 새로 생성된 객체를 참조한다.)

이런 문제점을 경감시키기 위해 파스칼 표시법(첫글자를 대문자 표기)으로 생성자 함수 이름을 표기하는 방법을 사용하지만, 이러한 방법보다 더 나은 대안은 `new` 를 사용하는 방식을 피하는 것이다.

## 2.2 프로토타입 패턴

순수하게 프로토타입에 기반한 패턴에서는 클래스가 필요없다. 프로토타입에 의한 상속은 개념적으로 클래스에 의한 상속보다 더 간단하다.

일단 객체를 생성한다.

```javascript
var myMammal = {
  name : 'Lee',
  get_name : function ( ) {
    return this.name;
  },
  says : function ( ) {
    return this.saying || '';
  }
};
```

[Object.create 메서드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)를 사용하여 더 많은 인스턴스를 생성할 수 있다. 그리고 나서 새로 만든 인스턴스에 필요한 메서드나 속성들을 추가할 수 있다.

`Object.create` 메서드는 매개변수에 전달한 프로토타입 객체를 상속하는 새로운 객체를 생성한다. 이 메서드의 폴리필(Polyfill: 특정 기능이 지원되지 않는 브라우저를 위해 사용할 수 있는 코드 조각이나 플러그인)을 살펴보자.

```javascript
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}  // 1
    F.prototype = o; // 2
    return new F();  // 3
  };
}
```

위 코드 후반부 3 line은 프로토타입 상속의 핵심을 담고 있다.

1. 비어있는 함수 객체 F를 생성한다.

2. 함수 객체 F.prototype 프로퍼티에 매개변수로 들어온 객체를 참조한다.

3. 함수 객체 F를 생성자로 하여 새로운 객채를 생성하고 반환한다.

![object.create()](/img/object_create.png)
{: .w-450}

`Object.create` 메서드를 사용하여 인스턴스를 생성하고 새로 만든 인스턴스에 필요한 메서드나 속성들을 추가하여 보자.

```javascript
// 새로운 인스턴스 생성
var myCat = Object.create(myMammal);

myCat.name = 'Mary';
myCat.saying = 'meow';
myCat.purr = function (n) {
  var i, s = '';
  for (i = 0; i < n; i++) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
myCat.get_name = function ( ) {
  return this.says( ) + ' ' + this.name + ' ' + this.says( );
};
```

![inheritance prototype](/img/inheritance_proto.png)
{: .w-400}

이러한 방법은 클래스에 의한 상속과는 분병히 구별되는 상속 방법이다.

프로토타입에 의한 상속 패턴의 한가지 단점은 `private` 프로퍼티를 가질 수 없다는 것이다. 객체의 모든 속성은 `public`이다.

## 2.3 함수형 패턴

지금까지 살펴본 방식들의 공통된 단점은 `private` 프로퍼티를 가질 수 없다는 것이다.

```javascript
var mammal = function(spec) {
  // private vars, methods

  // Object to return
  var that = {};

  that.get_name = function( ) {
    return spec.name;
  };
  that.says = function ( ) {
    return spec.saying || '';
  };

  return that;
};

var myMammal = mammal({name: 'Lee'});
```

- 필요한 private 변수와 메서드를 정의한다. 객체에 담아 반환하지 않는 함수 내 변수와 매개변수는 private이다.  
- `spec` 객체에 인스턴스 생성 시 필요한 모든 정보를 담아 Constructor에 전달한다.  
- `that` 에 새로운 객체를 할당하고 메서드를 추가한다. 이때 추가되는 메서드는 함수의 매개변수와 private에 접근할 수 있다.  
- `that`을 리턴한다.

```javascript
var cat = function (spec) {
  spec.saying = spec.saying || 'meow';

  // Inheritance (that은 super이다)
  var that = mammal(spec);

  that.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i++) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  that.get_name = function ( ) {
    return that.says( ) + ' ' + spec.name + ' ' + that.says( );
  };

  return that;
};

var myCat = cat({name: 'Mary'});

var says = myCat.says( );     // 'meow'
var purr = myCat.purr(5);     // 'r-r-r-r-r'
var name = myCat.get_name( ); // 'meow Mary meow'
```

함수형 패턴은 유연하며 의사 클래스 패턴보다 작업량이 적고 캡슐화, 정보은닉을 제공한다. 그리고 super 메서드에 접근할 수도 있다.

# 3. Encapsulation(캡슐화)와 Module Pattern(모듈 패턴)

캡슐화는 기본적으로 관련된 여러 정보를 하나의 틀 안에 담는 것으로 객체 지향 언어에서 상당히 중요한 개념이다. 관련있는 멤버 변수와 메서드를 클래스와 같은 하나의 틀 안에 담고 외부에 공개될 필요가 없는 정보는 숨길 수 있는데 이를 정보 은닉(information hiding)이라고 한다.

Java의 경우, 클래스를 정의하고 그 클래스를 구성하는 멤버에 대하여 `public` 또는 `private` 등으로 한정할 수 있다. `public`으로 선언된 메서드 또는 데이터는 외부에서 사용이 가능하며, `private`으로 선언된 경우는 외부에서 참조할 수 없고 내부에서만 사용된다.

이것은 클래스 외부에는 제한된 접근 권한을 제공하며 원하지 않는 외부의 접근에 대해 내부를 보호하는 작용을 한다. 이렇게 함으로써 이들 부분이 프로그램의 다른 부분들에 영향을 미치지 않고 변경될 수 있다.

하지만 자바스크립트는 `public` 또는 `private` 등의 키워드를 제공하지 않는다. 하지만 정보 은닉이 불가능한 것은 아니다.

```javascript
var Person = function(arg) {
  var name = arg ? arg : ''; // ①

  this.getName = function() {
    return name;
  };

  this.setName = function(arg) {
    name = arg;
  };
}

var me = new Person('Lee');

var name = me.getName();

console.log(name);

me.setName('Kim');
name = me.getName();

console.log(name);
```

①의 name 변수는 private 변수가 된다. 자바스크립트는 function-level scope를 제공하므로 함수 내의 변수는 외부에서 참조할 수 없다. 만약에 var 때신 this를 사용하면 public 멤버가 된다. 단 new 키워드로 객체를 생성하지 않으면 this는 생성된 객체에 바인딩되지 않고 전역객체에 연결된다.

그리고 public 메서드 getName, setName은 클로저로서 private 변수(자유 변수)에 접근할 수 있다. 이것이 기본적인 정보 은닉 방법이다.

위 예제를 조금 더 정리해보자.

```javascript
var person = function(arg) {
  var name = arg ? arg : '';

  return {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    }
  }
}

var me = person('Lee'); /* or var me = new person('Lee'); */

var name = me.getName();

console.log(name);

me.setName('Kim');
name = me.getName();

console.log(name);
```

person 함수는 객체를 반환한다. 이 객체 내의 메서드 getName, setName은 클로저로서 private 변수 name에 접근할 수 있다. 이러한 방식을 `모듈 패턴`이라 하며 캡슐화와 정보 은닉를 제공한다. 많은 라이브러리에서 사용되는 유용한 패턴이다.

이 모듈 패턴은 다음과 같은 주의할 점이 있다.

- private 멤버가 객체나 배열일 경우, 반환된 해당 멤버의 변경이 가능하다.

```javascript
var person = function(personInfo) {
  var o = personInfo;

  return {
    getPersonInfo: function() {
      return o;
    }
  }
}

var me = person({name:'Lee',gender:'male'});

var myInfo = me.getPersonInfo();
console.log('myInfo: ', myInfo);

myInfo.name = 'Kim';

myInfo = me.getPersonInfo();
console.log('myInfo: ', myInfo);
```

객체를 반환하는 경우 반환값은 얕은 복사(shallow copy)로 private 멤버의 [참조값](./js-object#pass-by-reference)을 반환하게 된다. 따라서 외부에서도 private 멤버의 값을 변경할 수 있다. 이를 회피하기 위해서는 객체를 그대로 반환하지 않고 반환해야 할 객체의 정보를 새로운 객체에 담아 반환해야 한다. 반드시 객체 전체가 그대로 반환되어야 하는 경우에는 깊은 복사(deep copy)로 복사본을 만들어 반환한다.

<!--
객체를 깊은 복사하는 방법은 아래와 같다.

    * JSON의 직렬화 기법

    ```javascript
    var foo = {};
    var bar = JSON.parse(JSON.stringify(foo));
    console.log(foo === bar);
    ```

    * jQuery의 extend 메서드

    ```javascript
    var foo = {};
    var bar = $.extend(true, {}, foo);
    console.log(foo === bar);
    ```

    [참고](http://heyjavascript.com/4-creative-ways-to-clone-objects/)
-->

- person 함수가 반환한 객체는 person 함수 객체의 프로토타입에 접근할 수 없다. 이는 상속을 구현할 수 없음을 의미한다.

앞에서 살펴본 모듈 패턴은 생성자 함수가 아니며 단순히 메서드를 담은 객체를 반환한다. 반환된 객체는 객체 리터럴 방식으로 생성된 객체로 함수 person의 프로토타입에 접근할 수 없다.

```javascript
var person = function(arg) {
  var name = arg ? arg : '';

  return {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    }
  }
}

var me = person('Lee');

console.log(person.prototype === me.__proto__); // false
console.log(me.__proto__ === Object.prototype); // true: 객체 리터럴 방식으로 생성된 객체와 동일하다
```

![module pattern](/img/module_pattern_1.png)
{: .w-450}

반환된 객체가 함수 person의 프로토타입에 접근할 수 없다는 것은 person을 부모 객체로 상속할 수 없다는 것을 의미한다. <!-- 따라서 함수 person가 여러개의 객체를 반환할 경우 반환된 객체는 프로토타입 체인에 의해 프로토타입 객체의 메서드를 참조할 수 없으므로 메서드 setName, getName를 담은 객체가 중복되어 생성된다. -->

이 문제를 해결하기 위해서는 객체를 반환하는 것이 아닌 함수를 반환해야 한다.

```javascript
var Person = function() {
  var name;

  var F = function(arg) { name = arg ? arg : ''; };

  F.prototype = {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    }
  };

  return F;
}();

var me = new Person('Lee');

console.log(Person.prototype === me.__proto__);

console.log(me.getName());
me.setName('Kim')
console.log(me.getName());
```

![module pattern](/img/module_pattern_2.png)
{: .w-650}

<!-- IIFE(즉시호출함수표현식: Immediately Invoke Function Expression)가 동작하여 변수 Person에 F 생성자 함수가 할당되었다. 결국 new Person()과 new F()는 같은 의미가 된다. Person.prototype의 메서드 getName, setName은 클로저로서 private 변수(자유 변수)에 접근할 수 있다.

그런데 위 예제도 문제가 있다. 모듈 패턴이 IIFE에 의해 반환한 생성자 함수는 유일한 함수 객체(Singleton)이다. IIFE은 단 한번만 실행되기 때문인데 그 결과 이 생성자 함수로 여러개의 객체를 생성했을 때 각 객체는 자유변수를 공유하게 된다. 즉, 상기 패턴은 단일 객체 생성에 적합하며 복수의 객체 생성에 적합하지 않다.

```javascript
me.setName('Lee')
console.log(me.getName());  // `Lee`

you.setName('Park')
console.log(you.getName()); // 'Park'

console.log(me.getName());  // 'Park'
```

복수의 객체를 지원하기 위해서 다른 방법을 찾아보자. -->

<!--
NOTE:
아래 예제는 올바르지 않다...
return new F()는 새로운 객체를 생성하여 반환하는데 여러개의 객체를 생성할 경우 각 객체의 __proto__은 별도 존재하게 된다.

console.log(me.__proto__ === you.__proto__); // false

캡슐화와 상속은 별개 개념이므로 캡슐화로 만들어진 객체의 상속은 일반 상속 방식을 따르면 될 것이다..
2016.5.6 ungmo2 wrote
 -->
<!--

```javascript
var Person = function(arg) {
  var name;

  function F(arg) {
    name = arg ? arg : '';
    console.log('hello');
  };

  F.prototype = {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    }
  };

  return new F(arg);
};

var me  = Person('Lee'); /* or var me = new person('Lee'); */
var you = Person('Kim');

console.log((Person.prototype === me.__proto__) && (Person.prototype === you.__proto__));

console.log(me.getName());

me.setName('Choi')
console.log(me.getName());

console.log(you.getName());

you.setName('Park')
console.log(you.getName());
```

![module pattern](/img/module_pattern_3.png)
{: style="max-width:730px; margin:10px auto;"}

-->

캡슐화를 구현하는 패턴은 다양하며 각각의 패턴에는 장단점이 있다. 다양한 패턴의 장단점을 분석하고 파악하는 것이 보다 효율적인 코드를 작성하는데 중요하다.

지금까지 자바스크립트에서의 객체지향 프로그래밍을 구현하는 방법을 알아보았다. 사실 자바스크립트는 클래스 기반 언어가 아니므로 기존의 전통적 방식으로 구현하려는 시도는 바른 판단은 아니다. 다만 객체지향 프로그래밍이 추구하는 재사용성, 유지보수의 용이성 등을 극대화하기 위한 노력의 일환으로 보아야 한다. 자바스크립트만의 방식을 잘 활용하여 기존의 방식에 얽매이지 않는다면 보다 효율적인 프로그래밍이 가능할 것이다.
