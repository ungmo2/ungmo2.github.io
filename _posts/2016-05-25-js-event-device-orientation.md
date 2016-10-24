---
layout: post
title: Device Orientation Event
categories: javascript
tags: [event, mobile]
section: javascript
---

Device Orientation는 HTML5가 제공하는 매우 유용한 기능으로 중력과의 관계에서 디바이스의 물리적 방향의 변화를 감지할 수 있다. 이것을 이용하면 모바일 디바이스를 회전시켰을 때 이벤트를 감지하여 적절히 화면을 변화 시킬 수 있다.

디바이스의 방향 정보를 다루는 자바스크립트 이벤트는 두가지가 있다.

- [DeviceOrientationEvent](https://developer.mozilla.org/ko/docs/Web/API/DeviceOrientationEvent)  
  가속도계(accelerometer)가 기기의 방향의 변화를 감지했을 때 발생한다.

- [DeviceMotionEvent](https://developer.mozilla.org/ko/docs/Web/API/DeviceMotionEvent)  
  가속도에 변화가 일어났을 때 발생한다

브라우저 별 지원 정보는 [caniuse](http://caniuse.com/#search=DeviceOrientation)를 참조한다. 현재 사파리를 제외한 대부분의 브라우저에서 사용할 수 있다.

하지만 오래된 브라우저를 사용하는 사용자를 위해 브라우저의 이벤트 지원 여부를 먼저 확인할 필요가 있다.

```javascript
if (window.DeviceOrientationEvent) {
  // Our browser supports DeviceOrientation
} else {
  console.log("Sorry, your browser doesn't support Device Orientation");
}
```

# DeviceOrientationEvent

디바이스의 방향 변화는 3개의 각도( alpha, beta, gamma )를 사용하여 측정된다. `deviceorientation` 이벤트에 리스너를 등록하면 리스너 함수가 주기적으로 호출되어 업데이트된 방향 데이터를 제공한다. `deviceorientation` 이벤트는 다음 4가지의 값을 가진다.

```javascript
window.addEventListener("deviceorientation", handleOrientation, false);

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;

  // Do stuff with the new orientation data
}
```
- DeviceOrientationEvent.absolute
- DeviceOrientationEvent.alpha
- DeviceOrientationEvent.beta
- DeviceOrientationEvent.gamma

![deviceorientation-angles](/img/deviceorientation-angles.png)
{: .w-300}

## absolute

지구좌표계(Earth coordinate system)을 사용하는 지에 대한 boolean 값이다. 일반적인 경우 사용하지 않는다.

## alpha

0도부터 360도까지 범위의 z축을 중심으로 디바이스의 움직임을 나타낸다.

![deviceorientation-angles](/img/deviceorientation-alpha.png)
{: .w-300}

## beta

-180도부터 180도(모바일 사파리: -90도~90도)까지 범위의 x축을 중심으로 디바이스의 움직임을 나타낸다. 이는 디바이스의 앞뒤 움직임을 나타낸다.

![deviceorientation-angles](/img/deviceorientation-beta.png)
{: .w-300}

## gamma

-90도부터 90도(모바일 사파리: -180도~180도)까지 범위의 y축을 중심으로 디바이스의 움직임을 나타낸다. 이는 디바이스의 좌우 움직임을 나타낸다.

![deviceorientation-angles](/img/deviceorientation-gamma.png)
{: .w-300}

# Reference

* [Using Device Orientation in HTML5](http://www.sitepoint.com/using-device-orientation-html5/)

* [기기 방향 감지하기](https://developer.mozilla.org/ko/docs/WebAPI/Detecting_device_orientation)

* [Google Developers Device orientation](https://developers.google.com/web/fundamentals/native-hardware/device-orientation/)
