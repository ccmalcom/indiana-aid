'use server';

export async function getAPIKey() {
    // This function retrieves the Google API key from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error('Google API key is not defined in environment variables');
    }
    return apiKey;
}