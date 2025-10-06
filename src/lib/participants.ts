export type Participant = {
  id: string;
  name: string;
  redemptionStatus: boolean;
  allCompleted: boolean;
  skillBadges: number;
  arcadeGames: number | null;
};

const participantsData: Omit<Participant, 'id'>[] = [
    { name: 'KUSHWANT KUMAR REDDY', redemptionStatus: true, allCompleted: false, skillBadges: 15, arcadeGames: 1 },
    { name: 'GONDI MOSES', redemptionStatus: true, allCompleted: false, skillBadges: 16, arcadeGames: null },
    { name: 'JAYADEEP TADAKAMALLA', redemptionStatus: true, allCompleted: false, skillBadges: 14, arcadeGames: null },
    { name: 'GADDAM HARSHITHA YADAV', redemptionStatus: true, allCompleted: false, skillBadges: 14, arcadeGames: null },
    { name: 'VIVEK KRISHNA', redemptionStatus: true, allCompleted: false, skillBadges: 13, arcadeGames: null },
    { name: 'SUMAIAH', redemptionStatus: true, allCompleted: false, skillBadges: 11, arcadeGames: null },
    { name: 'Alex Rivera', redemptionStatus: true, allCompleted: true, skillBadges: 12, arcadeGames: 2 },
    { name: 'Ben Carter', redemptionStatus: false, allCompleted: false, skillBadges: 9, arcadeGames: 0 },
    { name: 'Chloe Davis', redemptionStatus: true, allCompleted: true, skillBadges: 18, arcadeGames: 3 },
];

export async function getParticipants(): Promise<Participant[]> {
  // Add a unique ID to each participant
  return participantsData.map((p, index) => ({
    ...p,
    id: `${p.name.replace(/\s+/g, '-').toLowerCase()}-${index}`,
  }));
}
