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