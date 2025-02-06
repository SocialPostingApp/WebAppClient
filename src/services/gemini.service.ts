import { headers } from './authService';
import apiClient from './httpCommon';

export const getGeminiReccomendation = async (bookName: string) => {
  const result = await apiClient.get<string>(`/gemini`, {
    params: {
      bookName,
    },
    headers: headers(),
  });

  return result.data;
};
