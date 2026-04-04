import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import CEO from "./components/CEO";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Registration from "./components/Registration";
import DynamicSections from "./components/DynamicSections";

import { api } from "./api";

import "./App.css";

function HomePage({ content }) {
  return (
    <>
      <Navbar content={content} />
      <Hero data={content?.hero} />
      <About data={content?.about} />
      <Services data={content?.services} />
      <DynamicSections data={content?.dynamicSections} />

      <CEO data={content?.team} />

      <Contact data={content?.contact} />
      <Footer data={content?.footer} services={content?.services} />
    </>
  );
}

export default function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getContent()
      .then((res) => {
        // res = { ok, data }
        setContent(res?.data || null);
      })
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="appRoot">
      <Routes>
        <Route path="/" element={<HomePage content={loading ? null : content} />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}
