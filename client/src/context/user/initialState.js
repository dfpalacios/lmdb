const user = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : {};

const initialState = {
  id: user.id || null,
  name: user.name || null,
  token: user.token || null,
  refreshToken: user.refreshToken || null
}

export default initialState
