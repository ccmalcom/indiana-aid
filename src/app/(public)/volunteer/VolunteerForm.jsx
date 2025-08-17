'use client';
import { useState } from 'react';
import Link from 'next/link';
import { submitVolunteerForm } from './actions';

export default function Volunteer({ content }) {

	const {
		formSubmitButtonText,
		volunteerFormHeaderText,
		volunteerFormInstructionsText,
		successHeader,
		successMessage,
		contactUsLink,
		errorHeader,
		errorMessage,
		volunteerForm
	} = content



	const AREAS_OF_INTEREST = [
		'Weekly virtual visits',
		'Monthly in-person visits',
		'Accounting-related',
		'Administrative tasks',
		'Advocacy/legislative/mezzo-macro focus',
		'Commissary payment assistance',
		'Court observation/court accompaniment',
		'Fundraising',
		'Partner family support',
		'Social media',
		'Transportation',
		'Volunteer Coordination',
	];

	const [fullName, setFullName] = useState('');
	const [pronouns, setPronouns] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [signalHandle, setSignalHandle] = useState('');
	const [socialHandles, setSocialHandles] = useState('');
	const [bio, setBio] = useState('');
	const [referrer, setReferrer] = useState('');
	const [immigrationHistory, setImmigrationHistory] = useState(''); // 'yes' | 'no'
	const [relevantSkills, setRelevantSkills] = useState('');
	const [currentlyWorking, setCurrentlyWorking] = useState(''); // 'yes' | 'no'
	const [currentlyWorkingExplanation, setCurrentlyWorkingExplanation] = useState('');
	const [otherSkills, setOtherSkills] = useState('');
	const [reference, setReference] = useState('');
	const [isLanguagesFilled, setIsLanguagesFilled] = useState(false);
	const [isInterestsFilled, setIsInterestsFilled] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState(null);
	const [submissionMessage, setSubmissionMessage] = useState('');

	const formatPhoneNumber = (value) => {
		const digits = value.replace(/\D/g, '').substring(0, 10);
		const parts = [];

		if (digits.length > 0) parts.push(digits.slice(0, 3));
		if (digits.length > 3) parts.push(digits.slice(3, 6));
		if (digits.length > 6) parts.push(digits.slice(6, 10));

		return parts.join('-');
	};

	const handlePhoneChange = (e) => {
		const formattedNumber = formatPhoneNumber(e.target.value);
		setPhoneNumber(formattedNumber);
	};

	const handleLanguagesChange = (e) => {
		const checkboxes = e.currentTarget.querySelectorAll('input[name="language"]');
		const anyChecked = Array.from(checkboxes).some(
			(checkbox) => checkbox.checked
		);
		setIsLanguagesFilled(anyChecked);
	};

	const handleInterestsChange = (e) => {
		const checkboxes = e.currentTarget.querySelectorAll(
			'input[name="interest"]'
		);
		const anyChecked = Array.from(checkboxes).some(
			(checkbox) => checkbox.checked
		);
		setIsInterestsFilled(anyChecked);
	};

	const handleTestButtonClick = () => {
		console.log('Test button clicked');
		// set all form values to dummy values
		setFullName('John Doe');
		setPronouns('He/Him');
		setEmail('johndoe@example.com');
		setPhoneNumber('123-456-7890');
		setSignalHandle('@johndoe');
		setSocialHandles('https://twitter.com/johndoe');
		setBio('I am a passionate volunteer.');
		setReferrer('Friend');
		setImmigrationHistory('yes');
		setRelevantSkills('Communication, Teamwork');
		setCurrentlyWorking('no');
		setCurrentlyWorkingExplanation('');
		setOtherSkills('Photography');
		setReference('Jane Smith');
	};

	const isFormValid =
		email.trim() &&
		fullName.trim() &&
		isLanguagesFilled &&
		isInterestsFilled &&
		bio.trim() &&
		immigrationHistory !== '' &&
		relevantSkills.trim() &&
		currentlyWorking !== '' &&
		otherSkills.trim() &&
		reference.trim();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			name: fullName,
			email,
			phone: phoneNumber,
			pronouns,
			signalHandle,
			socialMediaHandles: socialHandles,
			languages: Array.from(
				e.target.querySelectorAll('input[name="language"]:checked')
			).map((checkbox) => checkbox.value),
			bio,
			referrer,
			immigrationHistory, // 'yes' or 'no'
			relevantSkills,
			currentlyWorking, // 'yes' or 'no'
			currentlyWorkingExplanation,
			areasOfInterest: Array.from(
				e.target.querySelectorAll('input[name="interest"]:checked')
			).map((checkbox) => checkbox.value),
			otherSkills,
			reference
		};
		setIsSubmitting(true);
		setSubmissionStatus(null);
		setSubmissionMessage('');
		try {
			const result = await submitVolunteerForm(formData);
			if (result.success) {
				setSubmissionStatus('success');
				setSubmissionMessage('Thank you for signing up to volunteer!');
				e.target.reset();
				setIsLanguagesFilled(false);
				setIsInterestsFilled(false);
				setFullName('');
				setPronouns('');
				setEmail('');
				setPhoneNumber('');
				setSignalHandle('');
				setSocialHandles('');
				setBio('');
				setReferrer('');
				setImmigrationHistory('');
				setRelevantSkills('');
				setCurrentlyWorking('');
				setCurrentlyWorkingExplanation('');
				setOtherSkills('');
			} else if (result.error.message === 'duplicate key value violates unique constraint') {
				setSubmissionStatus('error');
				setSubmissionMessage(
					'Oops! It looks like you have already signed up to volunteer. If you need to update your information, please contact us'
				);
			} else if (result.error) {
				setSubmissionStatus('error');
				console.log('Error:', JSON.stringify(result.error));
				setSubmissionMessage('An error occurred. Please try again.');
			}
		} catch (error) {
			console.error(error);
			setSubmissionStatus('error');
			setSubmissionMessage('Network error. Please try again later.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			id="volunteer-form"
			className="volunteer-form w-[90vw] lg:w-[70%] mx-auto flex flex-col items-center bg-blue rounded-2xl shadow-lg p-8 m-4 text-white ">
			<h2 className="text-2xl font-heading font-bold">
				{volunteerFormHeaderText.value}
			</h2>
			{isSubmitting ? (
				<div className="h-6 mt-2 text-sm text-center font-body">
					<span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
				</div>
			) : submissionStatus === 'success' ? (
				<div className="my-20 text-center">
					<h2 className="text-green text-xl font-semibold">
						{successHeader.value}
					</h2>
					<br />
					<p>
						{successMessage.value}
						<Link href="/contact" className="underline text-yellow">
							{contactUsLink.value}
						</Link>
					</p>
				</div>
			) : submissionStatus === 'error' ? (
				<div className="my-20 text-center">
					<h2 className="text-red text-xl text-semibold">
						{errorHeader.value}
					</h2>
					<br />
					<p>
						{errorMessage.value}
						<Link href="/contact" className="underline text-yellow">
							{contactUsLink.value}
						</Link>{' '}
					</p>
				</div>
			) : (
				<>
					<p className={volunteerFormInstructionsText.style}>
						{volunteerFormInstructionsText.value}
					</p>
					<button onClick={handleTestButtonClick} className="mt-4 px-4 py-2 bg-yellow text-black rounded">
						Test
					</button>

					<form className="w-full px-8 mt-4" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.emailLabel || 'Email Address'}<span className="text-red">*</span></label>
							<input
								type="email"
								name="email"
								placeholder={volunteerForm.value_json.emailPlaeholder || 'email@website.com'}
								className="w-full p-2 rounded text-black"
								value={email}
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.nameLabel || 'First and Last Name'}<span className="text-red">*</span></label>
							<input
								type="text"
								name="full_name"
								placeholder={volunteerForm.value_json.namePlaceholder || 'John Doe'}
								className="w-full p-2 rounded text-black"
								value={fullName}
								required
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.pronounsLabel || 'Pronouns'}</label>
							<input
								type="text"
								name="pronouns"
								placeholder={volunteerForm.value_json.pronounsPlaceholder || 'he/him, she/her, they/them, etc.'}
								className="w-full p-2 rounded text-black"
								value={pronouns}
								onChange={(e) => setPronouns(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.phoneLabel || 'Phone Number'}</label>
							<input
								type="text"
								name="phone"
								placeholder={volunteerForm.value_json.phonePlaceholder || 'xxx-xxx-xxxx'}
								className="w-full p-2 rounded text-black"
								value={phoneNumber}
								onChange={handlePhoneChange}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.signalLabel || 'Signal handle (if applicable)'}
							</label>
							<input
								type="text"
								name="signal"
								className="w-full p-2 rounded text-black"
								value={signalHandle}
								onChange={(e) => setSignalHandle(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.socialMediaHandlesLabel || 'Social media handles'}</label>
							<input
								type="text"
								name="social_handles"
								className="w-full p-2 rounded text-black"
								value={socialHandles}
								onChange={(e) => setSocialHandles(e.target.value)}
							/>
						</div>

						{/* Languages (checkbox group) */}
						<div className="mb-4" onChange={handleLanguagesChange}>
							<label className="block mb-2">{volunteerForm.value_json.languageLabel || 'Language(s)'}<span className="text-red">*</span></label>
							<div className="flex flex-wrap gap-4">
								<label><input type="checkbox" name="language" value="English" className="mr-2" />English</label>
								<label><input type="checkbox" name="language" value="Spanish" className="mr-2" />Spanish</label>
								<label><input type="checkbox" name="language" value="French" className="mr-2" />French</label>
								<label><input type="checkbox" name="language" value="Other" className="mr-2" />Other</label>
							</div>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.bioLabel || 'Tell us a little about yourself'}<span className="text-red">*</span></label>
							<textarea
								name="bio"
								className="w-full p-2 rounded text-black"
								rows={4}
								value={bio}
								required
								onChange={(e) => setBio(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.referrerLabel || 'How did you learn about Indiana AID?'}</label>
							<input
								type="text"
								name="referrer"
								className="w-full p-2 rounded text-black"
								value={referrer}
								onChange={(e) => setReferrer(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.immigrationHistoryLabel || 'Have you ever worked or interned for a federal agency...?'}<span className="text-red">*</span></label>
							<div className="flex gap-6">
								<label><input type="radio" name="immigration_history" value="yes" checked={immigrationHistory === 'yes'} onChange={(e) => setImmigrationHistory(e.target.value)} className="mr-2" />Yes</label>
								<label><input type="radio" name="immigration_history" value="no" checked={immigrationHistory === 'no'} onChange={(e) => setImmigrationHistory(e.target.value)} className="mr-2" />No</label>
							</div>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.relevantSkillsLabel || 'Relevant experience/skills'}<span className="text-red">*</span></label>
							<textarea
								name="relevant_skills"
								className="w-full p-2 rounded text-black"
								rows={4}
								value={relevantSkills}
								onChange={(e) => setRelevantSkills(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.currentlyWorkingLabel || 'Are you currently working with any groups?'}<span className="text-red">*</span></label>
							<div className="flex gap-6">
								<label><input type="radio" name="currently_working" value="yes" checked={currentlyWorking === 'yes'} onChange={(e) => setCurrentlyWorking(e.target.value)} className="mr-2" />Yes</label>
								<label><input type="radio" name="currently_working" value="no" checked={currentlyWorking === 'no'} onChange={(e) => setCurrentlyWorking(e.target.value)} className="mr-2" />No</label>
							</div>
						</div>

						{currentlyWorking === 'yes' && (
							<div className="mb-4">
								<label className="block mb-1">{volunteerForm.value_json.currenlyWorkingExplanationLabel || 'If so, which ones?'}</label>
								<input
									type="text"
									name="currently_working_explanation"
									className="w-full p-2 rounded text-black"
									value={currentlyWorkingExplanation}
									onChange={(e) => setCurrentlyWorkingExplanation(e.target.value)}
								/>
							</div>
						)}

						<div className="mb-4">
							<label className="block mb-1">{volunteerForm.value_json.skillsLabel || 'Other skills/talents to highlight'}</label>
							<textarea
								name="other_skills"
								className="w-full p-2 rounded text-black"
								rows={3}
								value={otherSkills}
								onChange={(e) => setOtherSkills(e.target.value)}
							/>
						</div>

						{/* Areas of Interest (checkbox group) */}
						<div className="mb-4" onChange={handleInterestsChange}>
							<label className="block mb-2">{volunteerForm.value_json.areasOfInterestLabel || 'Volunteer areas that interest you'}<span className="text-red">*</span></label>
							<div className="flex flex-col gap-2">
								{AREAS_OF_INTEREST.map((area, index) => (
									<label key={index} className="block">
										<input type="checkbox" name="interest" value={area} className="mr-2" />
										{area}
									</label>
								))}
							</div>
						</div>

						<div className="mb-6">
							<label className="block mb-1">{volunteerForm.value_json.referenceLabel || 'Reference'}<span className="text-red">*</span></label>
							<textarea
								name="reference"
								className="w-full p-2 rounded text-black"
								rows={3}
								value={reference}
								onChange={(e) => setReference(e.target.value)}
								placeholder="Name and contact info for a reference"
							/>
						</div>

						<button
							type="submit"
							className={`font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ${isFormValid ? 'bg-yellow text-black hover:bg-yellow-dark' : 'bg-gray-300 text-gray-700'}`}
							disabled={isSubmitting || !isFormValid}>
							{formSubmitButtonText.value}
						</button>
					</form>
				</>
			)}
		</div>
	);
}
