import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postImage } from '../actions';
import ImageCropper from '../components/image_cropper.js';

class ImageUploader extends Component{
	constructor(props) {
	  super(props);
	  this.state = {file: '', imageString: '', imagePreviewUrl: '../../public/images/default.jpg'};
	  this.handleChange = this.handleChange.bind(this)
	}
	_handleSubmit(event) {
	  event.preventDefault();
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
		this.setState({imageString: item}, () => {
			var file = dataURLtoFile(this.state.imageString, Date.now() + ".png");
			this.setState({file:file});
		});
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

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    console.log(new File([u8arr], filename, {type:mime}))
    return new File([u8arr], filename, {type:mime});
}