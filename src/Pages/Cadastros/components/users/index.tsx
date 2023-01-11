import Styled from './Index.module.css';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import {createUser, getAllUser, updateUser} from '../../../../api';
import Box from '@mui/material/Box';
import { MenuItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const columns: GridColDef[] = [
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 150,
    editable: false,
  },
  {
    field: 'documento',
    headerName: 'Documento',
    width: 150,
    editable: false,
  },
  {
    field: 'cadastro',
    headerName: 'Cadastro',
    width: 150,
    valueGetter: (params) =>
        `${params.row.cadastro.split("T")[0].slice(8, 11)}/${params.row.cadastro
          .split("T")[0]
          .slice(5, 7)}/${params.row.cadastro.split("T")[0].slice(0, 4)}`,
    editable: false,
  },
  {
    field: 'uf',
    headerName: 'UF',
    width: 30,
    editable: false,
  },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px'
};

const inputStyle = {
  marginTop: '5px',
  marginBottom: '10px',
}



export function Usuário() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPassword2, setUserPassword2] = useState('');
  const [userDETRAN, seUserDETRAN] = useState('');
  const [userState, setUserState] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [createUserName, setCreateUserName] = useState('');
  const [createUserEmail, setCreateUserEmail] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');
  const [createUserPassword2, setCreateUserPassword2] = useState('');
  const [createUserDETRAN, setCreateUserDETRAN] = useState('');
  const [createUserState, setCreateUserState] = useState('');
  const [createAccessLevel, setCreateAccessLevel] = useState('');
  const [createDocument, setCreateDocument] = useState('');

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setUserId(params.row.id)
    setUserName(params.row.nome);
    setUserEmail(params.row.email);
    setUserState(params.row.uf);
    setAccessLevel(params.row.nivel);
    seUserDETRAN(params.row.processo);
    handleOpenModal();
  };
  useEffect(() => {
    async function fetchUsers() {
      const raw = await getAllUser(localStorage.getItem('token'));
      setRows(raw.users);
    } 
    fetchUsers(); 
  }, [])

  function handleSubmit() {
    updateUser({
      token: localStorage.getItem('token'),
      id: userId,
      nome: userName,
      email: userEmail,
      senha: userPassword,
      senha2: userPassword2,
      nivel: accessLevel,
      categoria: '',
      cnh: '',
      processo: '',
      uf: userState,
      ativo: true
    })
  }

  function handleCreateUserSubmit() {
   createUser(localStorage.getItem('token'),{
      nome: createUserName,
      senha: createUserPassword,
      senha2: createUserPassword2,
      email: createUserEmail,
      nivel: parseInt(createAccessLevel),
      uf: createUserState,
      documento: createDocument,
      detranCodigo: createUserDETRAN,
      turma_id: 0,
      processo: 0
   });
  }
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleOpenCreateModal = () => setCreateModalOpen(true);
  return (
    <>
    <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '5px'}}>
              Editar Usuário
            </Typography>
            <TextField helperText="Digite o nome" label="Nome" variant="outlined" style={inputStyle} value={userName} onChange={(e) => setUserName(e.target.value)} />
            <TextField type="password" error={userPassword == userPassword2 ? false : true} helperText="Digite a nova senha" label="Senha" variant="outlined" style={inputStyle} value={userPassword} onChange={(e) => setUserPassword(e.target.value)}    />
            <TextField type="password" error={userPassword == userPassword2 ? false : true} helperText="Digite novamente a senha" label="Digite a senha novamente" variant="outlined" style={inputStyle} value={userPassword2} onChange={(e) => setUserPassword2(e.target.value)} />
            <TextField helperText="Escreva o email" label="E-mail" variant="outlined" style={inputStyle} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <TextField helperText="Escreva o codigo fornecido pelo DETRAN" label="Código DETRAN" variant="outlined" style={inputStyle} value={userDETRAN} onChange={(e) => seUserDETRAN(e.target.value)} />
            <TextField
              style={inputStyle}
              select
              label="Estado"
              defaultValue={userState}
              onChange={(e) => setUserState(e.target.value)}
              helperText="Selecione o seu ESTADO"
            >
              <MenuItem key="SC" value="SC">
                Santa Catarina
              </MenuItem>
              <MenuItem key="MG" value="MG">
                Minas Gerais
              </MenuItem>
            </TextField>
            <TextField
              style={inputStyle}
              select
              label="Nível de Acesso"
              defaultValue={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              helperText="Selecione o nível de Acesso"
            >
              <MenuItem key="1" value="0">
                Aluno
              </MenuItem>
              <MenuItem key="2" value="1">
                Instrutor
              </MenuItem>
              <MenuItem key="3" value="2">
                CFC
              </MenuItem>
              <MenuItem key="4" value="3">
                Auditor
              </MenuItem>
              <MenuItem key="5" value="4">
                Gestor
              </MenuItem>
            </TextField>
            <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleSubmit}>Salvar</Button>
          </div>
        </Box>
    </Modal>  
    <Modal
        open={createModalOpen}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '5px'}}>
              Criar Usuário
            </Typography>
            <TextField helperText="Digite o nome" label="Nome" variant="outlined" style={inputStyle} value={createUserName} onChange={(e) => setCreateUserName(e.target.value)} />
            <TextField type="password" error={createUserPassword == createUserPassword2 ? false : true} helperText="Digite a nova senha" label="Senha" variant="outlined" style={inputStyle} value={createUserPassword} onChange={(e) => setCreateUserPassword(e.target.value)}    />
            <TextField type="password" error={createUserPassword == createUserPassword2 ? false : true} helperText="Digite novamente a senha" label="Digite a senha novamente" variant="outlined" style={inputStyle} value={createUserPassword2} onChange={(e) => setCreateUserPassword2(e.target.value)} />
            <TextField helperText="Escreva o email" label="E-mail" variant="outlined" style={inputStyle} value={createUserEmail} onChange={(e) => setCreateUserEmail(e.target.value)} />
            <TextField helperText="Escreva o código fornecido pelo DETRAN" label="Código DETRAN" variant="outlined" style={inputStyle} value={createUserDETRAN} onChange={(e) => setCreateUserDETRAN(e.target.value)} />
            <TextField helperText="Escreva o seu CNPJ/CPF" label="CNPJ/CPF" variant="outlined" style={inputStyle} value={createDocument} onChange={(e) => setCreateDocument(e.target.value)} />
            <TextField
              style={inputStyle}
              select
              label="Estado"
              defaultValue={createUserState}
              onChange={(e) => setCreateUserState(e.target.value)}
              helperText="Selecione o seu ESTADO"
            >
              <MenuItem key="SC" value="SC">
                Santa Catarina
              </MenuItem>
              <MenuItem key="MG" value="MG">
                Minas Gerais
              </MenuItem>
            </TextField>
            <TextField
              style={inputStyle}
              select
              label="Nível de Acesso"
              defaultValue={createAccessLevel}
              onChange={(e) => setCreateAccessLevel(e.target.value)}
              helperText="Selecione o nível de Acesso"
            >
              <MenuItem key="1" value="0">
                Aluno
              </MenuItem>
              <MenuItem key="2" value="1">
                Instrutor
              </MenuItem>
              <MenuItem key="3" value="2">
                CFC
              </MenuItem>
              <MenuItem key="4" value="3">
                Auditor
              </MenuItem>
              <MenuItem key="5" value="4">
                Gestor
              </MenuItem>
            </TextField>
            <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleCreateUserSubmit}>Criar</Button>
          </div>
        </Box>
    </Modal>
    <div style={{ height: 350, width: '100%', marginTop: '8px', marginBottom: '30px'}}>
      <DataGrid
        onRowClick={handleRowClick}
        style={{ backgroundColor: 'white', borderRadius: '5px' }}
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />
      <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleOpenCreateModal}>Novo</Button>
    </div>
    </>
  )
}