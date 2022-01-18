## React [basic]

### 1. React 시작

- react 란?

  대표적인 frontend framework

- JSX 란?

  Javascript에 XML을 추가, 확장한 문법, React로 개발할때 사용되는 문법

- App, Title 등... component의 요소

  state, props, effect

### 2. Props

- component끼리 데이터를 전달하는 방법 = props 를 이용! => 함수의 인자로 전달

- ```react
  function Btn({banana, big}){ // props를 전달받는 방법 => function Btn이 함수이기 때문에 첫 번재 인자로 부모로 부터 props를 object 형태로 전달받음
        return <button
          style={{
            backgroundColor: "tomato",
            color: "white",
            padding: "10px 20px",
            border: 0,
            borderRadius: 10,
            fontSize: big ? 18 : 16,
          }}
        >
          {banana}
        </button>
      }
      
      function App(){
        return(
          <div>
            <Btn banana="Save Changes" big={true}/>
            <Btn banana="Continue" big={false}/>
          </div>
          );
        }
      const root = document.getElementById("root"); // root라는 id의 div를 가져오기
      ReactDOM.render(<App/>, root);
  ```

- App안에 Btn component를 넣는다.(component는 첫 글자는 대문자로!)

  => props를 전달하기 위해서는 `<Btn banana="Save Changes" big={true}/>`

  => Btn안에 key=value 형태로 전달

  => Btn component function의 첫 번째 인자로 { key } 로 전달받고

  => 해당 component안에서는(JSX이기 때문에) 

  => { } 안에 넣으면 사용할 수 있다.

  

### 3. Prop-types

- props를 통해 전달되는 데이터의 type를 검사하는 방법

- ```react
    <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script> 
  // propTypes를 통해서 type을 검사하는 방법 => console창에 경고가 뜸!
      Btn.propTypes = {
        text : PropTypes.string.isRequired,
        fontSize : PropTypes.number,
      };
  ```

- 먼저 해당 src를 import한다

  => Btn({props}를 전달 받는 component)에서 prop-type를 검사한다.

  => text: PropTypes.string.isRequired

  => text는 string 타입이고 반드시 전달되어야하는 인자인지 확인



### 4. useState

- React의 상태관리 방법 중 하나 : 지정한 데이터를 감시하고 데이터에 변화가 있을 시에 리랜더링!

- ```react
  function App(){
        const [counter, setCounter] = React.useState(0);
        const onClick = () => {
          // setCounter(counter + 1); // setCounter가 호출되어서 counter(data)의 값이 달라지면 알아서 리랜더링한다. 바뀌는 값 부분만 알아서 리랜더링
          setCounter((current) => current + 1); // 1번째 인자는 현재 값을 갖는 설정이 되어 있기 때문에 기존의 값으로 다음 값을 계산하는 연산에서는 해당 방법을 이용한다!!
        };
        return(
        <div>
          <h3>Total clicks: {counter}</h3>
          <button onClick={onClick}>CLick me</button>
        </div>
        );
      }
  ```

- 관리할 데이터를 지정하고 useState한다. `const [counter, setCounter] = React.useState(0);`

  => 0은 counter의 default 값, setCounter로 counter의 값에 접근할 수 있음

  => 기존의 값을 이용하는 경우 `setCounter((current) => current + 1);` 

  => setCounter()의 첫 번째 인자는 기존의 값을 가지기 때문에 (current) => (current) + 1로 직전 값 사용

  => 해당 counter(current)의 값이 바뀌는 경우 화면이 알아서 리랜더링된다.(React의 power~)

