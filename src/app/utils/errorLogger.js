/**
 * Logs an error to the database.
 * @param {Object} error
 * @param {string} error.page - Page where error occurred (e.g., 'volunteer')
 * @param {string} [error.component] - Component where error occurred (e.g., 'VolunteerForm')
 * @param {string} [error.action] - Action being performed (e.g., 'submitVolunteerForm')
 * @param {string|number} [error.error_code] - Error code (DB/HTTP/library)
 * @param {string} error.error_message - Human-readable error message
 * @param {string} [error.status] - Status ('unresolved'|'resolved'), defaults to 'unresolved'
 * @param {string|null} [error.resolution_details] - How it was or will be resolved
 * @param {string|null} [error.error_stack] - Stack trace if available
 * @param {string|null} [error.error_details] - Library-specific details/hints
 * @returns {Promise<{success: boolean, data?: any, error?: any}>}
 */

'use server';

import { createClient } from "./supabase/server";

export const logError = async (error) => {
    const { page, component, action, error_code, error_message, status, resolution_details, error_stack, error_details } = error;
    const supabase = await createClient();
    const errorData = {
        page: page || 'unknown',
        component: component || 'unknown',
        action: action || 'unknown',
        error_code: error_code ||  null,
        error_message: error_message || 'No message provided',
        error_stack: error_stack || null,
        error_details: error_details || null,
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
