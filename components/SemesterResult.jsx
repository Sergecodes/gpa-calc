import React from 'react';
import Chip from '@material-ui/core/Chip';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DownloadImage from './DownloadImage.jsx';
import DownloadPDF from './DownloadPDF.jsx';
import setColor from './utils';

export default function SemesterResult(props) {
  const { t, semesterNum, numSemesters, gpa } = props;

  return (
    <TableRow style={{borderTop: '1px solid rgb(224, 224, 224)'}}>
      <TableCell style={{display: 'flex', justifyContent: 'space-between'}}>
        <DownloadImage t={t} semesterNum={semesterNum} />
        <DownloadPDF t={t} semesterNum={semesterNum} />
      </TableCell>
      <TableCell colSpan="2" style={
        numSemesters === 1 ? {paddingLeft: '6.3rem'}
        : {textAlign: 'center', paddingLeft: '0'}
      }>
        <Chip
          color={setColor(gpa)}
          variant="outlined"
          label={gpa === 0 ? 'GPA: 0.00 / 4' : `GPA: ${gpa} / 4`}
          style={{
            fontWeight: '900',
            fontSize: '1.1rem',
            textOverflow: 'clip'
          }}
        />
      </TableCell>
    </TableRow>
  );

}
