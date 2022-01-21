## 프로젝트를 위한 CSS와 BootStrap



### 1. CSS 

- block vs inline(중요함)

  block - 한 덩어리(높이와 폭이 존재함), 한 줄 전체를 차지함

  ```html
  <div>, <footer>, <form>, <hr>, <p>, <ul>, <h1>, <h2>, <h3>, <h4>, <h5>, <h6>
  ```

  inline - 한 줄(높이가 있어보이지만 사실 높이X, 폰트사이즈는 조정O), 띄어쓰기로 작성 가능

  ```html
  <a>, <br/>, <button>, <img>, <input>, <label>, <span>, <textarea>
  ```

  

- form태그

  action(반드시 존재해야함) - 어디로 보낼지 -> 아래의 submit을 통해 전달된다.

  method(GET, POST)

  

- CSS 크기 단위

  1. px(픽셀) - 고정적인 단위 - 모니터의 해상도에 따라 달라짐

  2. % - 가변적인 레이아웃에서 사용

  3. em - 부모요소에 상속을 받음(부모 10px, 자식=2em 이면 자식은 20px) - 부모에 대해 상대적인 값을 가짐 - 부모가 또 부모를 가질 경우 계속 곱해짐(복잡)

  4. rem - 최상위 요소(html)의 사이즈를 기준으로 배수 단위를 가짐 - 부모에 영향을 받지 않음

  5. viewport - 사용자가 웹페이지를 방문했을 때 보이는 영역 - 디바이스에 따라 다름 - vw, vh, vmax, vmin

     

- CSS 색상 단위

  1. 색상 키워드

  2. RGB 색상 - # + 16진수 표기법, rgb()함수형 표기법

  3. HSL 색상 - 색상, 채도, 명도

     

- Box model

  1. border = 테두리

  2. margin = border의 바깥

  3. padding = 테두리와 안쪽의 내부 여백(border ~ 내부 content)

  4. content = 내용

     

- box-sizing: border-box;(중요함)

  => box-sizing의 default는 content-box이기 때문에 원하는 크기가 아니고 추가적으로 padding, margin, border지정시 content에서 크기가 늘어난다 

  => 따라서 box-sizing: border-box 설정을 통해 추가값이 지정되어도 설정한 전체 크기 안에서 움직일 수 있도록 한다.

  

- 마진상쇄 => blockA의 top과 blockB의 bottom에 적용된 각각의 margin이 겹칠 때 둘 중 큰 마진 값으로 결합하는 현상

  마진상쇄는 세로에서만 적용된다.(가로에서는 적용되지 않음)

  

- block vs inline(중요함)

  block - 줄 바꿈이 일어나는 요소 - 화면 크기 전체의 가로를 차지

  inline - 줄 바꿈이 일어나지 않는 요소 - content의 너비만큼 차지 - width, height 지정 불가, line-height는 가능 => inline를 줄 바꿈하기 위해서는 br태그 사용

  

- block 정렬(중요함)

  margin-left: auto; = 마진을 왼쪽으로 전부 다줌 = 우측정렬

  

- inline 정렬(중요함)

  text-align: right; = inline는 content가 중요하기 때문에 오른쪽으로 밀면 = 우측정렬

  

- display(중요함)

  display: inline-block; = 두 속성을 모두 갖는다

  visibility: hidden; = 공간에는 존재하지만 눈에 보이지 않음

  display: none; = 공간조차 지워버림(조심해야함)

  

- CSS Position 문서 상에서 요소를 배치하는 방법을 지정(중요함)

  1. static - 기준위치(좌측 상단) 

  2. relative - 상대 위치 - 레이아웃에서 요소가 차지하는 공간은 static와 같음 - 외출 - 기존에 있던 위치를 기준으로 이동 
  3. absolute - 절대위치 - 기존의 위치에서 공간을 차지하지 않고 가장 가까이 있는 부모/조상 요소를 기준으로 이동(relative, absolute에 만 붙음) - 출가 - 가까이에 있는 부모가 보이면 그 부모를 기준으로 새로운 위치를 잡는다

  4. fixed - viewport 기준으로 이동(스크롤해도 같은 곳에 위치함) - 집을 나가도 부모를 안찾음

  => absolute를 사용하기 위해서는 먼저 static이 아닌 부모를 만들어야 한다.

  

