import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: null,
    sortPosts: null,
    numberOfRecords: 10,
    currentPage: 1,
    lastSliceElement: null,
    firstSliceElement: null,
    currentPageList: [],
    numberOfPages: 1,
    arrayLookup: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        initPosts: {
            reducer: (state, action) => {
                state.posts = action.payload.array;
                state.lauding = false;
                state.currentPage = Object.keys(action.payload.params).length ? action.payload.params.id : 1;
                state.lastSliceElement = state.currentPage * state.numberOfRecords;
                state.firstSliceElement = state.lastSliceElement - state.numberOfRecords;
                state.currentPageList = action.payload.array.slice(state.firstSliceElement, state.lastSliceElement);
                state.numberOfPages = action.payload.array.length / state.numberOfRecords;
            },
            prepare: (array, params) => {
                return {
                    payload: {
                        array: array,
                        params: params
                    }
                }
            }
        },
        pageSwitching: (state, action) => {
            state.currentPage = Object.keys(action.payload).length ? action.payload.id: 1;
            state.lastSliceElement = state.currentPage * state.numberOfRecords;
            state.firstSliceElement = state.lastSliceElement - state.numberOfRecords;
            if(state.sortPosts){
                state.currentPageList = state.sortPosts.slice(state.firstSliceElement, state.lastSliceElement);
            } else {
                state.currentPageList = state.posts.slice(state.firstSliceElement, state.lastSliceElement);
            }
        },
        search: (state, action) => {
            const onColumn = state.posts.filter((item) => {
                return  String(item.id).toLowerCase().indexOf(action.payload.toLowerCase()) > -1;
            })
            const onTwo = state.posts.filter((item) => {
                return item.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1;
            })
            const onThree = state.posts.filter((item) => {
                const removeTransfer = item.body.toLowerCase().split("\n").join(" ");
                return removeTransfer.indexOf(action.payload.toLowerCase()) > -1;
            })
            const elementsFromEachColumn = [...onColumn, ...onTwo, ...onThree];
            const sortedArray = removeDuplicates(elementsFromEachColumn).sort((a,b) => a.id - b.id);

            state.arrayLookup = Object.keys(action.payload).length === 0 ? null : sortedArray;
        },
        sortByTitle: (state, action) => {
            const originalArray = [...state.posts];
            if(action.payload === "id"){
                state.sortPosts = originalArray.sort((a, b) => a[action.payload] - b[action.payload]);
            } else {
                state.sortPosts = originalArray.sort((a, b) => a[action.payload].localeCompare(b[action.payload]));
            }
            state.lastSliceElement = state.currentPage * state.numberOfRecords;
            state.firstSliceElement = state.lastSliceElement - state.numberOfRecords;
            state.currentPageList = state.sortPosts.slice(state.firstSliceElement, state.lastSliceElement);
        },
        sortByBody: (state) => {

        }
    }
});

function removeDuplicates(arr) {

    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {

        if (duplicatesIndices.includes(index)) return;

        result.push(current);

        // Сравниваем каждый элемент в массиве после текущего
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);

            // Проверяем длину массивов
            if (currentKeys.length !== comparisonKeys.length) continue;

            // Проверяем значение ключей
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;

            // Проверяем индексы ключей
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);

        } // Конец цикла
    });
    return result;
}


const { reducer, actions } = postsSlice;

export default reducer;
export { actions };