---
layout: post
title: Storybook
categories: tools
section: tools
seq: 14
subseq: 6
description: Storybook은 React, Angular, Vue 등의 분리된 UI 컨포넌트를 체계적이고 효율적으로 구축할 수 있는 개발 도구다. UI 컨포넌트 라이브러리의 문서화(documentation)를 위해 사용할 수도 있고 디자인 시스템(Design system)을 개발하기 위한 플랫폼으로 사용할 수도 있다.
---

* TOC
{:toc}

[Storybook](https://storybook.js.org)은 React, Angular, Vue 등의 분리된 UI 컨포넌트를 체계적이고 효율적으로 구축할 수 있는 개발 도구다. UI 컨포넌트 라이브러리의 문서화(documentation)를 위해 사용할 수도 있고 디자인 시스템(Design system)을 개발하기 위한 플랫폼으로 사용할 수도 있다.

![storybook relationship](img/storybook-relationship.png)

Story는 Storybook을 구성하는 기본 구성 단위다. UI 컨포넌트는 기본적으로 하나 이상의 Story로 구성된다.

# 1. Storybook 설치

Storybook은 기존 프로젝트의 루드 디렉터리에 설치해 사용할 수도 있고, 새롭게 프로젝트를 생성하면서 설치할 수도 있다. 예를 들어, 다음과 같이 React 프로젝트를 생성하면서 Storybook 설치해보자.

```bash
# Create our application:
$ npx create-react-app storybook-project

$ cd storybook-project

# Add Storybook:
$ npx -p @storybook/cli sb init
```

설치가 완료되면 다음과 같은 디렉터리가 프로젝트 루트에 생성된다.

- /.storybook: Storybook 설정 파일이 포함되어 있다.
- /src/stories: Storybook 예제 컴포넌트

다음 명령을 실행하면 [Storybook 서버](http://localhost:6006)가 기동된다.

```bash
# Start the component explorer on port 6006:
$ npm run storybook
```

![Storybook 서버](img/storybook-server.png)

기동된 Storybook 서버는 각 Story가 실제 브라우저에서 어떻게 랜더링되는지 확인할 수 있는 컴포넌트 라이브러리 익스플로러를 제공한다.

Storybook 서버는 프로젝트와는 별도로 제공되는 서버다. Storybook 서버가 아닌 실제 프로젝트를 기동시키려면 루트 디렉터리에 다음과 같이 .env 파일을 생성할 필요가 있다.

```
SKIP_PREFLIGHT_CHECK=true
```

다음 명령을 실행하면 실제 프로젝트가 기동된다.

```bash
$ npm start
```

![Storybook project](img/storybook-project.png)


# 2. 컴포넌트 생성과 Story 추가

프로젝트에 다음과 같이 src/components 디렉터리에 RangeSlider 컴포넌트를 추가해보자.

```javascript
// src/components/RangeSlider.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RangeSlider.css';

/**
 * React Range slider
 */
const RangeSlider = ({ min = 0, max = 100, step = 1, value: intialValue = 0 }) => {
  const [value, setValue] = useState(intialValue);
  return (
    <div className="container">
      <div className="range-value" data-value={value}>
        length:
      </div>
      <div className="range-container">
        <input
          className="range-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RangeSlider;

RangeSlider.propTypes = {
  /** 최소값 */
  min: PropTypes.number,
  /** 최대값 */
  max: PropTypes.number,
  /** 증가 배수 */
  step: PropTypes.number,
  /** 기본값 */
  value: PropTypes.number
};
```

```css
/* src/components/RangeSlider.css */
.container {
  width: 500px;
  margin: 40px auto;
  padding: 25px;
  border-radius: 8px;
  background: #0a0e31;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.45), 0 4px 8px rgba(0, 0, 0, 0.35),
    0 8px 12px rgba(0, 0, 0, 0.15);
}
.range-container {
  position: relative;
  padding: 30px 50px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
}
.range-value {
  padding: 10px;
  color: rgba(255, 255, 255, 0.5);
}
.range-value::after {
  /* attr: https://developer.mozilla.org/en-US/docs/Web/CSS/attr() */
  content: ' ' attr(data-value);
  color: #fff;
}
.range-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 1px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
}
.range-slider:before,
.range-slider:after {
  position: absolute;
  top: 40px;
  color: #fff;
  font-weight: bold;
}
.range-slider:before {
  content: attr(min);
  left: 30px;
}
.range-slider:after {
  content: attr(max);
  right: 20px;
}
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;
}
.range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
```

컴포넌트가 위치한 디렉터리에 RangeSlider.stories.js 파일을 생성한다.

```javascript
// src/components/RangeSlider.stories.js
import React from 'react';
import RangeSlider from './RangeSlider';

export default {
  title: 'Components/RangeSlider', // Story 서버 메뉴의 그룹과 타이틀
  component: RangeSlider // component 이름
};

const Template = (args) => <RangeSlider {...args} />;

export const Deafult = Template.bind({});
Deafult.args = {
  min: 4,
  max: 32,
  value: 16
};
```

다음과 같이 Storybook에 컴포넌트가 추가된 것을 확인할 수 있다.

![Storybook component](img/storybook-component1.png)

만약 src/components 디렉터리에 있는 컴포넌트만을 Storybook으로 관리하려면 .storybook/main.js의 stories를 다음과 같이 수정한다.

```javascript
// .storybook/main.js
module.exports = {
  // "stories": [
  //   "../src/**/*.stories.mdx",
  //   "../src/**/*.stories.@(js|jsx|ts|tsx)"
  // ],
  stories: ['../src/components/**/*.stories.js'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}
```

![Storybook component](img/storybook-component2.png)
