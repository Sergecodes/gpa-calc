import React from 'react';
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Paper, TextField, Chip, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import CourseInput from './CourseInput.jsx';
import SemesterResult from './SemesterResult.jsx';
import setColor from './utils';


export default function Semester(props) {
    // console.log(`Semester ${props.semester.number} rendered`);

    const headerCellStyle = {
      fontWeight: '600'
    };
    const cloneCellStyle = {
      paddingTop: '0',
      paddingBottom: '0'
    };

    const {
      t, semester, numSemesters, onInputChange, onMarkOrCreditChange,
      onDeleteSemester, onResetSemester, onAddCourse, onDeleteCourse,
    } = props;
    const gpa = semester.gpa, numCourses = semester.courses.length;

    return (
      <>
        <div id={`semester-${semester.number}`} style={{marginBottom: '2rem'}}>
          <div style={{
            fontVariant: 'small-caps',
            color: 'rgba(249, 71, 47, .9)',
            textAlign: 'center',
            border: '2px solid rgba(123, 123, 123, 0.15)',
            borderRadius: '4px',
          }}>
            <h2 style={{margin: '.2rem auto'}}>{t('Semester ') + semester.number}</h2>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label={`Semester ${semester.number} form`}>
              <TableHead>
                <TableRow style={{borderBottom: '1px solid rgb(224, 224, 224)'}}>
                  <TableCell style={headerCellStyle}>{t('Course name')}</TableCell>
                  <TableCell style={headerCellStyle}>{t('Credit') + ' (max 10)'}</TableCell>
                  <TableCell size="small" style={headerCellStyle}>{t('Marks /100')}</TableCell>
                  <TableCell size="small" style={headerCellStyle}>{t('Grade')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {semester.courses.map(
                  course => (
                    <CourseInput
                      key={course.id}
                      course={course}  // pass course to CourseInput component
                      semester={semester}
                      onInputChange={onInputChange}
                      onMarkOrCreditChange={onMarkOrCreditChange}
                      onDeleteCourse={onDeleteCourse}
                    />
                  )
                )}
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onAddCourse(semester)}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      {t('Add course')}
                    </Button>
                  </TableCell>

                  <TableCell>
                  </TableCell>
                  {numSemesters === 1 ?
                    <>
                      <TableCell>
                      </TableCell>
                      <TableCell style={{paddingLeft: '0'}}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onResetSemester(semester)}
                          >
                          {t('Reset')}
                        </Button>
                      </TableCell>
                    </>
                    :
                    <>
                      <TableCell style={{
                        float: 'right',
                        position: 'relative',
                        top: '1px'
                      }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onResetSemester(semester)}
                          >
                          {t('Reset')}
                        </Button>
                      </TableCell>
                      <TableCell colSpan="2" style={{whiteSpace: 'nowrap'}}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onDeleteSemester(semester)}
                          startIcon={<DeleteIcon />}
                          >
                          {t('Remove semester')}
                        </Button>
                      </TableCell>
                    </>
                  }
                </TableRow>

                <SemesterResult
                  t={t}
                  gpa={semester.gpa}
                  numCourses={numCourses}
                  semesterNum={semester.number}
                  numSemesters={numSemesters}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div id={`semester-${semester.number} clone`} style={{display: 'none', width: '80%'}}>
          <div style={{
            fontVariant: 'small-caps',
            color: 'rgba(249, 71, 47, .9)',
            textAlign: 'center',
            border: '2px solid rgba(123, 123, 123, 0.15)',
            borderRadius: '4px',
          }}>
            <h2 style={{margin: '.2rem auto'}}>{t('Semester') + ' ' + semester.number}</h2>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{borderBottom: '1px solid rgb(224, 224, 224)'}}>
                  <TableCell style={headerCellStyle}>{t('Course name')}</TableCell>
                  <TableCell style={headerCellStyle}>{t('Credit')}</TableCell>
                  <TableCell style={headerCellStyle}>{t('Marks /100')}</TableCell>
                  <TableCell size="small" style={headerCellStyle}>{t('Grade')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {semester.courses.map(course =>
                  <TableRow key={course.id}>
                    <TableCell style={cloneCellStyle}>{course.name}</TableCell>
                    <TableCell style={cloneCellStyle}>{course.credit}</TableCell>
                    <TableCell style={cloneCellStyle}>{course.markOver100}</TableCell>
                    <TableCell size="small" style={cloneCellStyle}>
                      {course.grade === '' ? '-' : course.grade}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow style={{borderTop: '1px solid rgb(224, 224, 224)'}}>
                  <TableCell colSpan={props.numCourses === 1 ? "4" : "5"} style={{textAlign: 'center'}}>
                  <Chip
                    color={setColor(gpa)}
                    variant="outlined"
                    label={gpa === 0 ? 'GPA: 0.00 / 4' : `GPA: ${gpa} / 4`}
                    style={{
                      fontWeight: '900',
                      fontSize: '1.1rem',
                      whiteSpace: 'nowrap'
                    }}
                  />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
}
