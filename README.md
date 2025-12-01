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

graph TD
    subgraph User["👤 Medical Representative"]
        A["Type/Speak Summary<br/>or Upload Voice"]
    end
    
    subgraph Frontend["🖥️ Frontend - React"]
        B["Chat Interface<br/>& Interaction Form"]
        C["Voice Upload<br/>Component"]
        D["Redux State<br/>Management"]
    end
    
    subgraph Communication["🔌 API Communication"]
        E["HTTP/REST<br/>Requests"]
    end
    
    subgraph Backend["⚡ Backend - FastAPI"]
        F["Main App<br/>Entry Point"]
        G["Agent API<br/>Endpoint"]
    end
    
    subgraph VoiceProcessing["🎙️ Voice Processing"]
        H["Voice Upload<br/>Handler"]
        I["Audio Transcription<br/>Service"]
    end
    
    subgraph AITools["🤖 LangGraph AI Tools"]
        J["Log Interaction<br/>Tool"]
        K["Edit Interaction<br/>Tool"]
        L["Summarize Voice<br/>Tool"]
        M["Suggest Follow-Ups<br/>Tool"]
        N["Extract HCP Details<br/>Tool"]
    end
    
    subgraph LLM["🧠 Groq LLaMA-3.1"]
        O["AI Model<br/>Processing"]
    end
    
    subgraph DataExtraction["📊 Data Extraction"]
        P["Parse HCP Name<br/>Date & Time"]
        Q["Sentiment Analysis<br/>Topics & Materials"]
        R["Generate Summary<br/>& Follow-Ups"]
    end
    
    subgraph Database["💾 MongoDB Atlas"]
        S["Store Interactions<br/>HCP Records"]
    end
    
    subgraph Dashboard["📋 Dashboard & Reports"]
        T["View All<br/>Interactions"]
        U["Analytics<br/>& Reports"]
    end
    
    A -->|Text or Voice| B
    A -->|Audio File| C
    B -->|Send Summary| E
    C -->|Upload Voice| H
    E -->|Route| F
    F -->|Process| G
    H -->|Transcribe| I
    I -->|Send Text| G
    G -->|Dispatch to Tools| J
    G -->|Dispatch to Tools| K
    G -->|Dispatch to Tools| L
    G -->|Dispatch to Tools| M
    G -->|Dispatch to Tools| N
    J -->|Send to AI| O
    K -->|Send to AI| O
    L -->|Send to AI| O
    M -->|Send to AI| O
    N -->|Send to AI| O
    O -->|Extract Data| P
    O -->|Extract Data| Q
    O -->|Extract Data| R
    P -->|Save| S
    Q -->|Save| S
    R -->|Save| S
    S -->|Retrieve| T
    S -->|Generate| U
    T -->|Display| B
    U -->|Display| D
    D -->|Show to User| A
    
    style User fill:#E3F2FD
    style Frontend fill:#F3E5F5
    style Communication fill:#FCE4EC
    style Backend fill:#E8F5E9
    style VoiceProcessing fill:#FFF3E0
    style AITools fill:#E0F2F1
    style LLM fill:#C8E6C9
    style DataExtraction fill:#ECE7F7
    style Database fill:#BBE0F1
    style Dashboard fill:#FFF8E1

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
