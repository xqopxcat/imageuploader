import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchImage, ROOT_URL } from '../actions';
import ImageItem from '../containers/image_item';

class ImageList extends Component{
	constructor(props){
		super(props)
		this.state = { imgSrc: '', extension:'' };
	}
	componentDidMount(){
		this.props.fetchImage();
	}
	onImgClick(id, extension){
		console.log(id);
		this.setState({imgSrc: `http://localhost:3000/${id}`, extension:`${extension}`})
	}
	renderImages(){
		return _.map(this.props.images, (image) =>{
			return <li key={image.name}><img onClick={() => {this.onImgClick(`${image.name}`, `${image.extension}`)}} width={128} height={128} style={{objectFit:'cover'}} src={`${ROOT_URL}/${image.name}${image.extension}`} /></li>
		})	
	}
	render(){
		const imgSrc = this.state.imgSrc;
		const imgExt = this.state.extension;
		return(
			<div>
				<ul className="col-xs-2">
					{this.renderImages()}
				</ul>
				<ImageItem smallImg={`${imgSrc}${imgExt}`} largeImg={`${imgSrc}-800x600${imgExt}`}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return { images: state.images };
}

export default connect(mapStateToProps, { fetchImage })(ImageList);