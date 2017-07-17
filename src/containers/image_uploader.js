import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postImage } from '../actions';
import ImageCropper from '../components/image_cropper.js';

class ImageUploader extends Component{
	constructor(props) {
	  super(props);
	  this.state = {file: '',imagePreviewUrl: '../../public/images/default.jpg'};
	  this.handleChange = this.handleChange.bind(this)
	}
	_handleSubmit(event) {
	  event.preventDefault();
	  // TODO: do something with -> this.state.file
	  this.props.postImage(this.state.file, () => {
	  	this.props.history.push('/list');
	  });
	}
	_handleImageChange(event) {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
		  this.setState({
		    file: file,
		    imagePreviewUrl: reader.result
		  });
		}

		reader.readAsDataURL(file)
	}
	handleChange(item){
		this.setState({file:item});
	}
	imagePreview(){
		let {imagePreviewUrl} = this.state;
	    let $imagePreview = null;
	    if (imagePreviewUrl) {
	    	return (
	    		<ImageCropper src={imagePreviewUrl} updateImage={this.handleChange}/>
	    	)
	    } else {
	    	return (
	    		<div>Loading...</div>
	    	)
	    }
	}
	render(){
		return(
			<div>
		    	<form onSubmit={(event)=>this._handleSubmit(event)}>
		    		<input type="file" id="upload"
		    		  onChange={(event)=>this._handleImageChange(event)} />
		    		<button className="btn btn-primary" 
		    		  type="submit" 
		    		  onClick={(event)=>this._handleSubmit(event)}>Upload Image</button>
		    	</form>
		    	<div className="imgPreview">
		    	  {this.imagePreview()}
		    	</div>
		    </div>
		)
	}
}

function mapDispatchToProps(dispatch){

	return bindActionCreators({postImage: postImage}, dispatch);
}

export default connect(null, mapDispatchToProps)(ImageUploader);