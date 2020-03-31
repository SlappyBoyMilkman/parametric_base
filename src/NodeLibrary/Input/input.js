import Library from "../library"
import Connection from "../Connection/connection"

class Input extends Connection{
  constructor( type, name, _default, parent, hidden ){
    super();
    this.type = type;
    this.name = name;
    this.parent = parent;
    this._default = _default;
    this.hidden = hidden ? hidden : false;
    this.connectedOutput = undefined;
    this.getUniqueId();
    this.getValue()
  }

  getValue(){
    switch( this.type ){
      case "typeface":
      this.value = undefined;
      break;

      case "string":
      this.value = this._default !== undefined ? this._default : "";
      break;

      case "number":
      this.value = this._default !== undefined ? this._default : 1;
      break;
    }
  }

  connect( output ){
    this.connectedOutput = output;
    output.connectInput( this );
    this.parent.update()
    this.connected = true;
    this.connectListener = this.connectedOutput.parent.addListener( "update", this.__updateValue.bind( this ) )
  }

  __updateValue(){
    this.value = this.connectedOutput.parent.value;
    this.parent.update();
  }

  disconnect(){
    this.connectedOutput.parent.removeListener( "update", this.connectListener )
    let output = this.connectedOutput;
    this.connectedOutput = undefined
    if( output ){
      output.disconnectInput( this );
    }
    let listeners = this.listeners[ "disconnect" ];
    if( listeners ){
    }
    this.connected = false;
    this.parent.update();
  }

  assignRef( ref ){
    this.ref = ref;
  }

  handleChange( value ){
    if( !this.connected ){
      this.value = value;
      this.parent.update();
    }
  }

  getUniqueId(){
    let nodeList = Library.nodeList;
    let className = this.constructor.name;
    if( !nodeList[className] ){
      nodeList[className] = {}
    }
    let name = `${className}${Object.keys(nodeList[className]).length}`
    let id = Library.getUniqueId( name );
    nodeList[className][id] = id
    if( Library.idList[id] ){
    }else{
      this.id = id;
      this.name = name
      Library.idList[id] = this
    }
  }
}

export default Input;
