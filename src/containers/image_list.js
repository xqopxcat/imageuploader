import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchImage, getImage, ROOT_URL } from '../actions';
import ImageItem from '../components/image_item';

class ImageList extends Component{
	constructor(props){
		super(props)
		this.state = { imgSrc: '', extension:'' };
	}
	componentDidMount(){
		this.props.fetchImage();
	}
	onImgClick(id, extension){
		this.setState({imgSrc: `${ROOT_URL}/${id}`, extension:`${extension}`}, () => {
			this.props.getImage(id, extension, 800, 600);
		})
	}
	renderImages(){
		return _.map(this.props.images, (image) =>{
			return <li className="list-group-item" key={image.name}><img onClick={() => {this.onImgClick(`${image.name}`, `${image.extension}`)}} width={128} height={128} style={{objectFit:'cover'}} src={`${ROOT_URL}/${image.name}${image.extension}`} /></li>
		})	
	}
	render(){
		const imgSrc = this.state.imgSrc;
		const imgExt = this.state.extension;
		return(
			<div>
				<ul className="list-group col-xs-2">
					{this.renderImages()}
				</ul>
				{imgSrc == "" ? null : <ImageItem smallImg={`${imgSrc}${imgExt}`} 
				largeImg={`${ROOT_URL}/${this.props.getimage.filename}`}/>}
			</div>
		)
	}
}

function mapStateToProps(state){
	return { 
		images: state.images,
		getimage: state.getimage
	 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchImage, getImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);