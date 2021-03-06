import React from "react";
import StringInterface from "./Parameters/StringInterface"
import FileInterface from "./Parameters/FileInterface"

class Parameters extends React.Component{
  constructor( props ){
    super();
    this.state = {
      nodes: props.nodes,
      selected: props.selected
    }
  }

  componentWillReceiveProps( props ){
    this.setState({

      nodes: props.nodex,
      selected: props.selected

     })
  }

  mapSelected(){
    if( this.state.selected ){
      return this.state.selected.inputs.map(
        function( input, index ){
          if( input.type === "string" ){
            return(
              <StringInterface
                input = { input }
              />
            )
          }else if( input.type === "file" ){
            return(
              <FileInterface input = { input }/>
            )
          }
        }
      );
    }
  }

  render(){
    return(
      <div className = "position-full parameters">
        {
          this.mapSelected()
        }
      </div>
    )
  }
}

export default Parameters;
