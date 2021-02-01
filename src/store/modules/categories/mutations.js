export default {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },

  STORE_CATEGORY (state, category) {
    state.categories.data.push(category)
  },

  UPDATE_CATEGORY (state, category) {
    for (var i = 0; i <= state.categories.data.length; i++) {
      if (state.categories.data[i].id === category.id) {
        state.categories.data[i] = category
        break
      }
    }
  },

  DELETE_CATEGORY (state, category) {
    for (var i = 0; i <= state.categories.data.length; i++) {
      if (state.categories.data[i].id === category.id) {
        state.categories.data.splice(i, 1)
        break
      }
    }
  },
}
