'use server';
import { Resend } from 'resend';
import VolunteerEmailTemplate from '@/app/components/contact-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

import { createClient } from "@/app/utils/supabase/server";

/**
 * Server Action: submitVolunteerForm
 * - Works with either a JSON-like object or FormData from a <form action={submitVolunteerForm}>
 * - Maps fields to DB snake_case columns for the `volunteer-applications` table
 * - Returns { success: true, data } on success or { success:false, error } on failure
 */
export async function submitVolunteerForm(input) {
  try {
    const supabase = await createClient();

    // Normalize input whether it's FormData or a plain object
    const fromFormData = (fd) => {
      const get = (k) => fd.get(k) ?? '';
      const getAllChecked = (name) => {
        // handle multiple checkboxes with same name
        if (typeof fd.getAll === 'function') return fd.getAll(name);
        const v = fd.get(name);
        if (!v) return [];
        return Array.isArray(v) ? v : [v];
      };
      return {
        name: get('name') || get('full_name'),
        email: get('email'),
        phone: get('phone'),
        signalHandle: get('signal') || get('signalHandle'),
        socialMediaHandles: get('social_handles') || get('socialMediaHandles'),
        languages: getAllChecked('language'),
        bio: get('bio'),
        referrer: get('referrer'),
        immigrationHistory: get('immigration_history'),
        relevantSkills: get('relevant_skills'),
        currentlyWorking: get('currently_working'),
        currentlyWorkingExplanation: get('currently_working_explanation'),
        areasOfInterest: getAllChecked('interest'),
        otherSkills: get('other_skills'),
      };
    };

    let body;
    if (typeof FormData !== 'undefined' && input instanceof FormData) {
      body = fromFormData(input);
    } else if (typeof input === 'object' && input !== null) {
      body = { ...input };
    } else {
      return { success: false, error: { message: 'Invalid payload' } };
    }

    // Basic validation (front-end also validates)
    if (!body?.name || !body?.email) {
      return { success: false, error: { message: 'Missing required fields: name and email.' } };
    }

    // Coerce arrays if they came as comma-separated strings
    const toArray = (v) => (Array.isArray(v)
      ? v
      : typeof v === 'string' && v.trim()
      ? v.split(',').map((s) => s.trim()).filter(Boolean)
      : []);

    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      pronouns: body.pronouns || null,
      signal_handle: body.signalHandle || null,
      social_media_handles: body.socialMediaHandles || null,
      languages: toArray(body.languages),
      bio: body.bio || null,
      referrer: body.referrer || null,
      immigration_history: body.immigrationHistory || null,
      relevant_skills: body.relevantSkills || null,
      currently_working: body.currentlyWorking || null,
      currently_working_explanation: body.currentlyWorkingExplanation || null,
      interest_areas: toArray(body.areasOfInterest),
      other_skills: body.otherSkills || null,
    };

    const { data, error } = await supabase
      .from('volunteer-applications')
      .insert(payload)
      .select();

    if (error) {
        console.log('Error inserting volunteer application:', JSON.stringify(error));
      return { success: false, error };
    }
    await sendEmailNotification(payload);
    return { success: true, data };
  } catch (err) {
    console.error('Error submitting volunteer form:', err);
    return { success: false, error: { message: err?.message || 'Unknown error' } };
  }
}

async function sendEmailNotification(applicationData) {
  try{
    await resend.emails.send({
      from: 'noreply@indianaaid.org',
      to: 'indianaaidcontact@gmail.com',
      subject: 'New Volunteer Application Submitted',
      react: VolunteerEmailTemplate(applicationData),
    });
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}