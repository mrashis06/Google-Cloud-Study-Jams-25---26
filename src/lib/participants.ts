export type Participant = {
  id: string;
  name: string;
  email: string;
  profileUrl: string;
  profileUrlStatus: 'All Good' | 'Incomplete';
  accessCodeRedemption: 'Redeemed' | 'Pending';
  redemptionStatus: boolean;
  allCompleted: boolean;
  skillBadges: number;
  arcadeGames: number | null;
};

const participantsData: Omit<Participant, 'id'>[] = [
    { name: 'KUSHWANT KUMAR REDDY', email: 'kushwant.work@gmail.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: true, skillBadges: 15, arcadeGames: 1 },
    { name: 'GONDI MOSES', email: 'gondi.moses@example.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: false, skillBadges: 16, arcadeGames: null },
    { name: 'JAYADEEP TADAKAMALLA', email: 'jayadeep.t@example.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: false, skillBadges: 14, arcadeGames: null },
    { name: 'GADDAM HARSHITHA YADAV', email: 'gaddam.harshitha@example.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: false, skillBadges: 14, arcadeGames: null },
    { name: 'VIVEK KRISHNA', email: 'vivek.krishna@example.com', profileUrl: '#', profileUrlStatus: 'Incomplete', accessCodeRedemption: 'Pending', redemptionStatus: true, allCompleted: false, skillBadges: 13, arcadeGames: null },
    { name: 'SUMAIAH', email: 'sumaiah@example.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: false, skillBadges: 11, arcadeGames: null },
    { name: 'Alex Rivera', email: 'alex.rivera@example.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: true, skillBadges: 12, arcadeGames: 2 },
    { name: 'Ben Carter', email: 'ben.carter@example.com', profileUrl: '#', profileUrlStatus: 'Incomplete', accessCodeRedemption: 'Pending', redemptionStatus: false, allCompleted: false, skillBadges: 9, arcadeGames: 0 },
    { name: 'Chloe Davis', email: 'chloe.davis@example.com', profileUrl: '#', profileUrlStatus: 'All Good', accessCodeRedemption: 'Redeemed', redemptionStatus: true, allCompleted: true, skillBadges: 18, arcadeGames: 3 },
];

export async function getParticipants(): Promise<Participant[]> {
  // Add a unique ID to each participant
  return participantsData.map((p, index) => ({
    ...p,
    id: `${p.name.replace(/\s+/g, '-').toLowerCase()}-${index}`,
  }));
}

export async function getParticipantById(id: string): Promise<Participant | undefined> {
  const participants = await getParticipants();
  return participants.find(p => p.id === id);
}
