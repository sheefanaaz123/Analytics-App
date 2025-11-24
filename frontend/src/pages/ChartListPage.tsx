import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { API_BASE } from "../api";
import DataTable from "../components/DataGrid";
import type { GridColDef } from "@mui/x-data-grid";

export type Chart = {
  id: number;
  chartName: string;
  chartType: string;
  createdAt: string;
};

export const ChartListPage = () => {
  const [charts, setCharts] = useState<Chart[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/charts`)
      .then((res) => res.json())
      .then((data) => setCharts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/delete-chart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Delete failed", await res.text());
        return;
      }
      setCharts((prev) => prev.filter((chart) => chart.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "chartName", headerName: "Chart Name", width: 700 },
    { field: "chartType", headerName: "Type", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 220 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => {
            if (confirm("Are you sure you want to delete this chart?")) {
              handleDelete(params.row.id);
            }
          }}
        >
          Delete
        </Button>
        </>
      ),
    },
  ];

  return (
    <Box padding={3}>
      <Typography
        variant="h4"
        marginBottom={3}
        sx={(theme) => ({ color: theme.palette.primary.main })}
      >
        Saved Charts
      </Typography>

      {charts.length === 0 ? (
        <p>No charts saved yet.</p>
      ) : (
        <DataTable rows={charts} columns={columns} />
      )}
    </Box>
  );
};
