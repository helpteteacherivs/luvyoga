'use server';

/**
 * @fileOverview Provides personalized yoga pose recommendations based on the user's current posture.
 *
 * - getPersonalizedPoseRecommendations - A function that generates personalized yoga pose recommendations.
 * - PersonalizedPoseRecommendationsInput - The input type for the getPersonalizedPoseRecommendations function.
 * - PersonalizedPoseRecommendationsOutput - The return type for the getPersonalizedPoseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedPoseRecommendationsInputSchema = z.object({
  currentPosture: z
    .string()
    .describe("The user's current posture, described in detail."),
});
export type PersonalizedPoseRecommendationsInput =
  z.infer<typeof PersonalizedPoseRecommendationsInputSchema>;

const PersonalizedPoseRecommendationsOutputSchema = z.object({
  recommendedPoses: z.array(
    z.object({
      name: z.string().describe('The name of the yoga pose.'),
      description: z
        .string()
        .describe('A detailed description of the yoga pose.'),
      instructions: z
        .string()
        .describe('Step-by-step instructions for performing the pose.'),
      precautions: z
        .string()
        .describe('Safety precautions to consider before attempting the pose.'),
      benefits: z.string().describe('The benefits of performing the pose.'),
    })
  ),
});
export type PersonalizedPoseRecommendationsOutput =
  z.infer<typeof PersonalizedPoseRecommendationsOutputSchema>;

export async function getPersonalizedPoseRecommendations(
  input: PersonalizedPoseRecommendationsInput
): Promise<PersonalizedPoseRecommendationsOutput> {
  return personalizedPoseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPoseRecommendationsPrompt',
  input: {schema: PersonalizedPoseRecommendationsInputSchema},
  output: {schema: PersonalizedPoseRecommendationsOutputSchema},
  prompt: `You are an expert yoga instructor providing personalized yoga pose recommendations.

Based on the user's current posture, provide a list of yoga poses that would be beneficial.
For each pose, include a detailed description, step-by-step instructions, precautions, and benefits.
Emphasize safety and proper form.

Current Posture: {{{currentPosture}}}

Output the response in JSON format. The output should be an array of yoga poses with name, description, instructions, precautions and benefits for each.`, // Ensure correct Handlebars syntax
});

const personalizedPoseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedPoseRecommendationsFlow',
    inputSchema: PersonalizedPoseRecommendationsInputSchema,
    outputSchema: PersonalizedPoseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
