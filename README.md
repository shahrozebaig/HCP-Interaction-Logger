# 🧠 AI-First HCP Interaction Logging System

An intelligent CRM module designed to help Medical Representatives (MRs) record and manage interactions with Healthcare Professionals (HCPs) efficiently using AI-powered automation.

---

## 📖 Introduction

The AI-First HCP Interaction Logging System is an intelligent CRM solution built to help Medical Representatives efficiently record their interactions with Healthcare Professionals. Instead of manually filling long and repetitive forms, users simply type or speak a natural-language summary, and the AI automatically extracts all essential details—such as the HCP name, date, topics discussed, sentiment, materials shared, samples distributed, outcomes, and follow-up actions—and populates the form instantly. The system also supports voice note uploads, enabling audio transcripts to be processed and converted into structured interaction data. By transforming free text or speech into structured CRM entries, the platform reduces manual effort, increases accuracy, and delivers a faster, more user-friendly workflow through real-time AI assistance.

---

##**LOOM VIDEO**

https://www.loom.com/share/13d19fd0b0a749fd97bdff9bad14449e

**MP4 Video**

[screen-capture.webm](https://github.com/user-attachments/assets/26b9955e-c0d5-464b-9fcd-09977110b630)

---
## 🚀 Key Features

### 🤖 AI-Powered Interaction Logging
Write a natural summary:
```
"Met Dr. Sharma today to discuss the new oncology trial. Shared brochures and samples. Sentiment was positive."
```

AI automatically extracts:
- 👤 HCP Name
- 📅 Date & Time
- 🔗 Interaction Type
- 😊 Sentiment
- 📝 Topics & Attendees
- 📦 Materials & Samples
- 📄 Summary
- ✅ Follow-Up Actions

### ✏️ AI Edit Tool
- Correct entries with natural language:
- Only specified fields are updated automatically.

### 🎙️ Voice Note Summarization
- Upload MP3/WAV audio files
- AI transcribes automatically
- Extracts structured interaction details
- Auto-fills form fields

### 📋 Multiple LangGraph Tools
At least five intelligent AI tools:
- 🔐 Log Interaction
- ✏️ Edit Interaction
- 🎙️ Summarize Voice Note
- 💡 Suggest Follow-Ups
- 👤 Extract HCP Details

---

## 🏗️ System Architecture

<img width="1545" height="1437" alt="Screenshot 2025-12-02 005641" src="https://github.com/user-attachments/assets/76cc8107-fa02-468b-8a8d-387449704682" />

---

## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ React (Create React App + JavaScript)
- 🎨 Redux Toolkit
- 🌈 TailwindCSS
- ✨ Custom animations & UI components

### 🧪 Backend
- ⚡ FastAPI
- 🤖 LangGraph
- 🧠 Groq LLaMA-3.1 Model
- 🗄️ MongoDB Atlas
- 🐍 Python 3+

---

## 💡 How It Works

1. 👤 **User Input** - MR types or speaks interaction summary
2. 🤖 **AI Processing** - LangGraph extracts structured data
3. ✏️ **Auto-Fill** - Form fields populate automatically
4. 💬 **Chat Interface** - AI assistant guides the process
5. 💾 **Storage** - Interaction saved to MongoDB
6. 📊 **Dashboard** - View all interactions & analytics

---
