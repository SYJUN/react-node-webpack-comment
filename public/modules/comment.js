import React,{Component} from 'react';

let showdown = require('showdown');
//每条评论组件
export default class Comment extends Component{
	constructor(props){
		super(props);
	}

	rawMarkup(){
		const converter = new showdown.Converter();
		let rawMarkup = converter.makeHtml(this.props.children.toString());
		return {__html:rawMarkup};
	}

	render() {
		
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
}