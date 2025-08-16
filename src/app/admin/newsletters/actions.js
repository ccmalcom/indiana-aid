'use server';
import { createClient } from '@/app/utils/supabase/server';
import { createServiceClient } from '@/app/utils/supabase/serviceWorker';

export async function deleteNewsletterIssue(issueId) {
    const supabase = await createServiceClient();
    // 1. Delete the issue and thumbnail from  storage
    await deleteThumbnail(supabase, issueId.language, issueId.volume);
    await deletePdf(supabase, issueId.language, issueId.volume);

    // 2. Delete the issue from the database
    const { data, error } = await supabase
        .from("newsletter_issues")
        .delete()
        .eq("id", issueId);

    if (error) {
        console.error("Error deleting newsletter issue:", JSON.stringify(error));
        throw error;
    }

    return data;
}

export async function updateNewsletterIssue(data) {
    // can update date and published option
    const supabase = await createClient();
    const { data: issueData, error: issueError } = await supabase
        .from("newsletter_issues")
        .update({
            date: data.date,
            published: data.published,
        })
        .eq("id", data.id);

    if (issueError) {
        console.error("Error updating newsletter issue:", JSON.stringify(issueError));
        throw issueError;
    }

    return issueData;
}

// new newsletter issue creation
//  will require upload to both database (newsletter_issues table) and storage (newsletters storage bucket)
// input: { volume, language, date, thumbnail, pdf, published }
export async function createNewsletterIssue(data) {
    const supabase = await createServiceClient();
    // first, upload the thumbnail and PDF to storage
    // newsletters/{language}/thumbnails/{volume}.jpg
    // newsletters/{language}/pdfs/{volume}.pdf
    const thumbnailUrl = await uploadThumbnail(supabase, data.language, data.volume, data.thumbnail);
    const pdfUrl = await uploadPdf(supabase, data.language, data.volume, data.pdf);

    // then, insert a new record into the newsletter_issues table
    const { data: issueData, error: issueError } = await supabase
        .from("newsletter_issues")
        .insert({
            volume: data.volume,
            language: data.language,
            date: data.date,
            published: data.published,
        });

    if (issueError) {
        console.error("Error creating newsletter issue:", JSON.stringify(issueError));
        throw issueError;
    }
    console.log('Created newsletter issue:', JSON.stringify({ ...issueData, thumbnail: thumbnailUrl, pdf: pdfUrl }, null, 2));

    return issueData;
}

// for admin portal table (all data)
export async function getNewsletterInfo() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_issues")
        .select("*")
        .order("volume", { ascending: false });
    if (error) {
        console.error("Error fetching newsletter issues:", JSON.stringify(error));
        return [];
    }
    // Format the thumbnail URLs
    const formattedData = data.map(newsletter => ({
        ...newsletter,
        thumbnail: formatThumbnailUrl(newsletter),
    }));

    return formattedData;
}

async function deletePdf(supabase, language, volume) {
    const { error } = await supabase.storage
        .from('newsletters')
        .remove([`${language}/${volume}.pdf`]);

    if (error) {
        console.error("Error deleting PDF:", JSON.stringify(error));
        throw error;
    }
}

async function deleteThumbnail(supabase, language, volume) {
    const { error } = await supabase.storage
        .from('newsletters')
        .remove([`${language}/thumbnails/${volume}.jpg`]);

    if (error) {
        console.error("Error deleting thumbnail:", JSON.stringify(error));
        throw error;
    }
}

async function uploadPdf(supabase, language, volume, pdf) {
    const { data, error } = await supabase.storage
        .from('newsletters')
        .upload(`${language}/${volume}.pdf`, pdf, {
            contentType: 'application/pdf',
            upsert: true,
        });
    if (error) {
        console.error("Error uploading PDF:", JSON.stringify(error));
        throw error;
    }
    return data.Key; // Return the key of the uploaded file
}

function formatThumbnailUrl(newsletter) {
    const baseUrl = process.env.NEXT_PUBLIC_NEWSLETTER_BASE_URL;
    const language = newsletter.language || '';
    const issue = newsletter.volume || '';

    return `${baseUrl}/${language}/thumbnails/${issue}.jpg`;
}




async function uploadThumbnail(supabase, language, volume, thumbnail) {
    const { data, error } = await supabase.storage
        .from('newsletters')
        .upload(`${language}/thumbnails/${volume}.jpg`, thumbnail, {
            contentType: 'image/jpeg',
            upsert: true,
        });

    if (error) {
        console.error("Error uploading thumbnail:", JSON.stringify(error));
        throw error;
    }

    return data.Key; // Return the key of the uploaded file

}
