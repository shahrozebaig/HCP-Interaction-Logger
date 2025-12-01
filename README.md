# 🧠 AI-First HCP Interaction Logging System

An intelligent CRM module designed to help Medical Representatives (MRs) record and manage interactions with Healthcare Professionals (HCPs) efficiently using AI-powered automation.

---

## 📖 Introduction

Traditional CRM systems require users to manually fill repetitive multi-field forms. This project eliminates that friction through an **AI-powered workflow**. Users simply write or speak a natural-language summary, and AI automatically extracts key information such as HCP name, date, topics discussed, sentiment, materials shared, samples distributed, outcomes, and follow-up actions.

The system supports voice notes, allowing users to upload audio files which are then transcribed and analyzed using AI. This demonstrates how AI can serve as a real-time assistant inside enterprise software, making data entry faster, more accurate, and highly user-friendly.

---

##**LOOM VIDEO**

https://www.loom.com/share/13d19fd0b0a749fd97bdff9bad14449e

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
Correct entries with natural language:
```
"Update the sentiment to negative and change the name to Dr. Ravi."
```
Only specified fields are updated automatically.

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

### 🗂️ Database-Backed Storage
- All interactions stored in MongoDB Atlas
- Enable future retrieval, analytics, and reports

### 💬 Interactive Chat UI
- Real-time chat interface
- AI responses with typing animations
- Voice processing indicators
- Success/error messages

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

## 🎯 Purpose & Use Cases

This system demonstrates how **AI-driven workflows** can automate CRM processes in the healthcare domain. By combining structured LLM tools with an interactive UI, it showcases:

- 🏥 **Medical Representatives** - Faster interaction logging in the field
- 👥 **Field Teams** - Reduced manual data entry burden
- 📊 **Organizations** - Accurate, consistent data collection
- 🔍 **Analytics** - Better insights from structured interaction data

---

## 💡 How It Works

1. 👤 **User Input** - MR types or speaks interaction summary
2. 🤖 **AI Processing** - LangGraph extracts structured data
3. ✏️ **Auto-Fill** - Form fields populate automatically
4. 💬 **Chat Interface** - AI assistant guides the process
5. 💾 **Storage** - Interaction saved to MongoDB
6. 📊 **Dashboard** - View all interactions & analytics

---
