
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/feedback", formData);

      setMessage("Survey submitted successfully!");
      setMessageType("success");

      setFormData({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });
    } catch (error) {
      setMessage(
        "Unable to submit the survey. Please check the backend connection."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="survey-app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-box">S</span>
            <span>Online Survey Application</span>
          </div>

          <span className="header-label">STUDENT FEEDBACK</span>
        </div>
      </header>

      <main className="main-container">
        <div className="intro">
          <p className="subtitle">YOUR OPINION MATTERS</p>
          <h1>Student Survey Form</h1>
          <p className="intro-text">
            Please complete the following form to share your feedback
            about the academic session.
          </p>
        </div>

        <section className="survey-card">
          <div className="survey-heading">
            <h2>Survey Details</h2>
            <p>
              Enter your details and answer all required questions.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-body">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="q1">
                    Name <span>*</span>
                  </label>
                  <input
                    id="q1"
                    name="q1"
                    value={formData.q1}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="q2">
                    Department <span>*</span>
                  </label>
                  <input
                    id="q2"
                    name="q2"
                    value={formData.q2}
                    onChange={handleChange}
                    placeholder="Enter your department"
                    required
                  />
                </div>

                <div className="form-group full">
                  <label htmlFor="q3">
                    Session Title <span>*</span>
                  </label>
                  <input
                    id="q3"
                    name="q3"
                    value={formData.q3}
                    onChange={handleChange}
                    placeholder="Enter the session title"
                    required
                  />
                </div>

                <div className="form-group full">
                  <label htmlFor="q4">
                    Feedback <span>*</span>
                  </label>
                  <textarea
                    id="q4"
                    name="q4"
                    value={formData.q4}
                    onChange={handleChange}
                    placeholder="Write your feedback here..."
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group full">
                  <label htmlFor="q5">Suggestions</label>
                  <textarea
                    id="q5"
                    name="q5"
                    value={formData.q5}
                    onChange={handleChange}
                    placeholder="Share your suggestions for improvement..."
                    rows="2"
                  />
                </div>
              </div>

              {message && (
                <div className={`message ${messageType}`} role="status">
                  {message}
                </div>
              )}

              <div className="form-actions">
                <span className="required-note">
                  <span>*</span> Required fields
                </span>

                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Survey"}
                </button>
              </div>
            </div>
          </form>
        </section>

        <footer className="footer">
          Online Survey Application
        </footer>
      </main>
    </div>
  );
}

export default App;
