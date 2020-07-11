import React from 'react';
import { Editor } from '../tdd-1';
import user from '@testing-library/user-event';
import { savePost as mockSavePost } from '../api';
import { Redirect as MockRedirect } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';

jest.mock('../api');

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

const postBuilder = build('Post', {
  fields: {
    title: fake((f) => f.lorem.words()),
    // this adds paragraphs with new lines, always remove
    content: fake((f) => f.lorem.paragraphs().replace(/(\r\n|\n|\r)/gm, '')),
    tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
  },
});

const userBuilder = build('User', {
  fields: {
    id: sequence((s) => `user-${s}`),
  },
});

function renderEditor() {
  const fakeUser = userBuilder();
  const mockNewPost = postBuilder();

  render(<Editor user={fakeUser} />);

  const title = screen.getByLabelText(/title/i);
  const content = screen.getByLabelText(/content/i);
  const tags = screen.getByLabelText(/tags/i);
  const submitBtn = screen.getByText(/submit/i);

  return {
    fakeUser,
    mockNewPost,
    submitBtn,
    title,
    content,
    tags,
  };
}

test('should render a form with title, tags, content and submit btn', async () => {
  mockSavePost.mockResolvedValueOnce();

  const {
    fakeUser,
    mockNewPost,
    submitBtn,
    title,
    content,
    tags,
  } = renderEditor();

  const preDate = new Date().getTime();

  user.type(title, mockNewPost.title);
  user.type(content, mockNewPost.content);
  user.type(tags, mockNewPost.tags.join(','));

  user.click(submitBtn);

  expect(submitBtn).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledTimes(1);

  expect(mockSavePost).toHaveBeenCalledWith({
    ...mockNewPost,
    authorId: fakeUser.id,
    date: expect.any(String),
  });

  const postDate = new Date().getTime();

  // get time input from component
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
  );
});

test('should render an error when savePost fails', async () => {
  const errorTest = 'test error';
  mockSavePost.mockRejectedValueOnce({ data: { error: errorTest } });

  const { fakeUser, submitBtn } = renderEditor();
  user.click(submitBtn);

  const postError = await screen.findByRole('alert');
  expect(postError).toHaveTextContent(errorTest);
  expect(submitBtn).toBeEnabled();
});
