import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
// Add the necessary async logic inside a thunk function to handle the API call and data fetching. Thunk functions allow you to write async logic in Redux actions
export const fetchSnippet = createAsyncThunk(
    '/',
    async (UniqueId) => {
        const url = `http://localhost:4000/api/v1/${UniqueId}`; 
        try {
            const res = await fetch(url);
            const response = await res.json();
            // console.log(response);
            return response;
        } catch (error) {
            console.log("Error in fetching the data regarding the countries", error);
            throw error;
        }
    }
);

export const addSnippet = createAsyncThunk('snippet/add',
    async (snippetData) => {
        try {
            const res = await fetch('http://localhost:4000/api/v1/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(snippetData)
            });
            if (!res.ok) {
                throw new Error('Failed to add snippet');
            }
            const response = await res.json();
            return response;
        } catch (error) {
            console.error("Error in adding the snippet:", error);
            throw error;
        }
    }
)

export const updateSnippet = createAsyncThunk('snippet/update', async({ UniqueId, snippetData })=>{
    try{
        console.log(JSON.stringify(snippetData))
        const res = await fetch(`http://localhost:4000/api/v1/${UniqueId}`,{
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
                const {LanguageType,Code,theme,UniqueId}=action.payload.SuccessResponse.data[0]
                state.loading=false;
                state.Code=Code
                state.LangType=LanguageType
                state.theme = theme
                state.UniqueId=UniqueId
                // console.log(action.payload.SuccessResponse.data[0].LanguageType)
                // console.log(LanguageType,Code,theme)
            })
            .addCase(fetchSnippet.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addSnippet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSnippet.fulfilled, (state, action) => {
                const {Code,LanguageType,theme,UniqueId}=action.payload.SuccessResponse.data
                console.log(action.payload.SuccessResponse.data)
                state.loading = false;
                state.Code=Code
                state.LangType=LanguageType
                state.theme = theme
                state.UniqueId=UniqueId
                state.result = action.payload;
                console.log(UniqueId,state.UniqueId);
            })
            .addCase(addSnippet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
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