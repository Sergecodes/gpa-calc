import Semester from '../components/Semester.jsx';
import { Fragment } from 'react';

export default function SemesterList(props) {
    const {
      semesters, numSemesters, onInputChange, onMarkOrCreditChange,
      onDeleteSemester, onResetSemester, onAddCourse, onDeleteCourse
    } = props;

    return (
    	<div id="semester-list">
		   {semesters.map(
        semester =>
          // <Fragment key={semester.number}>
            <Semester
               t={props.t}
               key={semester.number}
               semester={semester}
               numSemesters={numSemesters}
               onInputChange={onInputChange}
               onMarkOrCreditChange={onMarkOrCreditChange}
               onDeleteSemester={onDeleteSemester}
               onResetSemester={onResetSemester}
               onAddCourse={onAddCourse}
               onDeleteCourse={onDeleteCourse}
             />
          // </Fragment>
	     )}
      </div>
  );
}
