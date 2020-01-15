import UserData from "./users.json"

const users = UserData.users.map(({ id, real_name }) => ({
  id,
  name: real_name,
}))

export default users
