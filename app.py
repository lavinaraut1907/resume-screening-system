from flask import Flask, request, jsonify
import os
import pdfplumber
from docx import Document

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def extract_text(file_path):
    text = ""

    if file_path.lower().endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

    elif file_path.lower().endswith(".docx"):
        doc = Document(file_path)
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"

    return text


def extract_resume_info(text):
    skills_list = [
        "python",
        "java",
        "c",
        "c++",
        "javascript",
        "html",
        "css",
        "sql",
        "react",
        "flask",
        "machine learning",
        "data structures"
    ]

    text_lower = text.lower()

    skills = []

    for skill in skills_list:
        if skill in text_lower:
            skills.append(skill)

    return skills


@app.route("/screen", methods=["POST"])
def screen_resume():

    if "resume" not in request.files:
        return jsonify({"error": "Resume not uploaded"}), 400

    resume = request.files["resume"]
    job_description = request.form.get("job_description", "")

    if resume.filename == "":
        return jsonify({"error": "Please select a resume"}), 400

    file_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        resume.filename
    )

    resume.save(file_path)

    # Read resume
    resume_text = extract_text(file_path)

    # Extract skills automatically
    resume_skills = extract_resume_info(resume_text)

    # Compare with Job Description
    jd_lower = job_description.lower()

    matched_skills = []

    for skill in resume_skills:
        if skill in jd_lower:
            matched_skills.append(skill)

    # Calculate score
    required_skills = []

    for skill in resume_skills:
        if skill in jd_lower:
            required_skills.append(skill)

    if len(resume_skills) > 0:
        score = round(
            len(matched_skills) / len(resume_skills) * 100
        )
    else:
        score = 0

    return jsonify({
        "skills": resume_skills,
        "matched_skills": matched_skills,
        "score": score
    })


if __name__ == "__main__":
    app.run(debug=True)