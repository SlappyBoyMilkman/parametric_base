import React from "react";
import Shelves from "../Shelf/shelves"
import Library from "../NodeLibrary/library.js"
import Scene from "../NodeLibrary/scene.js";

class Index extends React.Component{
  constructor(){
    super();
    let scene = new Scene();
    let font  = Library.Font({
      x: 30,
      y: 50,
      inputs: [1,2,2],
      outputs: [1,2]
    })

    let font2  = Library.TextCanvas({
      x: 30,
      y: 120,
      inputs: [1,2],
      outputs: [1,2]
    })


    let str = Library.String({
      x: 140,
      y: 50
    })

    let nodes = [
      font,
      font2,
      str
    ]

    this.state = {
      nodes: nodes,
      scene: scene
    }

    this.__onUnclick = [];
    window.registerUnclick = this.registerUnclick.bind( this )
    window.clickNode = this.__clickNode.bind( this );
  }


  componentDidMount(){
    window.unClick = () => {
      this.__onUnclick.forEach(
        ( func ) => { func() }
      );
    }
  }

  registerUnclick( func ){
    this.__onUnclick.push( func )
  }

  __clickNode( node ){
    this.setState({ selected: node })
  }

  componentWillUnmount(){

  }

  render(){
    console.log("happening index")
    return(
      <div className = "index">
        <Shelves
          nodes = { this.state.nodes }
          selected = { this.state.selected }
          />
      </div>
    )
  }
}

export default Index;
