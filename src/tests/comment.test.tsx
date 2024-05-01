import { render, fireEvent, waitFor } from '@testing-library/react';
import { Comment } from '../components/Comment';
import { getComments as mockGetComments } from '../api/api';

// Mock the API function getComments
jest.mock('../api/api');

const getComments = mockGetComments as jest.MockedFunction<typeof mockGetComments>;

describe('Comment component', () => {
    const commentData = {
        id: 1,
        by: 'John Doe',
        text: 'This is a comment.',
        time: 1619794158,
        kids: [2, 3]
    };

    it('renders author name and comment text', () => {
        const { getByText } = render(<Comment comment={commentData} />);
        expect(getByText('John Doe')).not.toBeNull();
        expect(getByText('This is a comment.')).not.toBeNull();
    });

    it('displays "Show replies" button if comment has child comments', () => {
        const { getByText } = render(<Comment comment={commentData} />);
        expect(getByText('Show replies')).not.toBeNull();
    });

    it('fetches and displays child comments when "Show replies" is clicked', async () => {
        const { getByText, queryByText } = render(<Comment comment={commentData} />);
        const showRepliesButton = getByText('Show replies');

        const nestedCommentsData = [
            { id: 2, by: 'Alice', text: 'Reply 1', time: 1619794200 },
            { id: 3, by: 'Bob', text: 'Reply 2', time: 1619794300 }
        ];
        getComments.mockResolvedValueOnce(nestedCommentsData);

        fireEvent.click(showRepliesButton);

        // Wait for the child comments to be rendered
        await waitFor(() => {
            expect(queryByText('Reply 1')).not.toBeNull();
            expect(queryByText('Reply 2')).not.toBeNull();
        });
    });

    it('hides child comments when "Hide" button is clicked', async () => {
        const { getByText, queryByText } = render(<Comment comment={commentData} />);
        const showRepliesButton = getByText('Show replies');

        const nestedCommentsData = [
            { id: 2, by: 'Alice', text: 'Reply 1', time: 1619794200 },
            { id: 3, by: 'Bob', text: 'Reply 2', time: 1619794300 }
        ];

        getComments.mockResolvedValueOnce(nestedCommentsData);

        fireEvent.click(showRepliesButton);

        await waitFor(() => {
            expect(queryByText('Reply 1')).not.toBeNull();
            expect(queryByText('Reply 2')).not.toBeNull();
        });

        const hideRepliesButton = getByText('Hide replies');
        fireEvent.click(hideRepliesButton);
        expect(queryByText('Reply 1')).toBeNull();
        expect(queryByText('Reply 2')).toBeNull();
    });
});