- 중앙정렬

  inline요소 => text-align : center block요소 => margin auto

  

- margin과 margin이 겹치면 상쇄되지만

  margin과 padding는 상쇄되지 않는다.

  

- Position(중요함)

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
      div.parent {
        width: 150px;
        height: 150px;
        background-color: deepskyblue;
        border: 1px solid black;
        color: brown;
      }
  
      div.static {
        position: static;
        background-color: green;
        color: white;
        text-align: center;
        line-height: 150px;
      }
  
      div.relative {
        /* 화면 좌표만 달라짐 그 외에는 static과 동일 */
        position: relative;
        top: 10px;
        left: 10px;
        
        background-color: violet;
        color: black;
        text-align: center;
        line-height: 150px;
      }
  
      div.absolute {
        /* 화면 좌표만 달라짐 그 외에는 static과 동일 */
        position: absolute;
        top: 10px;
        left: 10px;
        width: 100px;
        background-color: pink;
        color: black;
        text-align: center;
        line-height: 100px;
      }
  
      footer.fixed {
        position: fixed;
        bottom: 0px;
        color: white;
        background-color: black;
        text-align: center;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <!-- div.parent>div.static -->
    <!-- block 요소 => 부모의 maximum 가로를 가진다 / content의 세로를 가진다. -->
    <div class="parent">
      <div class="static">static box</div>
    </div>
    
    <div class="parent">
      <div class="relative">relative box</div>
    </div>
  
    <!-- absolute는 자기 멋대로기 때문에 block 요소 => 부모의 maximum 가로를 가진다 => 무시 => body까지는 못나감 -->
    <div class="parent">
      <div class="relative">relative box
        <div class="absolute">absolute box</div>
      </div>
    </div>
  
    <!-- fixed => width == content 길이 -->
    <footer class="fixed">
      This is footer 
    </footer>
  
    <!-- CSS를 적용하고 저장하고 확인하는 것 보다 개발자 도구 => element.style => 적용하고 우클릭 => copy declaration으로 복사해서 적용  -->
  </body>
  </html>
  ```

  ![1](https://user-images.githubusercontent.com/73927750/150494242-d22eb726-3e2f-4f6a-a748-3f9afe53e5a6.JPG)

  

- Flexbox(중요함)

- float 및 positioning 밖에 없었기 때문에 한계가 있었음 => flexbox 등장 => 정렬 짱!

- 단방향 레이아웃

- 요소 + 축 요소(중요함)

  1. flex container(부모요소)
  2. flex item(자식요소)

  축

  1. main axis(메인축)

  2. cross axis(교차축)

     

- flex container(부모요소)

  flexbox 레이아웃을 형성하는 기본적인 모델 flexitem들이 놓여있는 영역 display: flex or display: inline-flex로 지정 

  => flexitem들을 control 함

  

- flex-direction : 메인축의 방향을 가로로할지 세로로할지 설정(row, row-reverse, column, column-reverse)

  

- justify-content : 메인축 방향 정렬

  

- align-items, align-self, align-content : 교차축 방향 정렬(content-여러 줄, items-한 줄, self-개별요소)

  

- flexbox안에 flexbox를 또 선언할 수 있음 다양한 메인축 방향이 존재할 수 있기 때문에 flexbox를 만날때마다 메인축 방향을 반드시 알고 있어야 한다.

  

- display: flex(중요함)

  - 정렬하려는 부모 요소에 작성

    

- flex-direction

  - item이 쌓이는 방향 설정

  - main-axis가 변경됨

  - row(기본), row-reverse, column, column-reverse

    

- flex-wrap

  - 요소들이 강제로 한 줄에 배치 되게 할 것인지 여부 설정

  - nowrap(기본) - 전부 한 줄로(넘쳐도 그냥 튀어나옴), wrap - 넘치면 다음줄로, wrap-reverse - 넘치면 그 윗줄(역순)

    

- flex-flow

  - flex-direction과 flex-wrap의 shorthand

    

- justify-content

  - main-axis 정렬

  - flex-start, flex-end, center, space-between, space-around, space-evenly

    

- align-items

  - cross-axis 정렬

  - stretch(늘리기), flex-start, flex-end, center, baseline(item 내부의 text에 기준선)

    

- align-self

  - 개별 item에 적용하는 속성

  - auto(기본)

  - align-items와 동일함

    

- order

  - 작은 숫자 일수록 앞으로 이동(우선 쌓이는 방향)

  - 0(기본)

    

- flex-grow

  - 주축에서 남는 공간을 항목들에게 분배하는 방법

  - 아이템의 상대적 비율이 아님

  - 0(기본)

    

- flex  참고사이트 : https://studiomeal.com/archives/197

- Bootstrap Grid System(중요함)

  Grid system(12) => flexbox로 제작됨

  

- container => row => column(중요함)

- Grid system(중요함)

  1. 12개의 column

  2. 6개의 grid breakpoints

     

- 합이 12이기 때문에 안에서 원하는 만큼 약수를 이용해서 분할한다. 12가 넘어가면 다음줄로 내려감

  

- 반드시 부모에 .row가 있어야 .col사용가능(중요함)

  

- gutter = column사이의 padding라고 생각하면됨.

  

- col col의 max는 12 백분율로 움직인다. 내용은 column에 작성된다. 오직 column만이 row의 자식이 될 수 있다.(중요함)

  

- Grid breakpoints(6) 다양한 디바이스에서 적용하기 위해 특정 px조건에 대한 지점을 정해둠 = breakpoint 6개의 points가 있다. xs, sm, md, lg, xl, xxl col--4 => 해당 컬럼은 sm사이즈 범위내에서는 4칸을 차지한다.

  

- Nesting Grid system안에 또 다른 Grid system을 적용하는 것 접어보기 기능을 활용해서 큰 틀부터 확인해나간다.

  

- Offset 지정한 만큼의 column무시하고 다음 공간부터 나타나게함 설정한 크기부터 나타나게 하는 것

  

- Grid System [Basic] (중요함)

  - 부모 태그에서 상속하려고해도 자식태그가 자신만의 class를 가진다면 cascading때문에 상속되지 않고 자식태그의 속성을 갖는다.

  - container > row > col => 12칸

  - .container-fluid하면 제한되지 않은 화면 전체의 container을 사용할 수 있다.

    

- Grid System [Advanced] (중요함)

  - container은 필수

  - row는 12개로 쪼개는 가로 공간

  - col은 12칸 중 얼마나 차지할지

  - 만약에 전체는 12로 고정되어 있지만 1/24를 사용하고 싶다면?

    col-6으로 나눈 결과 내부에 새로운 row를설정하고 다시 분배하면 가능하다.

    (row는 가로공간을 12로 분할 하는 것

    

- Grid System [BreakPoint] (중요함)

  - col-12 col-md-8 => 원래는 col-12가 전체를 12를 차지하고 있었지만 => col-md-8이 나온 순간 부터 col-12는 처음부터 md가 나오는 순간까지만 12의 공간을 차지한다 => md를 넘어서는 순간 8의 공간을 차지한다 => col-- : 진행해 오다가 size가 나오는 순간 부터 설정하는 값으로 바뀜

  - 요즘 대부분 브라우저는 md로 잡고 시작한다.

  - offset offset도 col과 같은 방식으로 동작함 offset-8 => 앞에서 부터 8칸을 빈칸으로 차지한다 offset-md-8 => md크기부터 8칸짜리 빈칸(offset)가 적용된다.

    

- React + Bootstrap(중요함)

  - Grid System(fluid container)

    ![2](https://user-images.githubusercontent.com/73927750/150495645-cc7550f4-c165-4e36-b645-2d28dcb77716.JPG)

    ```react
    <Container fluid>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
    ```

  - Grid System(auto layout columns)

    ![3](https://user-images.githubusercontent.com/73927750/150495643-864ab7ac-6140-4452-91e8-2debaa9422ac.JPG)

    ```react
    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
    ```

  - Grid System(reaponsive grids)

    ![4](https://user-images.githubusercontent.com/73927750/150495639-2b7f8995-76a3-4c8d-9a8f-cb341b64d534.JPG)

    ```react
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8}>
          xs=12 md=8
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>
    
      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>
    
      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row>
        <Col xs={6}>xs=6</Col>
        <Col xs={6}>xs=6</Col>
      </Row>
    </Container>
    ```

    

