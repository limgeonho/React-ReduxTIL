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