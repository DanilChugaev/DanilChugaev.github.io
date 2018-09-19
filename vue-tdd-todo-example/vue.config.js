module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-tdd-todo-example/'
    : '/',
  lintOnSave: process.env.NODE_ENV !== 'production'
}
