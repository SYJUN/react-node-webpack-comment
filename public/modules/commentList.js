import React,{Component} from 'react';

import Comment from './comment.js';

//评论列表组件
export default class CommentList extends Component{
	constructor(props){
		super(props);
	}

	render() {
		var commentNodes = this.props.data.map(function(commentItem,idx){
			return (
				<Comment author={commentItem.author} key={commentItem+idx}>
					{commentItem.text}
				</Comment> 
			);
		});

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}