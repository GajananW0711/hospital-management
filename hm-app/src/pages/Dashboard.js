import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  // State for patients
  const [patients, setPatients] = useState([
    { id: 1001, name: "Gajanan Wadje", age: 26, lastScan: "2024-05-18" },
    { id: 1002, name: "Jayesh Thokal", age: 26, lastScan: "2024-04-22" },
    { id: 1003, name: "Artish Pawar", age: 24, lastScan: "2024-05-10" },
    { id: 1004, name: "Amol Jadhav", age: 28, lastScan: "2024-05-05" },
    { id: 1005, name: "Snehal Patil", age: 27, lastScan: "2024-04-30" },
    { id: 1006, name: "Madhura Deshmukh", age: 25, lastScan: "2024-05-12" },
    { id: 1007, name: "Rohit More", age: 29, lastScan: "2024-05-08" },
    { id: 1008, name: "Pallavi Bhosale", age: 26, lastScan: "2024-05-15" },
    { id: 1009, name: "Suyash Shinde", age: 30, lastScan: "2024-04-25" },
    { id: 1010, name: "Sayali Jagtap", age: 24, lastScan: "2024-05-01" },
    { id: 1011, name: "Abhijeet Salunke", age: 27, lastScan: "2024-04-28" },
    { id: 1012, name: "Neha Kulkarni", age: 25, lastScan: "2024-05-03" }
  ]);

  // CRUD Handlers
  const handleAdd = () => {
    const id = patients.length ? Math.max(...patients.map(p => p.id)) + 1 : 1001;
    const name = prompt("Enter name:");
    const age = prompt("Enter age:");
    const lastScan = prompt("Enter last scan date (YYYY-MM-DD):");

    if (name && age && lastScan) {
      setPatients([...patients, { id, name, age: parseInt(age), lastScan }]);
    }
  };

  const handleEdit = (id) => {
    const patient = patients.find((p) => p.id === id);
    const name = prompt("Enter name:", patient.name);
    const age = prompt("Enter age:", patient.age);
    const lastScan = prompt("Enter last scan date (YYYY-MM-DD):", patient.lastScan);

    if (name && age && lastScan) {
      setPatients(
        patients.map((p) =>
          p.id === id ? { ...p, name, age: parseInt(age), lastScan } : p
        )
      );
    }
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "220px" }}>
          <Toolbar />
          
          {/* Top Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Patients Today</Typography>
                <Typography variant="h4">{patients.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Pending Reports</Typography>
                <Typography variant="h4">5</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Completed Reports</Typography>
                <Typography variant="h4">8</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Patient Table */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Patient List</Typography>
              <Fab color="primary" size="small" sx={{ fontSize: 16 }} onClick={handleAdd}>
                <AddIcon sx={{ fontSize: 16 }} />
              </Fab>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Last Scan</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.age}</TableCell>
                    <TableCell>{p.lastScan}</TableCell>
                    <TableCell>
                      <Fab color="primary" size="small" sx={{ mr: 1, fontSize: 16 }} onClick={handleAdd}>
                        <AddIcon sx={{ fontSize: 16 }} />
                      </Fab>
                      <Fab color="secondary" size="small" sx={{ mr: 1, fontSize: 16 }} onClick={() => handleEdit(p.id)}>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </Fab>
                      <Fab color="error" size="small" sx={{ fontSize: 16 }} onClick={() => handleDelete(p.id)}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Recent Reports */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Reports
            </Typography>
            <Button variant="outlined" sx={{ mr: 2 }}>View Report 1</Button>
            <Button variant="outlined">View Report 2</Button>
          </Paper>

          {/* Analytics Placeholder */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Scans per Month</Typography>
            <Typography>(Chart will go here)</Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
