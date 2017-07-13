import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchImage, ROOT_URL } from '../actions';

class ImageList extends Component{
	componentDidMount(){
		this.props.fetchImage();
	}
	renderImages(){
		console.log(this.props.images)
		return _.map(this.props.images, (image) =>{
			console.log(image)
			return <li key={image.name}><img width={128} height={128} style={{objectFit:'cover'}} src={`${ROOT_URL}/${image.name}${image.extension}`} /></li>
		})	
	}
	render(){
		return(
			<ul>
				{this.renderImages()}
			</ul>
		)
	}
}

function mapStateToProps(state){
	return { images: state.images };
}

export default connect(mapStateToProps, { fetchImage })(ImageList);