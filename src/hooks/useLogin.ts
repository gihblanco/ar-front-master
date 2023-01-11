import { getUserByID, login } from '../api';

type loginTypes = {
  email: string,
  senha: string
}

export async function useLogin(data: loginTypes) {
  return await login(data).then(async response  => {
    const user = await getUserByID({ id: response.data.id, token: response.data.token }).then(user => {
      return user;
    })
    return { isLoading: response.isLoading, IsAuthenticated: response.IsAuthenticated, data: response.data, user: user };
  })
}

