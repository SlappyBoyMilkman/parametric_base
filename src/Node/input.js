import React from "react";
import Library from"../NodeLibrary/library";

class Input extends React.Component{
  constructor( props ){
    super();
    this.state = {
      index: props.index,
      input: props.input
    }
  }

  componentWillReceiveProps( props ){
    this.setState({
      index: props.index
    })
  }

  componentDidMount(){
    this.state.input.assignRef( this.refs.input )
  }

  getStyle(){
    return({
      left: `${this.state.index * 15}px`
    })
  }

  onDrop( e ){
    let id = e.dataTransfer.getData("id");
    let output = Library.getOutput(id)
    if( output && output.type === this.state.input.type ){
      this.state.input.connect( output )
    }
  }

  allowDrop( e ){
    e.preventDefault()
    this.setState({ mouseOver: true })
  }

  onMouseEnter(){
    this.setState({ mouseOver: true })
  }

  onMouseLeave(){
    this.setState({ mouseOver: false })
  }

  hover(){
    if( this.state.mouseOver ){
      return(
        <div className = "output__hover">
        {this.state.input.type}
        </div>
      )
    }
  }

  onDragStart( e ){
    e.preventDefault();
    this.state.input.disconnect()
  }

  render(){
    return(
      <div
      className = "node__input"
      ref = "input"
      draggable = "true"
      style = { this.getStyle() }
      onMouseEnter = { this.onMouseEnter.bind( this ) }
      onMouseLeave = { this.onMouseLeave.bind( this ) }
      onDragOver = { this.allowDrop.bind( this ) }
      onDragStart = { this.onDragStart.bind( this ) }
      onDragLeave = { this.onMouseLeave.bind( this ) }
      onDrop = { this.onDrop.bind( this ) }
      >
      {
        this.hover()
      }
      </div>
    )
  }
}

export default Input
