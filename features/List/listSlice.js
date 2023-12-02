import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group: [],
    final: "",
    count: [],
    added: false,
}

const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        addGroup: (state, action) => {
            const groupname = Object.keys(action.payload)[0];
            let hasObjectWithTitle = state.count.some(obj => obj.title === groupname);
            // console.log(action.payload);
            if (!hasObjectWithTitle) {
                state.group.push(action.payload)
                state.added = false;
            } else {
                state.added = true;
            }
        },
        removeGroup: (state, action) => {
            state.group.splice(action.payload, 1)
            state.count.splice(action.payload, 1)
        },
        tofinal: (state, action) => {
            state.final = action.payload
        },
        addtask: (state, action) => {
            const { index, title, value } = action.payload
            state.group[index][title].push({ ["task"]: value, check: "no completed" });
        },
        removetask: (state, action) => {
            const { indexone, title, indextwo } = action.payload
            state.group[indexone][title][indextwo].check = "no completed";
            state.group[indexone][title].splice(indextwo, 1)

        },
        switchcheck: (state, action) => {
            const { indexone, indextwo, title } = action.payload;
            state.group[indexone][title][indextwo].check = state.group[indexone][title][indextwo].check === "no completed" ? "completed" : "no completed";
        },
        countCompleted: (state, action) => {
            const { indexone, title } = action.payload;
            let count = 0;
            let number = 0;
            state.group[indexone][title].forEach((el) => {
                number++;
                if (el.check === "completed") {
                    count = count + 1;
                }
            })
            const hasObjectWithTitle = state.count.some(obj => obj.title === title);
            if (hasObjectWithTitle) {
                const foundObject = state.count.find(obj => obj.title === title);
                foundObject.completed = count;
                foundObject.number = number;
            } else {
                state.count.push({ title: action.payload, completed: 0, number: 0 })
            }
        },
        addGroupForTheFirstTime: (state, action) => {
            const hasObjectWithTitle = state.count.some(obj => obj.title === action.payload);
            if (hasObjectWithTitle === false) {
                state.count.push({ title: action.payload, completed: 0, number: 0 });
            }
        },
        switchgroup: (state) => {
            state.added = !(state.added)
        }
    }
})
export default listSlice.reducer;
export const { addGroup, tofinal, addtask, switchcheck, removeGroup, removetask, countCompleted, addGroupForTheFirstTime,switchgroup } = listSlice.actions