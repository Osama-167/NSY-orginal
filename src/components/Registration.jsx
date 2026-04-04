import React, { useState } from "react";
import { api } from "../api";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  university: "",
  faculty: "",
  levelOrYear: "",
  track: "",
  notes: "",
};

export default function Registration() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!form.fullName || !form.email || !form.phone) {
      setErr("Full Name, Email, Phone are required.");
      return;
    }

    try {
      setLoading(true);
      await api.createRegistration(form);
      setDone(true);
      setForm(initial);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", padding: 24, background: "#000", color: "#fff" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Training Registration</h1>
        <p style={{ opacity: 0.8 }}>
          Fill the form to register for training with Nano Satellite Yard.
        </p>

        {done ? (
          <div style={{ padding: 14, border: "1px solid #00cfff", borderRadius: 12, marginBottom: 14 }}>
            ✅ Submitted successfully. We will contact you soon.
          </div>
        ) : null}

        {err ? (
          <div style={{ padding: 14, border: "1px solid #ff3355", borderRadius: 12, marginBottom: 14 }}>
            ❌ {err}
          </div>
        ) : null}

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <input
            name="fullName"
            placeholder="Full Name *"
            value={form.fullName}
            onChange={onChange}
            style={inputStyle}
          />
          <input
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={onChange}
            style={inputStyle}
          />
          <input
            name="phone"
            placeholder="Phone *"
            value={form.phone}
            onChange={onChange}
            style={inputStyle}
          />
          <input
            name="university"
            placeholder="University"
            value={form.university}
            onChange={onChange}
            style={inputStyle}
          />
          <input
            name="faculty"
            placeholder="Faculty"
            value={form.faculty}
            onChange={onChange}
            style={inputStyle}
          />
          <input
            name="levelOrYear"
            placeholder="Level / Year"
            value={form.levelOrYear}
            onChange={onChange}
            style={inputStyle}
          />
          <input
            name="track"
            placeholder="Track (Web / Embedded / Mechanical ...)"
            value={form.track}
            onChange={onChange}
            style={inputStyle}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={onChange}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          <a href="/" style={{ color: "#00cfff", textDecoration: "none" }}>
            ← Back to Home
          </a>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  outline: "none",
};

const btnStyle = {
  padding: "12px 12px",
  borderRadius: 12,
  border: 0,
  background: "#00cfff",
  color: "#001018",
  fontWeight: 800,
  cursor: "pointer",
};
