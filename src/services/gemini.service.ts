import { GeminiResponse } from '../models/interfaces/GeminiResponse';
import { headers } from './authService';
import apiClient from './httpCommon';

export const getGeminiReccomendation = async (bookName: string) => {
  const result = await apiClient.get<GeminiResponse>(
    `/gemini`,
    // { bookName },
    {
      params: {
        bookName,
      },
      headers: headers(),
    }
  );

  return result.data;
};
