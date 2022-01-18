## Redux[basic]

### 1. Redux 시작

- Redux란?

  => JS의 상태관리 라이브러리

  

- 상태관리 라이브러리가 필요한 이유?

  => React의 state를 props로만 관리하면 component의 자식이 많아질 경우 복잡해짐(component끼리 다이렉트로 데이터 전달은 불가능함, 부모 - 자식 만 가능)

  => 따라서, 상태관리를 하기 위해서는 가장 많이 사용되는 Redux를 사용한다.

  

- Redux의 상태관리 cycle

  ![2](https://user-images.githubusercontent.com/73927750/149891712-b26c72ad-a798-47f4-b2c1-4535b66f3680.JPG)



- Redux의 3가지 원칙

  1. single source of truth

     - 동일한 데이터는 같은 곳에서 가져온다.(=> store)

  2. state is read-only

     - react에서는 setState 메소드를 통해서만 상태변경 가능
     - redux에서는 action이라는 객체를 통해서만 상태변경 가능

  3. changes are made with pure functions

     - 변경은 함수로만 가능

     - reducer과 연관

     - Store - Action - Reducer

       

- Store - Action - Reducer에 대해...

  1. Store
     - component와 별개로 store라는 공간에서 필요한 데이터의 상태를 보관
  2. Action
     - 앱에서 store에 운반할 데이터
     - 객체 형식
  3. Reducer
     - 보내고자 하는 action을 store에 전달하기 위해서 reducer을 통과해야함
     - reducer가 store의 상태를 변경한다.
  4. Store - Action - Reducer 과정
     - action(객체) -> dispatch() -> reducer -> store



### 2. Pure Redux

- 설치방법

  - npm install redux

    

- store

  - store는 data를 저장하는 공간

  - ```react
    const store = createStore(reducer);
    ```

    

- reducer

  - reducer는 반드시 fucntion이어야 하고 이를 통해 store에 들어간 data를 관리한다.

  - return 리턴 값 == store의 data

  - reducer에게 message를 보내기 위해서는 action을 호출해야하는데 

    => 이때 action은 store.diapatch(action) 한다.

  - ```react
    const reducer = (state = [], action) => {}; 
    // reducer는 2개의 argument를 받을 수 있음! default로는 빈 array
    ```

  

- action

  - type를 object형태로 가지고 있고 이를 reducer로 전달한다.

  - store를 수정할 수 있는 유일한 방법은 해당 action을 보내는 것 뿐이다.

    

- subscribe

  - store를 감시하고 있다가 store에 변경사항이 생길경우 원하는 function을 실행한다.

  - store.subscribe(onChange);

    

- 참고사항

  ```react
  import {createStore} from "redux"; // createStore를 사용
  
  const reducer = () => {  // reducer는 반드시 function이어야 하고 store에 들어간 data를 관리(modify)한다. 
    return 리턴값; // 리턴값은 store의 data가 된다. 추가적으로 이 data를 modify하는 방법은 reducer안에서 밖에 할 수 없다.
    }; 
  
  const store = createStore(reducer);
  
  action이란? // countModifier와 소통하는 방법
  const countModifier = (count=0, action) => { // action은 반드시 type를 object형태로 가지고 있어야 한다.
    if (action.type === "ADD"){
      return count += 1; // data에는 count에 1을 더한 1이 저장된다.
    }
  }
  const store = createStore(countModifier); 
  // 에서 store에 들어있는 data를 바꾸는 방법은 countModifier를 이용하는 것임
  // 해당 countModifier에 message를 보내는 방법은 action을 호출하는 것임
  // 그렇다면 action을 호출하는 방법은 store.dispatch({ type : "ADD"}); 로 dispatch하는 것임
  
  subscribe이란? // store에 변경이 감지되면 다른 function을 실행하는 것
  const onChange () => {};
  store.subscribe(onChange); // store안에 변화를 감지하면 onChange라는 function을 실행
  ```

  

- state에 대해

  - NEVER mutate state

    => 항상 새로운 state를 만들고 그 새로운 state를 return 한다.

  - ...state == state array안의 모든 content

  - ```react
    const reducer = (state = [], action) => {
      switch (action.type) {
        case ADD_TODO:
          return [...state, { text: action.text, id: Date.now() }]; // 이 부분! 기존의 state에 추가
        case DELETE_TODO:
          return [];
        default:
          return state;
      }
    };
    ```

  - JS에서 array에서 element를 삭제하기 위해서는 splice()가 아니라 filter()를 사용하자(

    => filter()는 mutate를 하지 않고 create해서 return하기 때문에
    ex)
    const result = words.filter(word => word.length > 6); 

    => filter에서 true인 값들로만 다시 구성해서 return함.
    => 이러한 방법을 굳이 사용하는 이유는? 

    => state를 절대로 mutate하지 않기 위해서!



### 3. React Redux

- 설치방법

  - npm install react-redux react-router-dom

    

- store에 관한 특징

  - store를 만들고 원하는 component에서 store에 연결해서 사용한다.

    => connect() 함수 이용

  - store에는 크게 두 가지 기능이 있다.

    1. store.getState() => redux에서는 mapStateToProps 라 부른다.
    2. store.dispatch() => redux에서는 mapDispatchToProps 라 부른다.

  - 위의 두 가지 기능을 connect(mapStateToProps, mapDispatchToProps)의 두 가지 인자로 넣어서 사용한다.

  - 따라서, export default connect(mapStateToProps, mapDispatchToProps)(Home);

    => Home component에 store를 연결하는 방법

    

- connect에 관한 특징

  - mapStateToProps, mapDispatchToProps 두 가지 인자를 갖는다.

  - mapStateToProps(state, ownProps)

    - 해당 함수를 통해서 store에서 component로 데이터를 가져온다.
    - 가져와서 return된 값(state)은 해당 component의 props로 전달된다!!

  - mapDispatchToProps (dispatch, ownProps)

    - 해당 함수를 통해서 데이터를 보낸다.

      

- router에 관한 특징

  - 기존의 React와는 약간 다른 구조를 가지고 있다.

  - App.js

    ```react
    import React from "react";
    import { HashRouter as Router, Route, Routes } from "react-router-dom";
    import Home from "../routes/Home";
    import Detail from "../routes/Detail";
    
    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" exact element={<Home/>}></Route>
            <Route path="/:id" element={<Detail/>}></Route>
          </Routes>
        </Router>
      );
    }
    
    export default App;
    ```

    React에서는 `<Home />`를 직접 작성한 

    반면에, Redux에서는 `<Route path="/" exact element={<Home/>}></Route>`로 처리한다.

    

- 나머지 참고사항들...

  - index.js

    ```react
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./components/App";
    
    import { Provider } from "react-redux";
    import store from "./store";
    
    ReactDOM.render(
      <Provider store={store}> 
        <App/>
      </Provider>,
     document.getElementById("root")
    );
    ```

    - 위의 코드에서 주목할만한 점

      1. ```react
         <Provider store={store}> 
           <App/>
         </Provider>,
         ```

         - `<Provider>`를 통해 App에 store를 연결한다.(props와 같음)

  - store.js

    ```react
    import {createStore} from "redux";
    
    // 고정시키기
    const ADD = "ADD";
    const DELETE = "DELETE";
    
    
    // actionCreator
    const addToDo = text => {
      return {
        type: ADD,
        text
      };
    };
    
    const deleteToDo = id => {
      return {
        type: DELETE,
        id: parseInt(id)
      };
    };
    
    const reducer = (state = [], action) => {
      switch (action.type) {
        case ADD:
          return [{text:action.text, id: Date.now()}, ...state];
    
        case DELETE:
          return state.filter(toDo => toDo.id !== action.id);
        
        default:
          return state;
    
      }
    };
    
    const store = createStore(reducer);
    
    // store에 변화가 일어나면 subscribe가 감지함 => 변화가 일어나는 부분에만 리랜더링 하고 싶음 => redux-react가 필요한 시점!
    // => index.js에 <Provider> 추가
    // store.subscribe()
    
    export const actionCreators = {
      addToDo,
      deleteToDo
    };
    
    export default store;
    ```

  - Home.js

    ```react
    import React, { useState } from "react";
    import {connect} from "react-redux";
    import { actionCreators } from "../store";
    import ToDo from "../components/ToDo";
    
    function Home({toDos, addToDo}) { // props로 toDos의 state를 가져온다.
      const [text, setText] = useState("");
      function onChange(e) {
        setText(e.target.value);
      }
      function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText("");
      }
      return (
        <>
          <h1>To Do</h1>
          <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={onChange} />
            <button>Add</button>
          </form>
          <ul>
            {toDos.map(toDo => (
              <ToDo {...toDo} key={toDo.id} /> // {...toDo} 는 {prop}에 toDo의 모든 정보를 포함해서 전달하겠다는 의미!
            ))}
          </ul>
        </>
      );
    }
    
    // mapStateToProps함수를 통해서 store에서 Home로 데이터를 가져온다.(= getState())
    function mapStateToProps(state) { // store 에서 가져온 state이고 mapStateToProps()의 return 값은 Home의 props로 전달된다.
      return {toDos: state};
    }
    
    // 데이터를 보내는 방법(= dispatch())
    function mapDispatchToProps(dispatch) {
      return {
        addToDo: text => dispatch(actionCreators.addToDo(text))
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Home); // connect는 mapStateToProps, mapDispatchToProps 두 가지 인자를 받는다.
    // connect는 component와 store를 연결한다.
    // store에는 두 가지 기능이 있는데
    // store.dispatch() => redux에서는 mapDispatchToProps 라 부른다.
    // store.getState() => redux에서는 mapStateToProps 라 부른다.
    ```

    - 위의 코드에서 주목할만한 점

      1. ```react
         export default connect(mapStateToProps, mapDispatchToProps)(Home);
         ```

         - Home과 store를 연결하는 방법

      2. ```react
         <ToDo {...toDo} key={toDo.id} /> 
         ```

         - {...toDo}는 {props}에 toDo의 모든 정보를 전달하겠다는 의미

      3. ```react
         function mapStateToProps(state) { 
           return {toDos: state};
         }
         
         function mapDispatchToProps(dispatch) {
           return {
             addToDo: text => dispatch(actionCreators.addToDo(text))
           };
         }
         ```

         - store에서 state를 받아오고 function Home({*toDos*, *addToDo*}){ ... }의 props로 전달
         - store에 dispatcher를 통해서 데이터를 전달하고 Home의 porps로 전달

  - ToDo.js

    ```react
    import React from "react";
    import { connect } from "react-redux";
    import { actionCreators } from "../store";
    import {Link} from "react-router-dom";
    
    
    function ToDo({ text, onBtnClick, id }) {
      return (
        <li>
          <Link to={`/${id}`}>
            {text} <button onClick={onBtnClick}>DEL</button>
          </Link>
        </li>
      );
    }
    
    function mapDispatchToProps(dispatch, ownProps) { // 데이터를 보내기만 하면됨...id!! id는 이미 가지고 있다.
      return {
        onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
      };
    }
    
    export default connect(null, mapDispatchToProps)(ToDo); // connect는 mapStateToProps, mapDispatchToProps 두 가지 인자를 받는다. => 보내기만 하면 되기 때문에 두 인자 중 앞에는 null
    ```

    - 위의 코드에서 주목할만한 점

      1. ```react
         export default connect(null, mapDispatchToProps)(ToDo);
         ```

         - 원하면 connect의 인자를 1개만 전달가능 

  - Detail.js

    ```react
    import React from "react";
    import { useParams } from "react-router-dom";
    import { connect } from "react-redux";
    
    
    function Detail({toDo}) {
      // const id = useParams(); // => 이미 mapStateToProps(state, ownProps)의 ownProps에 id값을 가지고 있기 때문에 useParams() 불필요!
      return (
        <>
          <h1>{toDo?.text}</h1>
          <h5>Created at: {toDo?.id}</h5>
        </>
      );
    }
    
    function mapStateToProps(state, ownProps){
      const {match:{params:{id}}} = ownProps;
      return {toDo: state.find(toDo => toDo.id === parseInt(id))};
    }
    
    export default connect(mapStateToProps) (Detail) ;
    ```

    - 위의 코드에서 주목할만한 점

      1. ```react
         // const id = useParams();
         
         function mapStateToProps(state, ownProps){
           const {match:{params:{id}}} = ownProps;
           return {toDo: state.find(toDo => toDo.id === parseInt(id))};
         }
         ```

         - 이미 ownProps에서 id값을 가지고 있기 때문에 useParams()할 필요가 없다.

      2. ```html
         <h1>{toDo?.text}</h1>
         <h5>Created at: {toDo?.id}</h5>
         ```

         - {toDo?.text} => ?를 붙여야 출력됨... 이유는 모르겠...ㅜ



### Redux Toolkit

- Redux Toolkit란?

  => 반복되는 redux 코드들을 줄여줄 수 있는 toolkit

  

- 설치방법

  - npm install @reduxjs/toolkit

    

- createAction

  (before)

  ```react
  const addToDo = text => {
    return {
      type: ADD,
      text
    };
  };
  ```

  (after)

  ```react
  import { createAction } from "@reduxjs/toolkit";
  
  const addToDo = createAction("ADD");
  const deleteToDo = createAction("DELETE");
  ```

  - redux toolkit를 이용해서 createAction했기 때문에 기존에 key:value를 직접 넣어주지 않아도 되고 action의 payload를 통해서 전부 접근가능(payload는 기본적으로 세팅되어 있음 => 꺼내 쓰기만 하면 됨)

    

- createReducer

  (before)

  ```react
  const reducer = (state = [], action) => {
   switch (action.type) {
    case addToDo.type:
       return [{text:action.payload, id: Date.now()}, ...state];
     case deleteToDo.type:
       return state.filter(toDo => toDo.id !== action.payload);
     default:
       return state;
     }
   };
  ```

  (after)

  ```react
  import { createAction, createReducer } from "@reduxjs/toolkit";
  
  const reducer = createReducer([], { // createReducer([] == default state, action을 직접 설정)을 통해 switch case를 쓰지 않아도 reducer 가능!
    [addToDo]: (state, action) => {
      state.push({text: action.payload, id: Date.now()}); // 원래 state는 mutate하면 안되지만 redux toolkit와 immer이 back에서 처리해주기 때문에 사용가능, 하지만 mutate하는 경우에는 새로운 state return 값이 있어야 하기 때문에 {}로 묶음
    },
    [deleteToDo]: (state, action) => 
      state.filter(toDo => toDo.id !== action.payload) // filter는 새로운 state return 값을 가지고 있기 때문에 {}로 묶지 않아도 된다. 
  });
  ```

  - switch case문 사용하지 않아도 됨 => [addToDO]: (state, action) => { ... }

  - 기존에 state는 절대로 mutate하지 말라고 했었지만 redux toolkit이 내부적으로 state를 mutate가능하게 해준다.

    

- createSlice

  - 위의 createAction, createReducer 두 가지를 한 번에 해결하는 방법이다.

  - 압도적으로 코드길이가 줄어든다.

  - ```react
    import {createStore} from "redux";
    import { createSlice } from "@reduxjs/toolkit";
    
    const toDos = createSlice({
      name: "toDosReducer",
      initialState: [],
      reducers: {
        add: (state, action) => {
          state.push({ text: action.payload, id: Date.now() });
        },
        remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
      }
    });
    
    export const { add, remove } = toDos.actions;
    
    export default createStore({ reducer: toDos.reducer }); // createSlice를 통해서 자동으로 reducer가 만들어진다. { reducer: toDos.reducer }
    ```

    - 지금까지 작성한 store.js의 최종코드

