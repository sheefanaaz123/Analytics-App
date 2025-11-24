import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Chart } from "../pages/ChartListPage";

const paginationModel = { page: 0, pageSize: 5 };

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    borderBottom: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300]
    }`,
    fontWeight: 600,
    fontSize: "0.95rem",
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
  },

  "& .MuiDataGrid-row:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.action.hover
        : "#eaf3ff !important",
  },

  "& .MuiCheckbox-root.Mui-checked": {
    color: theme.palette.primary.main,
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300]
    }`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
  },
}));

export default function DataTable(props: { rows: Chart[]; columns: GridColDef[] }) {
  return (
    <Paper
      elevation={3}
      sx={{
        height: 450,
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        p: 1,
      }}
    >
      <StyledDataGrid
        rows={props.rows}
        columns={props.columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
