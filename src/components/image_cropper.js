import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor'
class ImageCropper extends Component{
	constructor(props) {
	  super(props);
	  this.state ={dataURL: this.props.src}
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.props.src != prevProps.src){
			this.setState({dataURL: this.props.src});
		}
	}
	onClickSave(){
	  if (this.editor) {
	    const canvasScaled = this.editor.getImageScaledToCanvas();
	    var dataURL = canvasScaled.toDataURL();
	    this.setState({dataURL: dataURL}, () => {
	    	this.props.updateImage(this.state.dataURL);
	    });
	  }
	}
	setEditorRef = (editor) => this.editor = editor
	render(){
		return(
			<div>
				<AvatarEditor
		        image={this.state.dataURL}
		        ref={this.setEditorRef}
		        width={400}
		        height={400}
		        border={50}
		        color={[255, 255, 255, 0.6]} // RGBA 
		        scale={1.3}
		        rotate={0}
		      />
		      	<button className="btn" 
		    		  onClick={()=>this.onClickSave()}>Crop Image
		    	</button>
			</div>		    	
		)
	}
}

export default ImageCropper;