- useState를 사용한 참고사항

  ```react
  // MinutesToHours, KmToMiles, App는 각각 component이다.
      function MinutesToHours(){
        const [amount, setAmount] = React.useState(0); // ()비워두면 현재 값이 default <= state
        const [inverted, setInverted] = React.useState(false); 
        const onChange = (event) => {   // 결국 onChange()덕에 연결된 state 값을 업데이트 한다.
          setAmount(event.target.value);
        }
        const reset = () => {
          setAmount(0);
        }
        const onFlip = () => {
          reset();
          setInverted((current) => !current); // 반대로 뒤집기
        }
        return(
          <div>
            <div>
              <label htmlFor="minutes">minutes</label>
              <input 
                value={inverted ? amount * 60 : amount} 
                id="minutes" 
                placeholder="Minutes" 
                type="number" 
                onChange={onChange} 
                disabled={inverted}
                /> 
            </div>
  
            <div>
              <label htmlFor="hours">hours</label>
              <input 
                value={inverted ? amount : Math.round(amount / 60)} // if문 사용
                id="hours" 
                placeholder="Hours" 
                type="number" 
                onChange={onChange} 
                disabled={!inverted}
                />
            </div>
  
            <button onClick={reset}>Reset</button>
            <button onClick={onFlip}>Invert</button>
  
          </div>
          );
        }
      function KmToMiles(){
        return <h3>KM 2 M</h3>;
      }
      function App(){
        const [index, setIndex] = React.useState("xx");
        const onSelect = (event) => {
          setIndex(event.target.value);
        };
        return(
          <div>
            <h1>Super Converter</h1>
            <select value={index} onChange={onSelect}>
              <option value="xx">Select your units</option>
              <option value="0">Minutes & Hours</option>
              <option value="1">Km & Miles</option>
            </select>
            <hr/>
            {index === "xx" ? "Please select your units" : null}
            {index === "0" ?  <MinutesToHours/> : null} // {}로 묶으면 JS문법 사용가능
            {index === "1" ?  <KmToMiles/> : null} 
          </div>
          );
        }
      // onChange는 사용자가 값을 입력하면 일어남
      const root = document.getElementById("root"); // root라는 id의 div를 가져오기
      ReactDOM.render(<App/>, root);
  ```

  1. onChange는 기본적으로 event와 연결됨.

     => `const onChange = (event) => { setAmount(event.target.value); }`

  2. 순수한 html이 아닌 JSX이기 때문에 문법적인 요소는 { }안에 사용한다.

     => if문 `value={inverted ? amount * 60 : amount} ` 3항 연산자 => 해당 값이 바뀌면 알아서 리랜더링

  3. 순수한 html이 아닌 JSX이기 때문에 `<label for="minutes">minutes</label>` 대신에

     => `<label htmlFor="minutes">minutes</label>`



## React[advanced] 

### 1. React app의 시작

- 본격적으로 react app을 구현
- 각각의 component들을 각각의 xxx.js파일로 구분해서 만들기
- 명령어
  - npx create-react-app myapp : 기본적인 틀을 가지고 있는 app생성
  - npm start : 서버 실행
  - npm i prop-types : prop-types설치
- npx create-react-app myapp 한 뒤에는 App.js와 index.js 빼고 삭제
  - index.js : 기본 페이지인 index.html의 js파일 + 각각의 component들을 넣어준다.
  - App.js : App를 구성하고 내부에 다른 component들을 가질 수 있다.(default file임)

### 

### 2. React app에서 CSS를 사용하는 방법(커스터마이징)

- 직접 html 내부에 style 설정(비추)
- global 로 styles.css 파일 생성(비추)
- component 별로 직접 커스터 마이징
  1. xxx.module.css 파일에 직접 css 내용을 작성
  2. 사용하려는 component에서 import styles from "./xxx.module.css";
  3. `<h1 className={styles.title}>Welcome back!!!</h1>` : {styles.title}형태로 불러오기, JSX이기 때문에 class가 아닌 className 사용!



### 3. useEffect

- useEffect를 사용하는 이유?

  => react는 자동적으로 state가 변화하면 화면을 리랜더링한다. 하지만 api를 불러오는 등의 경우에는 처음에 랜더링을 한 후에 값이 달라지게 되는데 이럴때마다 리랜더링 하면 다시 api가 호출된다.

  => 이러한 불필요한 리랜더링을 피하고 처음에 한 번만 랜더링하기 위해서는 useEffect를 사용한다.  

- 사용방법

  - import { useState, useEffect } from "react"; 에서 useEffect를 추가한다. => 기존의 React.useState에서 useState, useEffect만 선언해서 사용가능
  - useEffect(() => { }, [ ]) :  첫 번째 인자에는 function이 들어오고, 2번째 인자에는 state가 바뀌면 해당 함수를 실행하게 될 state가 들어온다.(특정 감시 대상)
    [ ]가 비어있다면 맨 처음에 랜더링 될 때만 실행된다.

- 결론

  => React의 장점은 state에 등록하면 해당 값이 바뀔때마다 알아서 새로고침 되는 것이다. 하지만 새로고침을 굳이하지 않아도 되는 부분
  즉, 선택적으로 새로고침을 하기 위해서 useEffect를 사용하고 [] 안에 감시대상을 설정해서 원하는 state만 새로고침되게 할 수 있다. 

