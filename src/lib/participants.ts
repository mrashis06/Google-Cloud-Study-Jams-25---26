import Papa from 'papaparse';

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
  completedSkillBadges: string[];
  arcadeGames: number | null;
};

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1UL2OK8oolWeehcs799ofOwxWciSJ5D0xyGuUxAhE1wI/gviz/tq?tqx=out:csv&gid=490025218';

export async function getParticipants(): Promise<Participant[]> {
  try {
    const response = await fetch(SPREADSHEET_URL);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const participants = results.data.map((row: any, index: number) => {
            const name = row['User Name'];
            
            // Skip header or invalid rows
            if (!name || name === 'User Name') {
              return null;
            }

            const completedBadges = row['Names of Completed Skill Badges'];

            return {
              id: `${name.replace(/\s+/g, '-').toLowerCase()}-${index}`,
              name: name,
              email: row['User Email'],
              profileUrl: row['Google Cloud Skills Boost Profile URL'],
              profileUrlStatus: row['Profile URL Status'] === 'All Good' ? 'All Good' : 'Incomplete',
              accessCodeRedemption: row['Access Code Redemption Status'] === 'Yes' ? 'Redeemed' : 'Pending',
              redemptionStatus: row['Access Code Redemption Status'] === 'Yes',
              allCompleted: row['All Skill Badges & Games Completed'] === 'Yes',
              skillBadges: Number(row['No of Skill Badges Completed'] || 0),
              completedSkillBadges: completedBadges ? completedBadges.split('|').map((s: string) => s.trim()) : [],
              arcadeGames: row['# of Arcade Games Completed'] ? Number(row['# of Arcade Games Completed']) : null,
            };
          }).filter(p => p !== null) as Participant[];
          
          // Sort by skill badges descending
          participants.sort((a, b) => b.skillBadges - a.skillBadges);

          resolve(participants);
        },
        error: (error: Error) => {
          console.error("Error parsing CSV:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Failed to fetch spreadsheet:", error);
    return [];
  }
}

export async function getParticipantById(id: string): Promise<Participant | undefined> {
  const participants = await getParticipants();
  return participants.find(p => p.id === id);
}
