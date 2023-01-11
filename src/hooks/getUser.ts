import { getUserByID } from "../api";

export async function getUser(id: any, token: any) {
  const user = await getUserByID({ id: id, token: token }).then(user => {
    return user;
  })

  return { user: user }
}