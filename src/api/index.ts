import axios from 'axios';
import { toast } from 'react-toastify';


const local = false;
const API_BASE = local
  ? "http://localhost:8080"
  : "https://minhaaularemota.com.br";

const API = axios.create({
  baseURL: API_BASE,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' }
})
interface LoginProps {
  email: string;
  senha: string;
}

// Verifica se precisa refazer o login
API.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  toast.error(error.response.data.error)
  return Promise.reject(error.response.data.error);
})


export async function login(data: LoginProps) {
  return await API.post('/login', JSON.stringify(data)).then(response => {
    return response.data;
  }).then(response => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userID", response.id)
    localStorage.setItem("user", JSON.stringify({ Email: data.email, Senha: data.senha, UserID: response.id, UserLevel: response.nivel }));
    return { isLoading: false, IsAuthenticated: true, data: response }
  }).catch((err) => {
    return { isLoading: false, IsAuthenticated: false, data: err }
  })

}

export async function getUserByID({ id, token }: any) {
  return await API.get(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data.user;
    });
}

export async function getAllUser(token: any) {
  return await API.get(`/users`, { headers: { Authorization: `Bearer ${token}`}})
  .then((response) => {
    return response.data;
  })
}

export async function getAllClasses(token: any) {
  return await API.get(`/classes`, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    return response.data;
  })
}

export async function getAllCourses(token: any) {
  return await API.get(`/courses`, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    return response.data;
  })
}

export async function getAllLivesByClassID({token, id}: any) {
  return await API.get(`/class/${id}/lives`, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    return response.data;
  })
}

export async function postClass({ token, nome, inicio, fim, limite, course, provider, cfc_id }: any) {
  return await API.post(`/class`, { nome, inicio, fim, limite, course, provider, cfc_id }, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    toast.success('Success')
    return response.data;
  })
}

export async function updateUser({token,id, nome, email, senha, senha2, nivel, categoria, cnh, processo, uf, ativo}: any) {
  return await API.patch(`/user/${id}`, { nome, email, senha, senha2, nivel, categoria, cnh, processo, uf, ativo }, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    toast.success('Success')
  })
}

export async function updateMatricula({token,id, nome, senha, senha2, email, documento, turma_id, cidade}: any) {
  return await API.patch(`/user/${id}`, { nome, email, senha, senha2, documento, turma_id, cidade }, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    toast.success('Success')
  })
}

export async function getSubject(token: any) {
  return await API.get(`/subjects`, { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
    return response.data;
  })
}


export async function createUser(token: any, { nome, senha, senha2, email, nivel, uf, documento, detranCodigo, turma_id, processo }: any) {
  return await API.post(`/user`,{ nome, senha, senha2, email, nivel, uf, documento, detranCodigo, turma_id, processo }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
    toast.success('Success')
  })
}

export async function createMatricula(token: any, { nome, senha, senha2, email, documento, turma_id, uf,nivel }: any) {

  return await API.post(`/user`,{ nome, senha, senha2, email, documento, turma_id, uf, nivel }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
    toast.success('a');
  })
}

export async function postAula(token: any, turma: any, { nome, descricao, inicio, fim, disciplina_id }: any) {
  return await API.post(`/class/${turma}/lives`,{ lives: [{ nome, descricao, inicio, fim, disciplina_id }] }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
    toast.success('Success')
  })
}

export default API;