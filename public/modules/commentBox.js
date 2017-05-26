import React, { Component } from 'react';

import CommentForm from './commentForm';
import CommentList from './commentList';

import $ from 'jquery';

import '../css/index';

//评论框架组件
export default class CommentBox extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function ( data ) {
                this.setState({ data: data });
            }.bind(this),
            error: function ( xhr, status, err ) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleCommentSubmit( comment ) {
        let comments = this.state.data;
        comments.id = Date.now();

        let newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        $.ajax({
            type: "POST",
            url: this.props.url,
            dataType: 'json',
            data: comment,
            success: function ( data ) {
                this.setState({ data: data });
            }.bind(this),
            error: function ( xhr, status, err ) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <h1>Comments</h1>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
                <CommentList data={this.state.data} />
            </div>
        );
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        this.timer = setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }
}