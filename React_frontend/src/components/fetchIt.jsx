import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TravelPlanner() {
  // Form state
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [numDays, setNumDays] = useState(1);
  const [budget, setBudget] = useState("Low");
  const [numPeople, setNumPeople] = useState(1);
  const [travelGroup, setTravelGroup] = useState("Family");
  const [activities, setActivities] = useState([]);
  const [additionalComments, setAdditionalComments] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [travelResponse, setTravelResponse] = useState(null);
  const [error, setError] = useState("");

  const activityOptions = [
    "Beaches",
    "City Exploration",
    "Nightlife",
    "Food Tours",
    "Events",
  ];

  // Handle changes for multi-select
  const handleActivitiesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setActivities(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTravelResponse(null);

    // Build payload for travel recommendations.
    const queryData = {
      destination,
      travel_date: travelDate,
      num_days: numDays,
      budget,
      num_people: numPeople,
      travel_group: travelGroup,
      activities,
      additional_comments: additionalComments,
    };

    try {
      const response = await fetch("http://localhost:8000/search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryData),
      });

      if (!response.ok) {
        throw new Error(`Travel Recommendations Error: ${response.statusText}`);
      }
      const travelData = await response.json();
      setTravelResponse(travelData);
      console.log("Travel Data:", travelData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>RihlaAi: Your AI-Powered Passport to Arabia</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Travel Date:</label>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Number of Days:</label>
          <input
            type="number"
            min="1"
            value={numDays}
            onChange={(e) => setNumDays(parseInt(e.target.value))}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Budget:</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={styles.input}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Number of People:</label>
          <input
            type="number"
            min="1"
            value={numPeople}
            onChange={(e) => setNumPeople(parseInt(e.target.value))}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Travel Group:</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="Family"
                checked={travelGroup === "Family"}
                onChange={(e) => setTravelGroup(e.target.value)}
              />{" "}
              Family
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="Couple"
                checked={travelGroup === "Couple"}
                onChange={(e) => setTravelGroup(e.target.value)}
              />{" "}
              Couple
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="Friends"
                checked={travelGroup === "Friends"}
                onChange={(e) => setTravelGroup(e.target.value)}
              />{" "}
              Friends
            </label>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Interested Activities:</label>
          <select
            multiple
            value={activities}
            onChange={handleActivitiesChange}
            style={styles.input}
          >
            {activityOptions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Additional Comments:</label>
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            style={{ ...styles.input, height: "80px" }}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p style={styles.error}>Error: {error}</p>}
      {travelResponse && (
        <div style={styles.result}>
          <h2>Itinerary:</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {travelResponse.rendered_output || "No itinerary returned."}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "1rem",
  },
  result: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f7f7f7",
    borderRadius: "4px",
  },
};

