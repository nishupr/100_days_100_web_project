document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = document.getElementById("themeSwitcher");
    const resumeForm = document.getElementById("resumeForm");
    const resumePreview = document.getElementById("resumePreview");
    const previewBtn = document.getElementById("previewBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const atsScore = document.getElementById("atsScore");
const atsStrengths = document.getElementById("atsStrengths");
const atsSuggestions = document.getElementById("atsSuggestions");

    // Toggle theme
    themeSwitcher.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeSwitcher.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    // Update live preview
    const updatePreview = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const education = document.getElementById("education").value;
        const summary = document.getElementById("summary").value;
        const projects = document.getElementById("projects").value;
        const skills = document.getElementById("skills").value;
        const experience = document.getElementById("experience").value;

        resumePreview.innerHTML = `
            <h3>${name || "Your Name"}</h3>
            <p><strong>Email:</strong> ${email || "your.email@example.com"}</p>
            <p><strong>Phone:</strong> ${phone || "123-456-7890"}</p>
            <h4>Education</h4>
            <p>${education || "State your educational details."}</p>
            <h4>Summary</h4>
            <p>${summary || "Write a brief summary about yourself."}</p>
            <h4>Projects</h4>
            <p>${projects || "write about projects developed by you."}</p>
            <h4>Skills</h4>
            ${skills ? `<ul>${skills.split(",").map(skill => `<li>${skill.trim()}</li>`).join("")}</ul>` : "<p>No Skills added.</p>"}
            <h4>Experience</h4>
            <p>${experience || "Add your work experience here."}</p>
            calculateATSScore();
        `;
    };
    const calculateATSScore = () => {
    let score = 0;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const education = document.getElementById("education").value.trim();
    const summary = document.getElementById("summary").value.trim();
    const projects = document.getElementById("projects").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const experience = document.getElementById("experience").value.trim();

    let strengths = [];
    let suggestions = [];

    if (name) score += 10;
    else suggestions.push("Add your full name");

    if (email.includes("@")) {
        score += 10;
        strengths.push("Professional email added");
    } else {
        suggestions.push("Add a valid email");
    }

    if (phone.length >= 10) {
        score += 10;
        strengths.push("Phone number looks complete");
    } else {
        suggestions.push("Add a proper phone number");
    }

    if (education.length > 10) {
        score += 10;
        strengths.push("Education section added");
    } else {
        suggestions.push("Improve education details");
    }

    if (summary.length > 40) {
        score += 15;
        strengths.push("Good professional summary");
    } else {
        suggestions.push("Write a stronger summary");
    }

    if (projects.length > 30) {
        score += 15;
        strengths.push("Projects section is informative");
    } else {
        suggestions.push("Add better project descriptions");
    }

    const skillCount = skills.split(",").filter(skill => skill.trim() !== "").length;

    if (skillCount >= 5) {
        score += 15;
        strengths.push("Strong skills section");
    } else {
        suggestions.push("Add more technical skills");
    }

    if (experience.length > 30) {
        score += 15;
        strengths.push("Experience section looks detailed");
    } else {
        suggestions.push("Add more experience details");
    }

    atsScore.textContent = `${score}/100`;

    atsStrengths.innerHTML = strengths.length
        ? strengths.map(item => `<li>${item}</li>`).join("")
        : "<li>No major strengths detected yet</li>";

    atsSuggestions.innerHTML = suggestions.length
        ? suggestions.map(item => `<li>${item}</li>`).join("")
        : "<li>Your resume looks ATS friendly</li>";
};

    previewBtn.addEventListener("click", updatePreview);

    // Download resume as PDF
    downloadBtn.addEventListener("click", () => {
        const element = document.createElement("a");
        const content = resumePreview.innerHTML;
        const blob = new Blob([content], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        element.href = url;
        element.download = "resume.html";
        element.click();
        URL.revokeObjectURL(url);
        calculateATSScore();
    });
});