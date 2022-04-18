import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TableBody from "@mui/material/TableBody";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

import Add from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
function Employee() {
  let history = useHistory();
  const [employee, setEmployee] = useState(
    JSON.parse(localStorage.getItem("employee")) || []
  );

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split("")[0][0]}${name.split("")[1][0]}`,
    };
  }
  function call() {
    history.push("/Employee/Add");
  }
  const empDelete = (e, i) => {
    let obj = employee;
    obj.splice(i, 1);
    localStorage.setItem("employee", JSON.stringify(obj));
    setEmployee(JSON.parse(JSON.stringify(obj)));
  };
  return (
    <div>
      <br />
      <br />
      <br />

      <center>
        <Box style={{ width: 1000 }}>
          <Typography variant="h3" gutterBottom>
            Employees
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Avatar</strong>
                </TableCell>
                <TableCell>
                  {" "}
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  {" "}
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  {" "}
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  {" "}
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Avatar {...stringAvatar(e.name)} />
                  </TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.number}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit" placement="top">
                      <IconButton
                        aria-label="Edit"
                        onClick={() =>
                          history.push(`/Employee/Update/${e.id}`, { state: e })
                        }
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton
                        aria-label="delete"
                        onClick={() => empDelete(e, i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <Button variant="outlined" startIcon={<Add />} onClick={call}>
          Add
        </Button>
      </center>
    </div>
  );
}

export default Employee;
