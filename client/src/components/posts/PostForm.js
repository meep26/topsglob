import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
   state = {
      content: '',
      errors: {}
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.post.errors) {
         this.setState({
            errors: nextProps.post.errors
         });
      }
   }

   onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = async e => {
      e.preventDefault();

      const { id } = this.props.auth.user;
      const { content } = this.state;
      const newPost = {
         user: id,
         content: content
      };

      await this.props.addPost(newPost);
      this.setState({ content: '' });
   }

   render() {
      const { errors, content } = this.state;
      const { isPosting } = this.props.post;

      return (
         <div className="postform">
            <label htmlFor="content" className="title is-4">What's new</label>
            <div className="card m-t-sm p-md">
               <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this)}>                    
                     <TextAreaFieldGroup
                        name="content"
                        placeholder="Say something..."
                        onChange={this.onChange.bind(this)}
                        error={errors.content}
                        value={content}
                     />
                     <div className="field m-t-sm">
                        <div className="control">
                           <button className={classnames('button is-info', {'is-loading': isPosting})}>Create Post</button>
                        </div>
                     </div>
                  </form>
               </div>      
            </div>
         </div>
      )
   }
}

PostForm.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post
});

export default connect(mapStateToProps, { addPost })(PostForm);
