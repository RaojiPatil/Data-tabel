import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { data, salarys } from '../commanconstant/allvalue';

export function calculate_age(dob1) {
  var today = new Date();
  var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
      age_now--;
  }
  return age_now ? age_now: 18 ;
};

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Empolyee id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Designation</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Total Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [empTotalSalary, setEmpTotalSalary] = React.useState(false);



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.emp_id}
        </TableCell>
        <TableCell align="right">{row.Name}</TableCell>
        <TableCell align="right">{calculate_age(row.DOB)}</TableCell>
        <TableCell align="right">{row.Designation}</TableCell>
        <TableCell align="right">{row.Country}</TableCell>
        <TableCell align="right">{row.Total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Salary Structure
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee id</TableCell>
                    <TableCell>Salary id</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Basic salary</TableCell>
                    <TableCell align="right">Bonus</TableCell>
                    <TableCell align="right">Insurance</TableCell>
                    <TableCell align="right">Professional tax</TableCell>
                    <TableCell align="right">Total salary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salarys.map((historyRow) => {
                    if(row.emp_id == historyRow.emp_id) {
                    return <TableRow key={historyRow.emp_id}>
                      <TableCell component="th" scope="row">
                        {historyRow.emp_id}
                      </TableCell>
                      <TableCell>{historyRow.salary_id}</TableCell>
                      <TableCell align="right">{historyRow.date}</TableCell>
                      <TableCell align="right">{historyRow.basic_salary}</TableCell>
                      <TableCell align="right">{historyRow.bonus}</TableCell>
                      <TableCell align="right">{historyRow.insurance}</TableCell>
                      <TableCell align="right">{historyRow.professional_tax}</TableCell>
                      <TableCell align="right">{historyRow.basic_salary + historyRow.bonus -  historyRow.insurance -  historyRow.professional_tax  }</TableCell>

                    </TableRow>
                    }
                   })}
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

