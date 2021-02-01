export default {
  SET_SUBCATEGORIES (state, subcategories) {
    state.subcategories = subcategories
  },

  STORE_SUBCATEGORY (state, subcategory) {
    state.subcategories.data.push(subcategory)
  },

  UPDATE_SUBCATEGORY (state, subcategory) {
    for (var i = 0; i <= state.subcategories.data.length; i++) {
      if (state.subcategories.data[i].id === subcategory.id) {
        state.subcategories.data[i] = subcategory
        break
      }
    }
  },

  DELETE_SUBCATEGORY (state, subcategory) {
    for (var i = 0; i <= state.subcategories.data.length; i++) {
      if (state.subcategories.data[i].id === subcategory.id) {
        state.subcategories.data.splice(i, 1)
        break
      }
    }
  },
}
