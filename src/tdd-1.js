import React from 'react';
import { savePost } from './api';
import { Redirect } from 'react-router';

const Editor = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [error, setError] = React.useState(null);

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

    savePost(newPost)
      .then(() => setRedirect(true))
      .catch((error) => {
        setIsSubmitting(false);
        setError(error.data.error);
      });
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

      {error ? <div role="alert">{error}</div> : null}
    </form>
  );
};

export { Editor };
