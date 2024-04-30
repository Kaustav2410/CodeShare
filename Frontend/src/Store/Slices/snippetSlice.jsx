import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
// Add the necessary async logic inside a thunk function to handle the API call and data fetching. Thunk functions allow you to write async logic in Redux actions
export const fetchSnippet = createAsyncThunk(
    '/',
    async (UniqueId) => { 
        try {
            const res = await fetch(`https://codeshare-7q0c.onrender.com/api/v1/${UniqueId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
            });
            const response = await res.json();
            // console.log(response);
            return response;
        } catch (error) {
            console.log("Error in fetching the data regarding the snippet", error);
            throw error;
        }
    }
);

export const addSnippet = createAsyncThunk('snippet/add',
    async (snippetData) => {
        try {
            const res = await fetch('https://codeshare-7q0c.onrender.com/api/v1/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(snippetData)
            }).then((res)=>res.json());
            return res;
        } catch (error) {
            console.error("Error in adding the snippet:", error);
            throw error;
        }
    }
)

export const updateSnippet = createAsyncThunk('snippet/update', async({ UniqueId, snippetData })=>{
    try{
        console.log(JSON.stringify(snippetData))
        await fetch(`https://codeshare-7q0c.onrender.com/api/v1/${UniqueId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(snippetData)
        })
    }
    catch (error) {
        console.error("Error in updating the snippet:", error);
        throw error;
    }
})

export const Snippet = createSlice({
    name: 'snippet',
    initialState: {
        loading:false,
        LangType:null,
        Code:null,
        theme:null,
        UniqueId:null,
        error:false
        
    },
    reducers:{
    },
    // A callback that receives a builder object to define case reducers via calls to builder.addCase(actionCreatorOrType, reducer)
    extraReducers: (builder) => {
        // Adds a case reducer to handle a single exact action type.
        // @remarks — All calls to builder.addCase must come before any calls to builder.addMatcher or builder.addDefaultCase.
        builder
            .addCase(fetchSnippet.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSnippet.fulfilled, (state, action) => {
                // console.log(action.payload.SuccessResponse.data.length)
                if(action.payload.SuccessResponse.data.length!=0){
                    const {LanguageType,Code,theme,UniqueId}=action.payload.SuccessResponse.data[0]
                state.loading=false;
                state.Code=Code
                state.LangType=LanguageType
                state.theme = theme
                state.UniqueId=UniqueId
                // console.log(LanguageType,Code,theme)
                }
                else{
                    state.loading=false;
                    state.Code=null
                    state.LangType=null
                    state.theme = null
                    state.UniqueId=null
                }
            })
            .addCase(fetchSnippet.rejected, (state) => {
                state.loading = false;
                state.error=true
            })
            .addCase(addSnippet.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSnippet.fulfilled, (state, action) => {
                // console.log(action.payload.SuccessResponse)
                if(action.payload.SuccessResponse!==undefined){
                    const {Code,LanguageType,theme,UniqueId}=action.payload.SuccessResponse.data
                    console.log(action.payload.SuccessResponse.data)
                    state.loading = false;
                    state.Code=Code
                    state.LangType=LanguageType
                    state.theme = theme
                    state.UniqueId=UniqueId
                    state.result = action.payload;
                }
                else {
                    alert("Error in adding Snippet")
                }
                // console.log(action.payload);
                // console.log(UniqueId,state.UniqueId);
            })
            .addCase(addSnippet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateSnippet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSnippet.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateSnippet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
// export const { setSortBy, setFilter,setStatus,setTerm,setPages,setLength,setCountries } = .actions;
export const snippetReducer = Snippet.reducer; // Export the reducer directly

export default fetchSnippet.reducer; // Default export of the async thunk