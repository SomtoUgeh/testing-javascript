import React from 'react';
import { savePost } from './api';
import { Redirect } from 'react-router';

const Editor = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, content, tags } = e.target.elements;

    const newPost = {
      authorId: user.id,
      title: title.value,
      content: content.value,
      date: new Date().toISOString(),
      tags: tags.value.split(',').map((t) => t.trim()),
    };

    savePost(newPost).then(() => setRedirect(true));
  }

  if (redirect) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        <input id="title" name="title" />
      </label>

      <label htmlFor="content">
        Content
        <input id="content" name="content" />
      </label>

      <label htmlFor="tags">
        Tags
        <input id="tags" name="tags" />
      </label>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export { Editor };
