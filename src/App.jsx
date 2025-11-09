import React, { useRef, useState } from "react";

export default function App() {
  const [personal, setPersonal] = useState({
    name: "",
    headline: "",
    dob: "",
    pob: "",
    email: "",
    phone: "",
    address: "",
  });
  const [experiences, setExperiences] = useState([
    { id: 1, title: "", company: "", start: "", end: "", bullets: [] },
  ]);
  const [education, setEducation] = useState([
    { id: 1, degree: "", school: "", start: "", end: "", details: "" },
  ]);
  const [skills, setSkills] = useState([""]);
  const [template, setTemplate] = useState("modern");
  const previewRef = useRef();

  function aiSentence(topic, n = 1) {
    const verbs = ["designed","implemented","led","optimized","developed"];
    const objects = ["systems","features","tools","pipelines","projects"];
    const impacts = ["reducing latency","increasing conversion","boosting performance"];
    const out = [];
    for (let i = 0; i < n; i++) {
      const v = verbs[(i + topic.length) % verbs.length];
      const o = objects[(i * 2 + topic.length) % objects.length];
      const im = impacts[(i * 3 + topic.length) % impacts.length];
      out.push(`${v} ${o} ${im}.`);
    }
    return out.join(" ");
  }

  function generateAutoFill() {
    setPersonal((p) => ({
      ...p,
      headline: p.headline || "Professional with proven experience",
      name: p.name || "Nama Lengkap Anda",
      email: p.email || "nama@domain.com",
    }));
    setExperiences((exs) =>
      exs.map((ex, idx) => ({
        ...ex,
        title: ex.title || (idx === 0 ? "Senior Engineer" : "Engineer"),
        company: ex.company || "Perusahaan Contoh",
        bullets: ex.bullets.length ? ex.bullets : [aiSentence("project", 2)],
      }))
    );
  }
return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Data Diri</h2>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Nama"
            value={personal.name} onChange={(e)=>setPersonal({...personal, name:e.target.value})}/>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Posisi / Headline"
            value={personal.headline} onChange={(e)=>setPersonal({...personal, headline:e.target.value})}/>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Email"
            value={personal.email} onChange={(e)=>setPersonal({...personal, email:e.target.value})}/>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Telepon"
            value={personal.phone} onChange={(e)=>setPersonal({...personal, phone:e.target.value})}/>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Alamat"
            value={personal.address} onChange={(e)=>setPersonal({...personal, address:e.target.value})}/>
          <button className="w-full py-2 bg-green-600 text-white rounded mt-2"
            onClick={generateAutoFill}>Generate Otomatis</button>
        </div>
<div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div ref={previewRef}>
            <h1 className="text-2xl font-bold">{personal.name || "Nama Lengkap"}</h1>
            <p className="text-gray-600">{personal.headline || "Posisi / headline profesional"}</p>
            <div className="mt-2 text-sm text-gray-800">
              <p>{personal.email}</p>
              <p>{personal.phone}</p>
              <p>{personal.address}</p>
            </div>
            <h3 className="font-semibold mt-4">Experience</h3>
            {experiences.map((ex) => (
              <div key={ex.id} className="mt-2">
                <p className="font-medium">{ex.title} — {ex.company}</p>
                <ul className="list-disc ml-5 text-sm">
                  {ex.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
