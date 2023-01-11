import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getAllLivesByClassID, getSubject, postAula } from "../../../api"

const columns: GridColDef[] = [
  {
    field: 'nome',
    headerName: 'Aula',
    width: 150,
    editable: false,
  },
  {
    field: 'disciplina_nome',
    headerName: 'Disciplina',
    width: 150,
  },
  {
    field: 'inicio',
    headerName: 'Inicio',
    width: 150,
    valueGetter: (params) =>
        `${params.row.inicio.split("T")[0].slice(8, 11)}/${params.row.inicio
          .split("T")[0]
          .slice(5, 7)}/${params.row.inicio.split("T")[0].slice(0, 4)}`,
    editable: false,
  },
  {
    field: 'fim',
    headerName: 'Fim',
    width: 150,
    valueGetter: (params) =>
    `${params.row.fim.split("T")[0].slice(8, 11)}/${params.row.fim
      .split("T")[0]
      .slice(5, 7)}/${params.row.fim.split("T")[0].slice(0, 4)}`,
editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    valueFormatter(params) {
      switch (params.value) {
        case 0: return 'Cancelada'
        case 1: return 'Aguardando';
        case 2: return 'Em andamento';
        case 3: return 'Finalizada';
      }
    },
    width: 150,
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

export function CadastroAulas() {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")

  const [rows, setRows] = useState([]);
  const [subject, setSubject] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const data = await getAllLivesByClassID({
        token,
        id
      })
      const subjectData = await getSubject(token);
      setSubject(subjectData.subjects);
      if(data === 'Error') {
        setRows([])
      } else {
        setRows(data.lives);
      }
    }

    fetchData()
  }, [])

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    await postAula(token, id, {
      nome: nomeAula,
      descricao: descricaoAula,
      inicio: aulaInicio,
      fim: aulaFim,
      disciplina_id: disciplina
    })

    handleCloseModal();
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const [disciplina, setDisciplina] = useState('');
  const [nomeAula, setNomeAula] = useState('');
  const [descricaoAula, setDescricaoAula] = useState('');
  const [aulaInicio, setAulaInicio] = useState('');
  const [aulaFim, setAulaFim] = useState('');
  return (
    <>
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '5px'}}>
              Criar Aula
            </Typography>
            <TextField helperText="Digite o nome" label="Nome" variant="outlined" style={inputStyle} value={nomeAula} onChange={(e) => {setNomeAula(e.target.value)}} />
            <TextField helperText="Digite a descrição da aula" label="Descrição" variant="outlined" style={inputStyle} value={descricaoAula} onChange={(e) => {setDescricaoAula(e.target.value)}}    />
            <TextField type={"date"} helperText="Digite o inicio da Turma" variant="outlined" style={inputStyle} value={aulaInicio} onChange={(e) => {setAulaInicio(e.target.value)}}  />
            <TextField type={"date"} helperText="Digite o fim da Turma" variant="outlined" style={inputStyle} value={aulaFim} onChange={(e) => {setAulaFim(e.target.value)}} />
            <TextField
              style={inputStyle}
              select
              label="Disciplina"
              defaultValue={disciplina}
              onChange={(e) => {setDisciplina(e.target.value)}}
              helperText="Selecione o CFC responsável pela turma"
            >
              {
                subject.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  )
                })
              }
            </TextField>
            <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleSubmit}>Salvar</Button>
          </div>
        </Box>
    </Modal>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{ height: 356, width: '50rem', marginTop: '8px', marginBottom: '30px'}}>
            <DataGrid
                style={{ backgroundColor: 'white', borderRadius: '5px' }}
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
              />
              <Button style={{marginTop: '5px', marginBottom: '10px', backgroundColor: '#14A59F', color: 'white'}} variant="contained" onClick={handleOpenModal}>Novo</Button>
        </div>
      </div>
    </>
  )
}