import React from 'react';
import { Editor } from '../tdd-1';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { savePost as mockSavePost } from '../api';

jest.mock('../api');

afterEach(() => {
  jest.clearAllMocks();
});

test('should render a form with title, tags, content and submit btn', () => {
  mockSavePost.mockResolvedValueOnce();

  const fakeUser = { id: 'user-1' };

  const mockNewPost = {
    title: 'Test title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  };

  render(<Editor user={fakeUser} />);

  const title = screen.getByLabelText(/title/i);
  const content = screen.getByLabelText(/content/i);
  const tags = screen.getByLabelText(/tags/i);
  const submitBtn = screen.getByText(/submit/i);

  user.type(title, mockNewPost.title);
  user.type(content, mockNewPost.content);
  user.type(tags, mockNewPost.tags.join(','));

  user.click(submitBtn);

  expect(submitBtn).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith({
    ...mockNewPost,
    authorId: fakeUser.id,
  });
});