- useState를 사용한 참고사항

  ```react
  import Button from "./Button"; // Button 불러오기(다른파일로 나눠진 component불러오기)
  import styles from "./App.module.css"; // 해당 커스터마이징한 css파일 불러오기 => className={styles.title}
  import { useState, useEffect } from "react"; // React.useState();를 => useState()으로 생략
  
  function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
  
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value); // onChange에는 event가 들어온다.
  
    console.log("i run all the time");
  
    useEffect(() => { // useEffect를 사용하면 처음 1번만 실행된다.(state의 변화에 상관 x)
      console.log("I run only once."); 
    }, []);
    
    useEffect(() => { 
      if(keyword !== "" && keyword.length > 5){
        console.log("SEARCH FOR", keyword); 
      }
    }, [keyword]); // state로 등록된 keyword가 변화할 때만 해당 코드를 실행하자!! => useEffect의 기능!
  
    return (
      <div>
        <input
          value={keyword}
          onChange={onChange}
          type="text" 
          placeholder="Search here ...."
        />
        <h1>{counter}</h1>
        <Button text={"Continue"}/>
        <button onClick={onClick}>Click me!</button>
      </div>
    );
  }
  
  export default App; // export default 를 해줘야 다른 component 에서 사용가능하다. => index.js에서 사용
  ```



### 4. Cleanup function

- cleanup function이란?

  => 지정한 component가 T/F 값에 따라서 사라지거나 나타날때 해당 component가 실행된다.

  => 이때, component는 단순하게 jsx를 return하는 function일 뿐이기 때문에...

  => 해당 component가 만들어질때 실행되는 함수가 있고 

  => 해당 component가 사라질때 실행되는 함수가있다.
  => 사라질때 실행되는 함수 == cleanup function 라 부른다.

- ```js
  function Hello(){ 
    function destroyFn(){
      console.log("destroyed!"); 
    }
  
    function createFn(){
      console.log("created!");
      return destroyFn; // 해당 부분이 cleanup function! 
    }
    
    useEffect(createFn, []); 
    return <h1>Hello</h1>;
  }
  ```

- 결론

  => 처음 실행되는 함수에 return 값으로 해당 component가 사라질때 실행하고 싶은 cleanup function을 넣으면 된다.



### 5. 실습(1) : ToDo 리스트 만들기

- ```react
  import { useState } from "react";
  
  function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);
  
    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = (event) => {
      event.preventDefault(); // submit가 됨과 동시에 새로고침되기 때문에 기존의 기능을 죽이기 위해 event.preventDefault() 사용! 
      if(toDo === ""){
        return; // toDo가 비어있다면 해당함수 실행x
      }
      setToDos((currentArray) => [toDo, ...currentArray]); // [toDo, ...currentArray]는 기존의 []안에 toDo라는 새로운 element를 넣는 방법!! ...!
      setToDo(""); // 검색완료 후 검색창 비우기
    };
      
    return (
      <div>
        <h1>My To Dos...({toDos.length})</h1>
        <form onSubmit={onSubmit}>
          <input 
            value={toDo}
            onChange={onChange}
            placeholder="Write your to do ..."
            type="text"
          />
          <button>Add to do</button>
        </form>
        <hr/>
        <ul>
          {toDos.map((item, index) => <li key={index}>{item}</li>)} 
        </ul>
      </div>
    );
  }
  
  export default App;
  ```

- 위의 코드에서 참고사항

  1. ```js
     const onSubmit = (event) => {
         event.preventDefault(); // submit가 됨과 동시에 새로고침되기 때문에 기존의 기능을 죽이기 위해 event.preventDefault() 사용! 
         if(toDo === ""){
           return; // toDo가 비어있다면 해당함수 실행x
         }
     ```

     => onSubmit의 기본적인 기능은 클릭시에 새로고침이 되기 때문에 기존 기능 삭제 => event.preventDefault();

  2. ```react
     setToDos((currentArray) => [toDo, ...currentArray]); 
     // [toDo, ...currentArray]는 기존의 []안에 toDo라는 새로운 element를 넣는 방법!! ...!
     ```

     => JS문법으로 [ ] 안에 element 넣기 [toDo, ...currentArray] => 새로들어온 toDo(element)가 맨 앞에

  3. ```html
     <ul>
       {toDos.map((item, index) => <li key={index}>{item}</li>)} 
     </ul>
     ```

     => map함수를 사용하기 위해서는 1번째 인자로는 value가 들어가고 2번째 인자로는 이들을 구별할 수 있는 index값(or id)이 들어간다!(Vue에서 for문을 사용할때도 key값을 넣었었음!!)



### 6. 실습(2) : Coin Tracker 만들기

- ```react
  import { useEffect, useState } from 'react';
  
  function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
    }, [])
    return (
      <div>
        <h1>The Coins! ({coins.length})</h1>
        {loading ? <string>Loading...</string> : null}
        <ul>
          {coins.map((coin) => (
            <li>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default App;
  ```

