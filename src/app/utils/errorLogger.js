/**
 * Logs an error to the database.
 * @param {Object} error
 * @param {string} error.page - Page where error occurred
 * @param {string|number} [error.error_code] - Error code if available
 * @param {string} error.error_message - Error description
 * @param {string} [error.status] - Status (e.g., 'unresolved', 'resolved')
 * @param {string} [error.resolution_details] - Optional resolution info
 */

'use server';

import { createClient } from "./supabase/server";

export const logError = async (error) => {
    const { page, error_code, error_message, status, resolution_details } = error;
    const supabase = await createClient();
    const errorData = {
        page: page || 'unknown',
        error_code: error_code || null,
        error_message: error_message || 'No message provided',
        status: status || 'unresolved',
        resolution_details: resolution_details || null,
        timestamp: new Date().toISOString()
    };

    try {

        const { data, error: insertError } = await supabase
            .from('website_errors')
            .insert([errorData]);

        if (insertError) {
            console.error('Error logging to database:', insertError);
            return { success: false, error: insertError };
        }
        return { success: true, data };
    } catch (err) {
        console.error('Error logging to database:', err);
        return { success: false, error: err };
    }

}
