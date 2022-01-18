import {createStore} from "redux";
import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";

/* -------------------------------- createSlice를 위한 주석 --------------------------------
// actionCreator
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

// const reducer = (state = [], action) => {
//  switch (action.type) {
//   case addToDo.type:
//      return [{text:action.payload, id: Date.now()}, ...state];
//    case deleteToDo.type:
//      return state.filter(toDo => toDo.id !== action.payload);
//    default:
//      return state;
//    }
//  };

// ReduxToolkit를 사용해서 actionCreator을 이용했기 때문에 기존의 addToDo안에 직접 객체로 key : value를 넣어주지 않아도 되고 action의 payload로 전부처리 가능!! 
const reducer = createReducer([], { // createReducer([] == default state, action을 직접 설정)을 통해 switch case를 쓰지 않아도 reducer 가능!
  [addToDo]: (state, action) => {
    state.push({text: action.payload, id: Date.now()}); // 원래 state는 mutate하면 안되지만 redux toolkit와 immer이 back에서 처리해주기 때문에 사용가능, 하지만 mutate하는 경우에는 새로운 state return 값이 있어야 하기 때문에 {}로 묶음
  },
  [deleteToDo]: (state, action) => 
    state.filter(toDo => toDo.id !== action.payload) // filter는 새로운 state return 값을 가지고 있기 때문에 {}로 묶지 않아도 된다. 
});
*/     

// createSlice를 사용해서 코드의 길이를 엄청나게 줄여버림
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


// const store = createStore(reducer);
// const store = configureStore({reducer}); // configureStore({reducer}) 을 사용하면 Redux Dev Tools를 사용할 수 있음. => Redux Toolkit를 설치하지 않아도 사용가능..(참고)

// store에 변화가 일어나면 subscribe가 감지함 => 변화가 일어나는 부분에만 리랜더링 하고 싶음 => redux-react가 필요한 시점!
// => index.js에 <Provider> 추가
// store.subscribe()

// export const actionCreators = {
//   addToDo,
//   deleteToDo
// };

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer }); // createSlice를 통해서 자동으로 reducer가 만들어진다. { reducer: toDos.reducer }
