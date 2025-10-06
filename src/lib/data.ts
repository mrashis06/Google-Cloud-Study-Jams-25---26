export type Participant = {
  id: string;
  name: string;
  score: number;
};

// Mock data simulating a Google Sheet API response
const initialParticipants: Omit<Participant, 'id'>[] = [
  { name: 'Alex Rivera', score: 1050 },
  { name: 'Ben Carter', score: 980 },
  { name: 'Chloe Davis', score: 1120 },
  { name: 'David Evans', score: 850 },
  { name: 'Emily Frank', score: 1200 },
  { name: 'Frank Green', score: 760 },
  { name: 'Grace Hall', score: 1300 },
  { name: 'Henry Ives', score: 920 },
  { name: 'Isla Jones', score: 1150 },
  { name: 'Jack King', score: 680 },
  { name: 'Kate Lewis', score: 1080 },
  { name: 'Liam Miller', score: 890 },
];

// Function to simulate fetching and dynamically updating data
export async function getParticipantData(): Promise<Participant[]> {
  // In a real app, you would fetch from an API here.
  // For this simulation, we'll map over the initial data and add a unique ID,
  // and slightly randomize scores to simulate real-time updates.
  const updatedParticipants = initialParticipants.map((p, index) => ({
    ...p,
    id: `${p.name.replace(/\s+/g, '-').toLowerCase()}-${index}`,
    // Add a random fluctuation to scores to simulate changes
    score: p.score + Math.floor(Math.random() * 51) - 25,
  }));

  // Sort by score in descending order
  updatedParticipants.sort((a, b) => b.score - a.score);

  return updatedParticipants;
}
