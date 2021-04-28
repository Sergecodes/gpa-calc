import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

function createData(mark, grade, points, appreciation) {
  return { mark, grade, points, appreciation } ;
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function HowToCalculate_Table(props) {
  const { t } = props;

  // const tableHeader = ['Marks /100', 'Grade', 'Points', 'Appreciation'];
  const rows = [
    createData(t('80 and above'), 'A', '4.00', t('Very good')),
    createData('75 - 79', 'A-', '3.70', t('Good')),
    createData('70 - 74', 'B+', '3.30', ''),
    createData('65 - 69', 'B', '3.70', t('Good enough')),
    createData('60 - 64', 'B-', '2.70', ''),
    createData('55 - 59', 'C+', '2.30', t('Satisfactory')),
    createData('50 - 54', 'C', '2.00', ''),
    createData('45 - 49', 'C-', '1.70', t('Credits capitalised non-transferable')),
    createData('40 - 44', 'D+', '1.30', ''),
    createData('35 - 39', 'D', '1.00', ''),
    createData('30 - 34', 'E', '0.00', t('Fail')),
    createData('0 - 29', 'F', '0.00', ''),
  ];

  const headerStyle = {
    fontWeight: 'bold',
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <caption>{t('Score and appreciation grid')}</caption>
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Marks /100</TableCell>
            <TableCell style={headerStyle}>Grade</TableCell>
            <TableCell style={headerStyle}>Points</TableCell>
            <TableCell style={{...headerStyle, width: '18rem'}}>{t('Appreciation')}</TableCell>
            {// {tableHeader.map(col =>
            //   <TableCell key={col} style={headerStyle}>{col}</TableCell>
            // )}
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) =>
            <StyledTableRow key={index}>
              <TableCell component="th" scope="row">{row.mark}</TableCell>
              <TableCell>{row.grade}</TableCell>
              <TableCell>{row.points}</TableCell>
              <TableCell size="small">{row.appreciation}</TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
