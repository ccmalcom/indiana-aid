'use client';

export default function Contact() {


    
    const sendEmail = async (e) => {
        e.preventDefault();

    const formData ={
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    }
    const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    
    const result = await res.json();
    
    if (result.success) {
        alert('Message sent successfully!');
        e.target.reset();
    } else {
        alert('Oops! Failed to send message.');
    }
    }

    return (
        <div className="viewport">
            <div className="contact-form flex flex-col items-center justify-center bg-blue text-white p-4 w-[66%] m-auto mt-4 rounded-lg shadow-lg min-h-[50vh]" >
                <div className="form-header flex flex-col items-center justify-center mb-4">
                    <h1 className='text-2xl'>Contact Us</h1>
                    <p>Have a question? Want to get involved? Send us a message!</p>
                </div>
                <form onSubmit={sendEmail}>
                    <div className="form-group flex w-full gap-4 mb-4">
                        <div className="flex flex-col flex-1">
                            <label htmlFor='name' className="mb-2 font-semibold">Name:</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                required 
                                className="rounded-lg p-2 border-2 border-gray-300 text-black"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="email" className="mb-2 font-semibold">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required 
                                className="rounded-lg p-2 border-2 border-gray-300 text-black"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div className="form-group flex flex-col w-full mb-4">
                        <label htmlFor="message" className="mb-2 font-semibold">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            className="rounded-lg p-2 border-2 border-gray-300 text-black"
                            rows="6"
                            placeholder="Your message here..."
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}