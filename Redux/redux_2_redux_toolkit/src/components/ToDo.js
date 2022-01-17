import React from "react";
import { connect } from "react-redux";
import { remove } from "../store";
import {Link} from "react-router-dom";


function ToDo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) { // 데이터를 보내기만 하면됨...id!! id는 이미 가지고 있다.
  return {
    // onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    onBtnClick: () => dispatch(remove(ownProps.id))
  };
}

export default connect(null, mapDispatchToProps)(ToDo); // connect는 mapStateToProps, mapDispatchToProps 두 가지 인자를 받는다. => 보내기만 하면 되기 때문에 두 인자 중 앞에는 null