/**
 * Temporary in-memory data, shaped like the future REST API responses (DTOs).
 * Dates are ISO strings in UTC; the interface converts them to the user's time zone.
 */
export const mockDb = {
    messages: [
        { id: 1, author: 'Marc', own: false, content: 'Anyone free on Friday night?', sentAt: '2026-11-06T18:02:00Z' },
        { id: 2, author: 'You', own: true, content: "Yes! Let's vote on a place.", sentAt: '2026-11-06T18:04:00Z' },
    ],

    survey: {
        id: 1,
        question: 'Where do we have dinner?',
        votedOptionId: null,
        options: [
            { id: 1, label: 'Pizzeria Napoli', votes: 5 },
            { id: 2, label: 'Sushi Bar', votes: 3 },
            { id: 3, label: 'Tapas & Co.', votes: 4 },
        ],
    },

    availability: {
        members: 12,
        // One row per time block, one count per weekday (Mon–Sun)
        rows: [
            { label: 'Morning', counts: [3, 2, 6, 4, 5, 10, 9] },
            { label: 'Afternoon', counts: [2, 6, 7, 3, 8, 11, 7] },
            { label: 'Evening', counts: [5, 6, 4, 7, 12, 12, 3] },
        ],
    },

    plans: [
        { id: 1, category: 'Food', title: 'Dinner downtown', distanceKm: 1.2 },
        { id: 2, category: 'Sports', title: '5-a-side match', distanceKm: 2.4 },
        { id: 3, category: 'Culture', title: 'Museum night', distanceKm: 0.8 },
    ],
};
