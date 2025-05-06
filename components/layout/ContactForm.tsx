export default function ContactForm() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <form className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-primary">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Contact Us</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            id="name"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            id="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            id="message"
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-[hsl(217,91%,50%)] transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
