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
            const name = row['Student Name'];
            
            // Skip header or invalid rows
            if (!name || name === 'Student Name') {
              return null;
            }

            return {
              id: `${name.replace(/\s+/g, '-').toLowerCase()}-${index}`,
              name: name,
              email: row['Student Email'],
              profileUrl: row['Google Cloud Skills Boost Profile URL'],
              profileUrlStatus: row['Profile URL Status'] === 'All Good' ? 'All Good' : 'Incomplete',
              accessCodeRedemption: row['Access Code Redemption Status'] === 'Yes' ? 'Redeemed' : 'Pending',
              redemptionStatus: row['Redemption Status'] === 'Yes',
              allCompleted: row['# of Skill Badges Completed'] >= 10,
              skillBadges: Number(row['# of Skill Badges Completed'] || 0),
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
