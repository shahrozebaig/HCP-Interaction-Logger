// src/redux/interactionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    form: {
        id: null,
        hcpId: "",
        hcpName: "",
        interactionType: "Meeting",
        date: "",
        time: "",
        attendees: "",
        topics: [],
        materialsShared: [],
        samplesDistributed: [],
        sentiment: null,    // "positive"|"neutral"|"negative"|null
        followups: [],
        summary: ""
    },
    saved: false
};

const interactionSlice = createSlice({
    name: "interaction",
    initialState,
    reducers: {
        setFormFields(state, action) {
            const fields = action.payload || {};
            // Merge arrays carefully if provided as strings
            const normalized = { ...fields };
            if (normalized.topics && typeof normalized.topics === "string") {
                normalized.topics = normalized.topics.split(",").map(s => s.trim()).filter(Boolean);
            }
            if (normalized.followups && typeof normalized.followups === "string") {
                normalized.followups = normalized.followups.split(",").map(s => s.trim()).filter(Boolean);
            }
            if (normalized.materialsShared && typeof normalized.materialsShared === "string") {
                normalized.materialsShared = normalized.materialsShared.split(",").map(s => s.trim()).filter(Boolean);
            }
            if (normalized.samplesDistributed && typeof normalized.samplesDistributed === "string") {
                normalized.samplesDistributed = normalized.samplesDistributed.split(",").map(s => s.trim()).filter(Boolean);
            }
            state.form = { ...state.form, ...normalized };
            // if an id present consider saved
            if (normalized.id || normalized._id) {
                state.saved = true;
                state.form.id = normalized.id || normalized._id;
            } else {
                // if form changed manually mark not saved
                state.saved = false;
            }
        },
        setSavedRecord(state, action) {
            const rec = action.payload || {};
            // Accept record structure returned by backend: maybe `id` or `_id`
            const id = rec.id || rec._id || (rec.record && (rec.record.id || rec.record._id));
            const fields = rec.fields || rec.record || rec;
            state.form = { ...state.form, ...fields };
            if (id) state.form.id = id;
            state.saved = true;
        },
        resetForm(state) {
            state.form = { ...initialState.form };
            state.saved = false;
        }
    }
});

export const { setFormFields, setSavedRecord, resetForm } = interactionSlice.actions;
export default interactionSlice.reducer;
