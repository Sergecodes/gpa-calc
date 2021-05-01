import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableRow, TableCell, TextField } from '@material-ui/core';


export default class CourseInput extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      // note: the course is added to the semester before this method is called(before the course is rendered)
      // so this.props.semester.courses.length will always equal nextProps.semester.courses.length

      // if 1 course is left, re-render so as to remove delete button
      // if 2 courses are left(principally after 1 course was left), re-render so as to re-display delete button
      if (this.props.semester.courses.length === 1 || this.props.semester.courses.length === 2)
        return true;

      // these 2 vals will always be same
      // console.log(this.props.course.forceReRender, nextProps.course.forceReRender)

      // this test is done before the next test (props.course test) because when the reset button is pressed,
      // this is the only way we can know - since the courses will be reseted but not rendered as this.props.course
      // will be equal to nextProps.course = initial values (0, 0.0, '', etc)
      // ps: forceReRender is used for resetting the courses when semester is reset
      if(nextProps.course.forceReRender === true)
        return true;

      // if the course wasn't modified then don't re-render
      if (JSON.stringify(this.props.course) === JSON.stringify(nextProps.course))
        return false;

      return true;
    }


    render() {
      this.props.course.forceReRender = false;
      // console.log(this.props.course);
      // console.log(`Course ${this.props.course.id} in semester ${this.props.semester.number} rendered`);

      const {
        course, semester, onInputChange,
        onMarkOrCreditChange, onDeleteCourse
      } = this.props;
      const { name, credit, markOver100, grade } = course;

      return (
        <>
          <TableRow hover>
            <TableCell>
                <TextField
                  // id={`course-${course.id}-name`}
                  name="name"
                  value={name}
                  placeholder="e.g. INF 2054"
                  size="small"
                  variant="outlined"
                  onChange={() => onInputChange(event, course, semester)}
                />
            </TableCell>
            <TableCell>
                <TextField
                  // id={`course-${course.id}-credit`}
                  name="credit"
                  value={credit}
                  // type="number"
                  // value={credit === 0 ? '' : credit}
                  size="small"
                  variant="outlined"
                  onChange={() => onMarkOrCreditChange(event, course, semester)}
                />
            </TableCell>
            <TableCell>
              <TextField
                // id={`course-${id}-marks`}
                // type="number"
                // TODO: when on mobile, set type to number.
                name="markOver100"
                value={markOver100}
                size="small"
                variant="outlined"
                onChange={() => onMarkOrCreditChange(event, course, semester)}
                // or onChange={(event) => props.onInputChange(event, props.course, props.semester)}
              />
            </TableCell>
            <TableCell size="small">
              {grade === '' ? '-' : grade}
            </TableCell>

            {semester.courses.length > 1 ?
              <TableCell style={{paddingLeft: '0'}}>
                <IconButton
                  color="secondary"
                  aria-label="Delete course"
                  onClick={() => onDeleteCourse(course, semester)}
                  component="span"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              : null
            }
          </TableRow>
        </>
      );
    }
}

// export default React.memo(CourseInput);
// export default CourseInput;
