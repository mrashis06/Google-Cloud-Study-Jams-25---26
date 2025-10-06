
'use server';

import { generateActionableInsights } from '@/ai/flows/generate-actionable-insights';
import { getParticipantData, type Participant } from '@/lib/data';

export async function getRefreshedDataAction(): Promise<Participant[]> {
    return await getParticipantData();
}

export async function generateInsightsAction(participants: Participant[]) {
  try {
    const participantData = JSON.stringify(
      participants.map(({ name, score }) => ({ name, score }))
    );

    const result = await generateActionableInsights({ participantData });
    return { success: true, insights: result.insights };
  } catch (error) {
    console.error('Error generating insights:', error);
    return { success: false, error: 'Failed to generate insights. Please try again.' };
  }
}
