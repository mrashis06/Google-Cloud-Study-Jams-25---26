'use server';
/**
 * @fileOverview An AI agent that provides actionable insights based on participant data.
 *
 * - generateActionableInsights - A function that generates actionable insights.
 * - GenerateActionableInsightsInput - The input type for the generateActionableInsights function.
 * - GenerateActionableInsightsOutput - The return type for the generateActionableInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActionableInsightsInputSchema = z.object({
  participantData: z.string().describe('The participant data in JSON format, including names and scores.'),
});
export type GenerateActionableInsightsInput = z.infer<typeof GenerateActionableInsightsInputSchema>;

const GenerateActionableInsightsOutputSchema = z.object({
  insights: z.string().describe('Actionable insights based on the participant data.'),
});
export type GenerateActionableInsightsOutput = z.infer<typeof GenerateActionableInsightsOutputSchema>;

export async function generateActionableInsights(
  input: GenerateActionableInsightsInput
): Promise<GenerateActionableInsightsOutput> {
  return generateActionableInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActionableInsightsPrompt',
  input: {schema: GenerateActionableInsightsInputSchema},
  output: {schema: GenerateActionableInsightsOutputSchema},
  prompt: `You are an AI assistant that provides actionable insights based on participant data from a leaderboard.

Analyze the following participant data and provide actionable insights, such as identifying people in a 'plateau of productivity' stage and actions to help them improve.  Return the insights as a string.

Participant Data: {{{participantData}}}`,
});

const generateActionableInsightsFlow = ai.defineFlow(
  {
    name: 'generateActionableInsightsFlow',
    inputSchema: GenerateActionableInsightsInputSchema,
    outputSchema: GenerateActionableInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
