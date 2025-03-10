

export default function Contact() {
    return (
        <div>
            <h1>Contact Us</h1>
            <p>Have a question? Want to get involved? Send us a message!</p>
            <form>
                <label>Name:</label>
                <input type="text" id="name" name="name" required></input>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required></input>
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}