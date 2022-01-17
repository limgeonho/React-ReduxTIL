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
