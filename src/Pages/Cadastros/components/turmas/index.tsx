import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllClasses, getAllCourses, getAllUser, postClass } from "../../../../api";

const columns: GridColDef[] = [
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
    editable: false,
  },
  {
    field: 'inicio',
    headerName: 'Início',
    width: 150,
    valueGetter: (params) =>
    `${params.row.cadastro.split("T")[0].slice(8, 11)}/${params.row.cadastro
      .split("T")[0]
      .slice(5, 7)}/${params.row.cadastro.split("T")[0].slice(0, 4)}`,
editable: false,
  },
  {
    field: 'fim',
    headerName: 'Fim',
    width: 150,
    valueGetter: (params) =>
        `${params.row.cadastro.split("T")[0].slice(8, 11)}/${params.row.cadastro
          .split("T")[0]
          .slice(5, 7)}/${params.row.cadastro.split("T")[0].slice(0, 4)}`,
    editable: false,
  }
];


export default function Turma() {
  const navigate = useNavigate();
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
  navigate(`/aulas?id=${params.row.id}`)
};


  useEffect(() => {
    async function fetchClasses() {
      const data = await getAllClasses(localStorage.getItem('token'));
      const coursesData = await getAllCourses(localStorage.getItem('token'));
      const usersData = await getAllUser(localStorage.getItem('token'));
      setCfcs(usersData.users.filter((user: any) => user.nivel === 2));
      setCursos(coursesData.Courses)
      setRows(data.classes);
    }

    fetchClasses()
  }, []);

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

  const [rows, setRows] = useState([])

  const [nomeTurma, setNomeTurma] = useState('');
  const [cursoTurma, setCursoTurma] = useState('');
  const [cfcTurma, setCFCTurma] = useState('');
  const [limiteTurma, setLimiteTurma] = useState('');
  const [inicioTurma, setInicioTurma] = useState('');
  const [fimTurma, setFimTurma] = useState('');


  const [cursos, setCursos] = useState([]);
  const [cfcs, setCfcs] = useState([]);

  const [turmaModal, setTurmaModal] = useState(false);

  const handleCloseTurmaModal = () => setTurmaModal(false);
  const handleOpenTurmaModal = () => setTurmaModal(true);

  async function handleSubmit() {
    const token = localStorage.getItem('token');
    const newClass = await postClass({
      token,
      nome: nomeTurma,
      inicio: inicioTurma,
      fim: fimTurma,
      limite: parseInt(limiteTurma),
      course: cursoTurma,
      provider: 1,
      cfc_id: cfcTurma
    })


  }
  return (
    <>
    <Modal
        open={turmaModal}
        onClose={handleCloseTurmaModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '5px'}}>
              Criar Turma
            </Typography>
            <TextField helperText="Digite o nome" label="Nome" variant="outlined" style={inputStyle} value={nomeTurma} onChange={(e) => setNomeTurma(e.target.value)} />
            <TextField type={"number"} helperText="Digite o limite da turma" label="Limite da turma" variant="outlined" style={inputStyle} value={limiteTurma} onChange={(e) => setLimiteTurma(e.target.value)}    />
            <TextField type={"date"} helperText="Digite o inicio da Turma" variant="outlined" style={inputStyle} value={inicioTurma} onChange={(e) => setInicioTurma(e.target.value)} />
            <TextField type={"date"} helperText="Digite o fim da Turma" variant="outlined" style={inputStyle} value={fimTurma} onChange={(e) => setFimTurma(e.target.value)} />
            <TextField
              style={inputStyle}
              select
              label="Cursos"
              defaultValue={cursoTurma}
              onChange={(e) => setCursoTurma(e.target.value)}
              helperText="Selecione o curso desejado"
            >
              {cursos.map((cursos: any) => {
                return (
                  <MenuItem key={cursos.id} value={cursos.id}>
                    {cursos.nome}
                  </MenuItem>
                )
              })}
            </TextField>
            <TextField
              style={inputStyle}
              select
              label="CFC"
              defaultValue={cfcTurma}
              onChange={(e) => setCFCTurma(e.target.value)}
              helperText="Selecione o CFC responsável pela turma"
            >
              {cfcs.map((cfcs:any) => {
                return (
                  <MenuItem key={cfcs.id} value={cfcs.id}>
                    {cfcs.nome}
                  </MenuItem>
                )
              })}
              
            </TextField>
            <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleSubmit}>Salvar</Button>
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
          <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleOpenTurmaModal}>Novo</Button>
      </div>
    </>
  )
}