const todos = {
  state: [
    { id: Date.now(), content: '优化模板示例', done: false },
  ],

  reducers: {
    addSync (state, content) {
      state.push({ id: Date.now(), content, done: false })
      return state
    },
    delSync (state, id) {
      const index = state.filter(item => item.id === id)
      if (index !== -1) state.splice(index, 1)
      return state
    },
    doneSync (state, { id, checked }) {
      const index = state.findIndex(item => item.id === id)
      if (index !== -1) state[index].done = checked
      return state
    },
  },

  effects: {
    add (content) {
      setTimeout(() => {
        this.addSync(content)
      }, 300)
    },
    del (id) {
      setTimeout(() => {
        this.delSync(id)
      }, 300)
    },
    done (payload) {
      setTimeout(() => {
        this.doneSync(payload)
      }, 300)
    },
  },
}

export default todos
