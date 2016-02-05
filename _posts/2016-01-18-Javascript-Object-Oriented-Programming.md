---
layout: post
title: Javascript Object-Oriented Programming
categories: javascript
tags: []
---
# 객체지향 프로그래밍 (Object-Oriented Programming)

객체지향 프로그래밍은 실제 세계에 기반한 모델을 만들기 위해 추상화를 사용하는 프로그래밍 패러다임이다.

오늘날, 많은 유명한 프로그래밍 언어(Java, C++, C#, Python, PHP, Ruby, Object-C)는 객체지향 프로그래밍을 지원한다.

객체지향 프로그래밍은 함수들의 집합 혹은 단순한 컴퓨터의 명령어들의 목록이라는 기존의 프로그래밍에 대한 전통적인 관점에 반하여, 관계성있는 객체들의 집합이라는 관점으로 접근하는 소프트웨어 디자인으로 볼 수 있다.

각 객체는 메시지를 받을 수도 있고, 데이터를 처리할 수도 있으며, 또다른 객체에게 메시지를 전달할 수도 있다. 각 객체는 별도의 역할이나 책임을 갖는 작은 독립적인 기계 또는 부품으로 볼 수 있는 것이다.

객체지향 프로그래밍은 보다 유연하고 유지보수하기 쉬우며 확장성 측면에서서도 유리한 프로그래밍을 하도록 의도되었고, 대규모 소프트웨어 개발에 널리 사용되고 있다.

객체지향 프로그래밍이 갖는 modularity(모듈화)에 기반한 강력한 힘에 의해, 객체지향적인 코드는 개발을 보다 단순하게 했고, 시간이 흐른 뒤에도 보다 쉽게 이해할 수 있도록 했으며, 복잡한 상황이나 절차들을 덜 모듈화된 프로그래밍 방법들보다 더 직접적으로 분석하고, 코딩하고, 이해할 수 있도록 만들었다.

# Terms

* Class  
같은 종류의 집단에 속하는 속성(attribute)과 행위(behavior)를 정의한 것으로 객체지향 프로그램의 기본적인 사용자 정의 데이터형(user define data type)이라고 할 수 있다. 결국 클래스는 객체 생성에 사용되는 패턴 혹은 청사진 (blueprint) 이다.

* Object (객체)  
클래스의 인스턴스(실제로 메모리상에 할당된 것)이다. 객체는 자신 고유의 속성(attribute)을 가지며 클래스에서 정의한 행위(behavior)를 수행할 수 있다.

* Property  
객체의 속성으로 field, member, attribute 등과 같은 의미이다.

  프로퍼티란 객체의 일부로서 이름과 값의 쌍을 가지는 정보를 의미한다. 객체는 프로퍼티들을 포함하는 컨테이너라고 할 수 있다.

* Method  
객체의 행위/능력(예: 걷기)이다. 프로퍼티의 값이 함수일 때 이것을 메서드라 한다.

  메서드는 객체가 가지고 있는 동작(절차,방법,기능)이다. 기본적으로 함수와 메서드가 서로 일련의 동작을 실행하는 구문들의 집합이라는 점에서 동일하지만 메서드는 객체가 가지고 있는 동작이라는 점에서 차이가 있다.

  메서드를 수행하기 위해서는 객체를 통해서 해당 메서드를 수행하여야 한다. 즉 그 동작을 수행하는 주체는 객체이며 그 동작을 수행하기 위해서는 객체에게 그 동작을 수행하라고 지시해야 한다. 함수는 그 동작을 수행하기 위해 객체에게 어떤을 동작을 수행하라고 명령하지 않아도 된다. (함수는 자체가 그 동작을 정의한 객체이다.)

  즉, 메서드는 객체를 움직이는 동작이며 그 동작을 수행하기 위해서 객체의 정보인 프로퍼티를 사용할 수 있다.

* Constructor (생성자)  
인스턴스화 되는 시점에서 호출되는 메서드이다.

* Abstraction (추상화)  
현실세계의 사실을 그대로 객체로 표현하기 보다는 문제의 중요한 측면을 주목하여 상세내역을 없애나가는 과정을 의미한다. 객체지향에서는 클래스를 통해서 추상화를 지원하고 있으며, 이것은 다른 전통적 프로그래밍보다 강력한 추상화의 방법이다.

* Encapsulation (캡슐화)  
객체의 상세한 내용을 객체 외부에 철저히 숨기고 단순히 메시지만으로 객체와의 상호작용을 하게 하는 것을 말하며 다른 말로 정보 은닉(information hiding)이라고 한다. 즉, 캡슐화는 추상화와 거의 같은 개념이지만 추상화를 지원하며 보다 구체적이고 제한적이다.

  Java의 경우, 클래스를 선언하고 그 클래스를 구성하는 객체에 대하여 `public` 또는 `private` 등으로 한정할 수 있다. `public`으로 선언된 메서드 또는 데이터는 외부에서 사용이 가능하며, `private`으로 선언된 경우는 외부에서 참조할 수 없고 내부에서만 사용된다.

  이것은 클래스 외부에는 제한된 접근 권한을 제공하며 원하지 않는 외부의 접근에 대해 내부를 보호하는 작용을 한다. 이렇게 함으로써 이들 부분이 프로그램의 다른 부분들에 영향을 미치지 않고 변경될 수 있다.

* Inheritance (상속)  
추상화는 복잡한 프로그램을 간단하게 해주고 분석의 초점을 명확히 할 수 있다. 캡슐화는 객체의 내부구조와 실체를 분리함으로써 내부의 변경이 소스 프로그램에 미치는 영향을 최소화한다. 따라서 유지보수도 용이해진다.

  상속은 객체기술의 가장 핵심이 되는 개념으로 프로그램을 쉽게 확장할 수 있도록 해주는 강력한 수단이 된다. 앞의 두 개념은 객체지향이 아닌 개발 방법에서도 흉내를 낼 수 있으나 이것은 객체지향 언어와 개발 방법만의 특성이다.

  상속은 코드 재사용의 한 형태로 만약 새로 만들 클래스가 기존 클래스와 유사하다면 상속을 통해 동일한 부분은 그대로 사용하고 다른 부분만 구현하면 된다.  

  ```java
  public class Animal {
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

  public class Bird extends Animal {
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

* Polymorphism (다형성)  
동일한 이름의 메서드나 클래스가 있을 때 이것들이 다양한 방법으로 동작하는 것을 의미한다. 키보드의 키를 사용하는 방법은 '누른다'이지만 똑같은 동작 방법의 키라고 하더라도 ESC는 취소를 ENTER는 실행의 목적을 가지고 있다. 다형성이란 동일한 조작방법으로 동작시키지만 동작의 내용은 서로 다른 것을 의미한다.

* 객체 지향 5원칙  
객체지향에서 지켜야 할 5개의 원칙을 말한다.   

  * 단일 책임 원칙 (Single responsibility principle)  
    한 클래스는 하나의 책임만 가져야 한다.

  * 개방-폐쇄 원칙 (Open/closed principle)  
    “소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.”

  * 리스코프 치환 원칙 (Liskov substitution principle)  
    “프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.”

  * 인터페이스 분리 원칙 (Interface segregation principle)  
    “특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.”

  * 의존관계 역전 원칙 (Dependency inversion principle)  
    프로그래머는 “추상화에 의존해야지, 구체화에 의존하면 안된다.” 의존성 주입은 이 원칙을 따르는 방법 중 하나다.

[참고 : SOLID](https://ko.wikipedia.org/wiki/SOLID)

# Javascript Object Object-Oriented Programming
자바스크립트는 객체(object)기반의 스크립트 언어이며 자바스크립트를 이루고 있는 대부분 “모든 것”은 객체이다.

자바스크립트는 객체를 생성하기 위해 먼저 class를 만들 필요가 없다. class문을 흔하게 볼 수 있는 C++이나 자바와는 달리 자바스크립트는 class문이 포함되지 않은 프로토타입 기반 언어이다.

프로토타입 기반 프로그래밍은 클래스가 존재하지 않는 객체지향 프로그래밍의 한가지 스타일로, 동작 재사용(behavior reuse, 클래스기반 언어에서는 상속이라고함)은 프로토타입으로서 존재하는 객체를 데코레이팅하는 과정을 통해 수행된다.

이로인해 때때로 class 기반 언어에 익숙한 프로그래머들은 혼란을 일으킨다. 자바스크립트에서는 function을 class로서 사용한다. 아래 예제에서는 Person 이라는 이름의 클래스를 새로 정의하고 있다.  

```javascript
function Person(name) {
  this.name = name;
}
```

obj 이름의 객체의 새로운 인스턴스를 만들때에는 new obj 라는 statement를 사용하고, 차후에 접근할 수 있도록 변수에 결과를 받는다.

아래의 예제에서 Person이라는 이름의 클래스를 정의한 후에, 두개의 인스턴스를 생성하고 있다.

```javascript
function Person(name) {
  this.name = name;
}

var person1 = new Person('Lee');
var person2 = new Person('Kim');
```

## Javascript Inheritance (상속)

Java같은 클래스 기반 언어에서 상속(또는 확장)은 코드 재사용의 관점에서 매우 유용하다.  
새로 만들 클래스가 기존에 있는 클래스와 매우 유사하다면, 상속을 통해 다른 점만 구현하면 된다. 코드 재사용은 개발 비용을 현저히 줄 일 수 있는 잠재력이 있기 때문에 메우 중요하다.

자바스크립트는 클래스 패턴처럼 상속할 수 있지만 그 보다 더 표현적인 다른 패턴들도 지원한다. 언제나 최선의 방법은 항상 단순함을 유지하는 것이다.

클래스 기반 언어의 객체는 클래스의 인스턴스이며 클래스는 다른 클래스로 상속될 수 있다. 자바스크립트는 프로토타입 기반 언어인데 이 말은 객체가 다른 객체로 바로 상속된다는 것이다.

### 의사 클래스 방식 (Pseudo-classical)

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
var myMammal = new Mammal('Herb the Mammal');

var name = myMammal.get_name( ); // 'Herb the Mammal'
```

이제 생성자 함수를 정의하고 이 함수의 prototype을 Mammal 인스턴스로 대체하는 방식으로 또 다른 의사 클래스(Pseudo-class)를 만들 수 있다.

```javascript
var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
};

// Cat.prototype을 Mammal의 새 인스턴스로 대체

Cat.prototype = new Mammal( );

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
var says = myCat.says( ); // 'meow'
var purr = myCat.purr(5); // 'r-r-r-r-r'
var name = myCat.get_name( ); // 'meow Mary meow'
```

의사 클래스 패턴은 객체지향처럼 보이게 고안 됐지만 `private`는 전혀 없고 모든 속성은 `public`이다. 그리고 부모 메서드로 접근도 할 수 없다.

설상가상으로 생성자 함수의 사용에는 심각한 위험이 존재한다. 만약 생성자 함수를 호출할 때 `new` 연산자를 포함하는 것을 잊게 되면 `this`는 새로운 객체와 바인딩되지 않고 전역객체에 바인딩된다.
(`new` 연산자와 함께 오출된 생성자 함수 내부의 `this`는 새로 생성된 객체를 참조한다.)

이런 문제점을 경감시키기 위해 파스칼 표시법으로 생성자 함수 이름을 표기하는 방법을 사용하지만, 이러한 방법보다 더 나은 대안은 `new` 를 사용하는 방식을 피하는 것이다.

### 프로토타입 방식

순수하게 프로토타입에 기반한 패턴에서는 클래스가 필요없다. 프로토타입에 의한 상속은 개념적으로 클래스에 의한 상속보다 더 간단하다.

일단 객체를 생성한다.

```javascript
var myMammal = {
  name : 'Herb the Mammal',
  get_name : function ( ) {
    return this.name;
  },
  says : function ( ) {
    return this.saying || '';
  }
};
```

`Object.create` 메서드를 사용하여 더 많은 인스턴스를 생성할 수 있다. 그리고 나서 새로 만든 인스턴스에 필요한 메서드나 속성들을 추가할 수 있다.

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

이러한 방법은 클래스에 의한 상속과는 분병히 구별되는 상속 방법이다.

프로토타입에 의한 상속 패턴의 한가지 단점은 `private`속성을 가질 수 없다는 것이다. 객체의 모든 속성은 `public`이다.

### 함수를 사용한 방식

1. 객체를 반환하는 함수를 호출하여 새로운 객체를 생성한다.
2. 필요한 `private`변수와 메서드를 정의한다. 객체에 담아 반환하지 않는 함수 내 일반 변수는 `private`이다. (매개변수로 전달한 my 객체를 사용할 수도 있다.)

    ```javascript
    my.member = value;
    ```

3. `that` 에 새로운 객체를 할당하고 메서드를 추가한다. 이때 추가되는 메서드는 함수의 매개변수와 `private`에 접근할 수 있다.
4. `that`을 리턴한다.  

```javascript
var mammal = function (spec) {
  var that = {};
  that.get_name = function ( ) {
    return spec.name;
  };
  that.says = function ( ) {
    return spec.saying || '';
  };
  return that;
};

var myMammal = mammal({name: 'Herb'});
```

`spec` 객체에 인스턴스를 만드는데 필요한 모든 정보를 담아 Constructor에 전달한다.

```javascript
var cat = function (spec) {
  spec.saying = spec.saying || 'meow';
  // Inheritance
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

함수형 패턴은 유연하며, 의사 클래스 패턴보다 작업량이 적고 캡슐화, 정보은닉을 제공한다.
