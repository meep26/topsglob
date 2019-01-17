import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem';

import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

class PostMain extends Component {

   componentDidMount() {
      this.props.getPosts();
   }

   render() {
      const { posts, isFetching } = this.props.post;

      const allPosts = (!isFetching)
      ?
         (posts.length > 0)
            ? posts.map((post, index) => {
               return(
                  <PostItem key={index}
                     user={post.user}
                     content={post.content}
                     created={post.createdAt}
                  />
               );
            })
            : <h1>No posts</h1>
      : <h2>Loading...</h2>;

      return (         
         <div>
            {allPosts}
         </div>
      )
   }
}

PostMain.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post
});

export default connect(mapStateToProps, { getPosts })(PostMain);