- 위의 코드에서 참고사항

  1. ```react
     useEffect(() => {
         fetch("https://api.coinpaprika.com/v1/tickers")	// url로부터 data를 받아오기 
         .then((response) => response.json())		   // 해당 response값을 json형태로 변환
         .then((json) => {
           setCoins(json);
           setLoading(false);
         });
       }, [])									    // [] 이기 때문에 처음에 한 번만 실행
     ```

     => api를 가져오는 방법 :  fetch().then() 이용!

  2. ```html
     <ul>
       {coins.map((coin) => (
        <li>
          {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
        </li>
       ))}
     </ul>
     ```

     => map함수를 이용해서 `<li>`태그로 묶어버림



### 7. Router

- url 을 통해서 component를 이동하고 전환하는 방법 = 라우팅

- 사용방법

  - npm install react-router-dom 설치
  - url을 통해서 넘어갈 파일들은 routes 폴터에 넣고 이들을 구성하는 component들은 components폴더에 넣음
  - ![1](https://user-images.githubusercontent.com/73927750/149875081-64ccf6d2-3c35-4142-9bb8-ec976bbb0cd1.JPG)

- 정적라우팅과 동적라우팅

  ```react
  import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  
  import Detail from "./routes/Detail";
  import Home from "./routes/Home";
  
  function App() {
    return (
    // Router -> Switch -> Route 순서로 작성하고 <Route path="경로">component<Route/>으로 작성, path="/"가 가장 마지막에 나와야한다. => React의 버전에 따라 약간 다름
    <Router>
      <Switch>
  
        <Route path="/movie/:id">  // 바뀌는 id라는 값을 가지고 동적라우팅 => :id
          <Detail/>
        </Route>
        
        <Route path="/">			// 고정된 / 로 이동하는 정적라우팅
          <Home/>
        </Route>
  
      </Switch>
    </Router>
    );
  }
  
  export default App;
  ```

- component안에서 다른 url로 라우팅하기 위한 방법

  ```react
  import { Link } from "react-router-dom";
  
  <h2>
    <Link to={`/movie/${id}`}>{title}</Link> // to={`/movie/${id}`} 를 이용해서 props로 전달받은 id
  </h2>
  ```

- url로 부터 넘어온 param을 가져오는 방법

  ```react
  import { useParams } from "react-router-dom";
  
  const {id} = useParams(); // <Route path="/movie/:id">에서 :id의 값을 받아온다
  ```

  

### 8. 실습(3) : Movie App 만들기

- App.js 는 위에 있음(7번)

- Home.js

  ```react
  import { useEffect, useState } from "react";
  import Movie from "../components/Movie";
  
  function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
      const json = await (
        await fetch(
          `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
        )
      ).json();
      setMovies(json.data.movies);
      setLoading(false);
    };
    useEffect(() => {
      getMovies();
    }, []);
    return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  export default Home;
  ```

- 위의 코드에서 참고사항

  1. ```react
     const getMovies = async () => {
         const json = await (
           await fetch(
             `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
           )
         ).json();
         setMovies(json.data.movies);
         setLoading(false);
       };
     ```

     => await는 async안에 있지 않으면 사용할 수 없다. fetch().then()을 위의 방법으로 줄인 것

- Movie.js

  ```react
  import PropTypes from "prop-types";
  import { Link } from "react-router-dom";
  
  function Movie({ id, coverImg, title, summary, genres }) {
    return (
      <div>
        <img src={coverImg} alt={title} />
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  Movie.propTypes = {
    id:PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  
  export default Movie;
  ```

- 위의 코드에서 참고사항

  1. ```react
     <h2>
       <Link to={`/movie/${id}`}>{title}</Link>
     </h2>
     ```

     => 동적라우팅

- Detail.js

  ```react
  import { useEffect } from "react";
  import { useParams } from "react-router-dom";
  
  function Detail() {
    const {id} = useParams(); // <Route path="/movie/:id">에서 :id의 값을 받아온다
    const getMovie = async() => {
      const json = await(
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      console.log(json);
    }
    useEffect(() => {
      getMovie();
    }, []);
    return <h1>Detail</h1>;
  }
  export default Detail;
  ```

- 위의 코드에서 참고사항

  1. ```react
     const {id} = useParams();
     ```

     => url parameter를 가져오는 방법

  2. ```react
     const getMovie = async() => {
       const json = await(
         await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
       ).json();
         console.log(json);
     }
     ```

     => await는 async안에 있지 않으면 사용할 수 없다. fetch().then()을 위의 방법으로 줄인 것(x 2)