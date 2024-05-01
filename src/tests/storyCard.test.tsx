import { render } from '@testing-library/react';
import { StoryCard } from '../components/StoryCard';

jest.mock('@vkontakte/vk-mini-apps-router', () => ({
    useRouteNavigator: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

const mockItem = {
    id: 1,
    title: 'Test Story',
    by: 'Test Author',
    time: 1619790606,
    score: 10,
};

describe('<StoryCard />', () => {

    it('renders story title, author, and score', () => {
        const { getByText } = render(<StoryCard item={mockItem} />);
        expect(getByText('Test Story')).not.toBeNull();
        expect(getByText('Author: Test Author')).not.toBeNull()
        expect(getByText('10')).not.toBeNull()
    });

    it('displays converted time in the header', () => {
        const { getByText } = render(<StoryCard item={mockItem} />);
        expect(getByText('30 Apr 2021 16:50:6')).not.toBeNull()
    });
});