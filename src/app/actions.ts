
'use server';

import {
  getPersonalizedPoseRecommendations,
  type PersonalizedPoseRecommendationsInput,
  type PersonalizedPoseRecommendationsOutput,
} from '@/ai/flows/personalized-pose-recommendations';

export async function generatePoseRecommendations(
  input: PersonalizedPoseRecommendationsInput
): Promise<{ data?: PersonalizedPoseRecommendationsOutput; error?: string }> {
  try {
    const result = await getPersonalizedPoseRecommendations(input);
    if (!result || result.recommendedPoses.length === 0) {
      return { error: 'Could not generate recommendations. Please try a different description.' };
    }
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
