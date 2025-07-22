'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/app/utils/supabase/server';

export async function login(formData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') ,
		password: formData.get('password') ,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect('/error');
	}

	// revalidatePath('/', 'layout');
	redirect('/admin');
}


export async function signout() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/logout');
}

export async function getUser() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();


	return data.user;
}