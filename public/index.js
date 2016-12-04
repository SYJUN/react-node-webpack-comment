
import React,{Component} from "react";
import { render } from 'react-dom';

import CommentBox from './modules/commentBox.js';


render(
	<CommentBox url="/data/comments" pollInterval={2000} />,
	document.getElementById("content")
);
