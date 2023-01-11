import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { getAllUser, getAllClasses, updateMatricula, createMatricula } from '../../../../api';
import { MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const columns: GridColDef[] = [
  { field: "id", headerName: "Matrícula", minWidth: 100 },
  { field: "usuario_id", headerName: "ID do Aluno", minWidth: 110 },
  { field: "turma_nome", headerName: "Turma", minWidth: 200 },
  { field: "nome", headerName: "Aluno", minWidth: 200 },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px'
};

const inputStyle = {
  marginTop: '5px',
  marginBottom: '10px',
}

export function CadastroMatriculas() {

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      const userResponse = await getAllUser(token);
      const classList = await getAllClasses(token);
      setTurmaList(classList.classes)
      const usersData = userResponse.users;
      let matriculas: any[] = [];
      let error = [];

      usersData.forEach((user: any) => {
        if(!user.cadastros) {
          error.push(user)
        } else {
          user.cadastros.forEach((cadastro: any) => {
            if (user.nivel === 0) {
              const turmaList = classList.classes;
              const turma = turmaList.filter((turma: any) => turma.id === cadastro.turma_id);
              matriculas.push({
                id: cadastro.id,
                usuario_id: cadastro.usuario_id,
                turma_nome: turma[0].nome,
                nome: user.nome,
                user,
              });
            }
          })
        }
      });
      setRows(matriculas);
    }
    fetchData()
  }, [])

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setEditId(params.row.user.id);
    setEditNome(params.row.user.nome)
    setEditEmail(params.row.user.email)
    setEditCpf(params.row.user.documento)
    setEditEmail(params.row.user.email)
    setEditState(params.row.user.uf)
    setEditClass(params.row.user.id)
    handleOpenEditModal();
  };

  const [rows, setRows] = useState<any>([])
  const [turmaList, setTurmaList] = useState([])

  
  const [editMatriculaModal, setEditMatriculaModal] = useState(false);
  const [createMatriculaModal, setCreateMatriculaModal] = useState(false);

  function handleCloseEditModal() {
    setEditMatriculaModal(false);
  }

  function handleOpenEditModal() {
    setEditMatriculaModal(true);
  }

  function handleCloseCreateModal() {
    setCreateMatriculaModal(false);
  }

  function handleOpenCreateModal() {
    setCreateMatriculaModal(true);
  }

  function handleEditSubmit() {
    const token = localStorage.getItem('token');
    updateMatricula({
      token,
      nome : editNome,
      id: editId,
      senha: editPassword,
      senha2: editPassword2,
      email: editEmail,
      documento: editCpf,
      turma_id: editClass,
      cidade: editState
    }).then(() => {
      handleCloseEditModal()
    })
  }

  function handleCreateSubmit() {
    const token = localStorage.getItem('token');
    createMatricula(token, {
      nome: createNome,
      senha: createPassword,
      senha2: createPassword2,
      email: createEmail,
      documento: createCPF,
      turma_id: createClass,
      uf: createState,
      nivel: 0
    }).then(() => {
      handleCloseCreateModal();
    })
  }


  const [editNome, setEditNome] = useState('');
  const [editId, setEditId] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editPassword2, setEditPassword2] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCpf, setEditCpf] = useState('');
  const [editClass, setEditClass] = useState('');
  const [editState, setEditState] = useState('');
  const [editRG, setEditRG] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editCellphone, setEditCellphone] = useState('');

  const [createNome, setCreateNome] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createPassword2, setCreatePassword2] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createCPF, setCreateCPF] = useState('');
  const [createClass, setCreateClass] = useState('');
  const [createState, setCreateState] = useState('');
  const [createRG, setCreateRG] = useState('');
  const [createCiy, setCreateCity] = useState('');
  const [createCellphone, setCreateCellphone] = useState('');


  return (
    <>
    <Modal
        open={editMatriculaModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '5px'}}>
              Editar Matrícula
            </Typography>
            <TextField helperText="Digite o nome" label="Nome" variant="outlined" style={inputStyle} value={editNome} onChange={(e) => setEditNome(e.target.value)} />
            <TextField type="password" error={editPassword == editPassword2 ? false : true} helperText="Digite a nova senha" label="Senha" variant="outlined" style={inputStyle} value={editPassword} onChange={(e) => setEditPassword(e.target.value)}    />
            <TextField type="password" error={editPassword == editPassword2 ? false : true} helperText="Digite novamente a senha" label="Digite a senha novamente" variant="outlined" style={inputStyle} value={editPassword2} onChange={(e) => setEditPassword2(e.target.value)} />
            <TextField helperText="Escreva o email EX: ICETRAN@EXEMPLO.COM.BR" label="E-mail" variant="outlined" style={inputStyle} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            <TextField helperText="Digite o seu CPF: EX 07729751089" label="CPF" variant="outlined" style={inputStyle} value={editCpf} onChange={(e) => setEditCpf(e.target.value)} />
            <TextField
              style={inputStyle}
              select
              label="Turma"
              defaultValue={0}
              onChange={(e) => setEditClass(e.target.value)}
              helperText="Selecione a sua turma"
            >
              <MenuItem value={0}>
                  Turma
              </MenuItem>
              {
                turmaList.map((turma: any) => {
                  return (
                    <MenuItem key={turma.id} value={turma.id}>
                      {turma.nome}
                    </MenuItem>
                  )
                })
              }
            </TextField>
            <TextField
              style={inputStyle}
              select
              label="Estado"
              defaultValue={'SC'}
              onChange={(e) => setEditState(e.target.value)}
              helperText="Selecione o seu ESTADO"
            >
              <MenuItem key="SC" value="SC">
                Santa Catarina
              </MenuItem>
              <MenuItem key="MG" value="MG">
                Minas Gerais
              </MenuItem>
            </TextField>
            <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleEditSubmit}>Salvar</Button>
          </div>
        </Box>
    </Modal>
    <Modal
        open={createMatriculaModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '5px'}}>
              Criar Matrícula
            </Typography>
            <TextField helperText="Digite o nome" label="Nome" variant="outlined" style={inputStyle} value={createNome} onChange={(e) => setCreateNome(e.target.value)} />
            <TextField type="password" error={createPassword == createPassword2 ? false : true} helperText="Digite a nova senha" label="Senha" variant="outlined" style={inputStyle} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)}    />
            <TextField type="password" error={createPassword == createPassword2 ? false : true} helperText="Digite novamente a senha" label="Digite a senha novamente" variant="outlined" style={inputStyle} value={createPassword2} onChange={(e) => setCreatePassword2(e.target.value)} />
            <TextField helperText="Escreva o email EX: ICETRAN@EXEMPLO.COM.BR" label="E-mail" variant="outlined" style={inputStyle} value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
            <TextField helperText="Digite o seu CPF: EX 07729751089" label="CPF" variant="outlined" style={inputStyle} value={createCPF} onChange={(e) => setCreateCPF(e.target.value)} />
            <TextField
              style={inputStyle}
              select
              label="Turma"
              defaultValue={0}
              onChange={(e) => setCreateClass(e.target.value)}
              helperText="Selecione a sua turma"
            >
              <MenuItem value={0}>
                  Turma
              </MenuItem>
              {
                turmaList.map((turma: any) => {
                  return (
                    <MenuItem key={turma.id} value={turma.id}>
                      {turma.nome}
                    </MenuItem>
                  )
                })
              }
            </TextField>
            <TextField
              style={inputStyle}
              select
              label="Estado"
              defaultValue={'SC'}
              onChange={(e) => setCreateState(e.target.value)}
              helperText="Selecione o seu ESTADO"
            >
              <MenuItem key="SC" value="SC">
                Santa Catarina
              </MenuItem>
              <MenuItem key="MG" value="MG">
                Minas Gerais
              </MenuItem>
            </TextField>
            <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleCreateSubmit}>Salvar</Button>
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
      <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleOpenCreateModal} >Novo</Button>
    </div>
    </>
  )
}