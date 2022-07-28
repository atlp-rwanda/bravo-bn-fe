import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
import Meta, { Primary as PrimaryStory } from '../stories/Button.stories';

const Primary = composeStory(PrimaryStory, Meta);

test('onclick handler is called', () => {
  const onClickSpy = jest.fn();
  render(<Primary onClick={onClickSpy} />);
  const buttonElement = screen.getByRole('button');
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
});