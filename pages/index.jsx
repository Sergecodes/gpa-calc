import React, { Component, Suspense } from 'react';
import LanguageSelector from "../components/LanguageSelector.jsx";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Heading from '../components/Heading.jsx';
import SemesterList from '../components/SemesterList.jsx';
import FinalResult from '../components/FinalResult.jsx';
import HowToCalculate from '../components/HowToCalculate.jsx';
import Contact from '../components/Contact.jsx';
import { withRouter } from 'next/router';
import transEN from '../public/locales/en/en.js';
import transFR from '../public/locales/fr/fr.js';

const INITIAL_COURSES = [
  {
    id: 1,
    name: '',
    credit: 0,  // weight(coeficient) of the course such as 3, 6..
    markOver100: 0.0,
    points: 0.0,  // example: 3.7, 4.0 ..
    grade: '',  // such as A, B..
  }, {
    id: 2,
    name: '',
    credit: 0,
    markOver100: 0.0,
    points: 0.0,
    grade: '',
  }, {
    id: 3,
    name: '',
    credit: 0,
    markOver100: 0.0,
    points: 0.0,
    grade: '',
  }
];
const INITIAL_SEMESTER = {
  courses: JSON.parse(JSON.stringify(INITIAL_COURSES)),
  gpa: 0.0,
  number: 1,
};


class GPACalculator extends Component {
  constructor(props) {
    super(props);
    console.log("Semesters list rendered");

    this.state = {
      semesters: [JSON.parse(JSON.stringify(INITIAL_SEMESTER))]
    };

    this.router = props.router;
    const { locale } = props.router;

    this.t = (locale === 'en' ? transEN : transFR);
    this.locale = locale;
  }

  componentDidMount() {
    console.log(this.locale);
    this.router.push('/', '/', { locale: this.locale });
  }

  handleLanguageChange = (locale) => {
    this.t = (locale === 'en' ? transEN : transFR);
  }

  getPoints = mark => {
    mark = parseFloat(mark);
    // mark should never be > 100 nor < 0 nor invalid !
    if (mark > 100) {
      alert("Wrong input");
      return 0.0;
    }

    else if (mark >= 80)
      return 4.00;
    else if (mark >= 75)
      return 3.70;
    else if (mark >= 70)
      return 3.30;
    else if (mark >= 65)
      return 3.00;
    else if (mark >= 60)
      return 2.70;
    else if (mark >= 55)
      return 2.30;
    else if (mark >= 50)
      return 2.00;
    else if (mark >= 45)
      return 1.70;
    else if (mark >= 40)
      return 1.30;
    else if (mark >= 35)
      return 1.00;
    else if (mark >= 30)
      return 0.00;
    else if (mark >= 0)
      return 0.00;
    else {
      alert("Wrong input");
      return '-';
    }
  }

  getGrade = mark => {
    mark = parseFloat(mark);

    if (mark > 100) {
      alert("Wrong input");
      return '-';
    }

    else if (mark >= 80)
      return 'A';
    else if (mark >= 75)
      return 'A-';
    else if (mark >= 70)
      return 'B+';
    else if (mark >= 65)
      return 'B';
    else if (mark >= 60)
      return 'B-';
    else if (mark >= 55)
      return 'C+';
    else if (mark >= 50)
      return 'C';
    else if (mark >= 45)
      return 'C-';
    else if (mark >= 40)
      return 'D+';
    else if (mark >= 35)
      return 'D';
    else if (mark >= 30)
      return 'E';
    else if (mark >= 0)
      return 'F';
    else {
      alert("Wrong input");
      return '-';
    }
  }

  getTotalCredit = semester => {
    const courses = [...semester.courses];
    var totalCredit = 0;
    for (let course of courses)
      totalCredit += course.credit;

    return totalCredit;
  }

  calculateGPA = semester => {
    const courses = [...semester.courses];
    var sum = 0.0;

    for (let course of courses) {
      sum += course.credit * course.points;
    }

    var totalCredit = this.getTotalCredit(semester);
    if (totalCredit === 0) return 0.0;  // to prevent zero division error

    var gpa = sum / totalCredit;
    if (isNaN(gpa)) return 0.0;

    return parseFloat(gpa.toFixed(2));  // return gpa in 2 dps
  }

  /** Return whether or not the string is numeric(integral) */
  isInt = val => /^\d+$/.test(val);

  // 9, 9. & 9.0 are considered real
  isReal = val => !isNaN(val) && !isNaN(parseFloat(val));

  /** Returns true if string has more than 1dp else false */
  hasMoreThanOneDecimalPoint = val => {
    var index = val.indexOf('.');
    if (index !== -1) {
      if(val.substring(index + 1).indexOf('.') === -1) {
        // contains only one decimal point
        return false;
      } else {
        // contains more than one decimal point
        return true;
      }
    } else {
      // contains no decimal point
      return false;
    }
  }

  handleInputChange = (event, course, semester) => {
    const { name, value } = event.target;
    var semesters = JSON.parse(JSON.stringify(this.state.semesters));
    var course = { ...course };
    course[name] = value;

    // semester.courses.splice(course.id - 1, 1, course); or better still
    semester.courses[course.id-1] = course;
    semesters[semester.number-1] = semester;
    this.setState({ semesters });
  }

  handleMarkOrCreditChange = (event, course, semester) => {
    const { name } = event.target;
    var { value } = event.target;
    // console.log(name, value);

    if (value === '')
      value = 0;

    if (name === "credit") {
      if (!this.isInt(value))
        return;

      value = parseInt(value, 10);
      if (value < 0 || value > 10)
        return;

    } else if (name === "markOver100") {
        if (!this.isReal(value))
          return;
        if (typeof(value) === "string" && this.hasMoreThanOneDecimalPoint(value))
          return;

        // parseFloat('9.') returns 9, same as parseFloat('9.0'); thus decimal point is lost.
        // To prevent this, only perform validation if value doesn't end with decimal point nor 0
        // If it ends with a decimal point, we'll just accept it
        if (typeof(value) === "string" && !value.endsWith('.') && !value.endsWith('0'))
          value = parseFloat(value);

        if (value < 0 || value > 100)
            return;
    }

    var course = { ...course };
    if (course[name] === value)  // do nothing if value hasn't changed
      return;

    course[name] = value;

    var semesters = JSON.parse(JSON.stringify(this.state.semesters));

    if (name === "markOver100") {
      course.grade = this.getGrade(course.markOver100);
      course.points = this.getPoints(course.markOver100);
    }

    // console.log(course);
    semester.courses[course.id-1] = course;
    semester.gpa = this.calculateGPA(semester);

    semesters[semester.number-1] = semester;
    this.setState({ semesters });
  }

  handleAddSemester = () => {
    // New semester's number is obtained by incrementing last semester's number
    // which is equal to the number of semesters
    const newSemesterNum = this.state.semesters.length + 1;

    /*
      semesters.push({
        number: newSemesterNum,
        gpa: 0.0,
        courses: JSON.parse(JSON.stringify(INITIAL_COURSES))
      });
      this.setState({ semesters });
    */

    this.setState(prevState => ({
      semesters: [
        ...prevState.semesters,
        {
          courses: JSON.parse(JSON.stringify(INITIAL_COURSES)),
          gpa: 0.0,
          number: newSemesterNum,
        }
      ]
    }));
  }

  handleDeleteSemester = semester => {
    var semesters = JSON.parse(JSON.stringify(this.state.semesters));
    // We know that semesterIndex is always one shy of the semesterNum
    const semesterNum = semester.number, semesterIndex = semesterNum - 1;

    semesters = semesters.filter(sem => sem.number !== semesterNum);

    // for every semester whose number is beyond the semesterNum, decrement its number
    for (let i = semesterIndex; i < semesters.length; i++)
      semesters[i].number--;  // semesters[i].number = semesters[i].number - 1;

    this.setState({ semesters });
  }

  handleResetSemester = semester => {
    var semesters = JSON.parse(JSON.stringify(this.state.semesters));

    semester.courses = semester.courses.map(course => {
      [course.name, course.credit, course.markOver100, course.points, course.grade] = ['', 0, 0.0, 0.0, ''];
      return course;
    });
    semester.gpa = 0.0;

    semesters[semester.number - 1] = semester;
    this.setState({ semesters });
  }

  handleAddCourse = semester => {
    // var semesters = [...this.state.semesters];
    var semesters = JSON.parse(JSON.stringify(this.state.semesters));
    const numCourses = semester.courses.length;

    semester.courses.push({
      // new course's id is obtained by incrementing last course's id (which is the number of courses)
      id: numCourses + 1,
      name: '',
      credit: 0,
      markOver100: 0.0,
      grade: '',
    });
    semesters[semester.number - 1] = semester;

    this.setState({ semesters });
  }

  handleDeleteCourse = (course, semester) => {
    var semesters = JSON.parse(JSON.stringify(this.state.semesters));
    const courseIndex = course.id - 1;
    // var semesterCourses = semester.courses;

    // Remove course from list of semester's courses
    semester.courses = semester.courses.filter(semCourse => semCourse.id !== course.id);

    // Reallocate ids(every course which comes after the deleted course's number's id is decremented)
    for (let i = courseIndex; i < semester.courses.length; i++)
      semester.courses[i].id--;  // semester.courses[i].id = semester.courses[i].id - 1

    semester.gpa = this.calculateGPA(semester);
    semesters[semester.number - 1] = semester;

    this.setState({ semesters });
  }

  render() {
    // if(this.router !== null && this.router !== undefined)
    //   this.router.push('/', '/', { locale: this.locale });
    const { semesters } = this.state;
    const numSemesters = semesters.length;
    const gpas = semesters.map(semester => semester.gpa);
    const t = this.t;

    return (
    // <Suspense fallback={<Loader />}>
    	<div id="app">
        <LanguageSelector
          t={t}
          locale={this.locale}
          router={this.router}
          handleLanguageChange={this.handleLanguageChange}
        />
        <br /> <br /> <br/>
    		<Heading t={t} />
    		<main>
        	 <SemesterList
             t={t}
             semesters={semesters}
             numSemesters={numSemesters}
             onInputChange={this.handleInputChange}
             onMarkOrCreditChange={this.handleMarkOrCreditChange}
             onDeleteSemester={this.handleDeleteSemester}
             onResetSemester={this.handleResetSemester}
             onAddCourse={this.handleAddCourse}
             onDeleteCourse={this.handleDeleteCourse}
           />
           <div style={{
             fontWeight: 'bolder',
             fontStyle: 'italic',
             float: 'right',
             marginBottom: '1.6rem'
           }}>
             {numSemesters === 1 ? (1 + ' ' + t('semester')) : (numSemesters + ' ' + t('semesters'))}
           </div>
           <br />
            <Button
              color="primary"
              onClick={this.handleAddSemester}
              startIcon={<AddCircleOutlineIcon />}
              style={{
                border: '2px solid rgba(144, 144, 144, 0.4)',
                width: '100%',
                justifyContent: 'left',
                paddingLeft: '1rem',
              }}
            >
              {t('Add a semester')}
            </Button>
    		</main>
        <br />
        <FinalResult
          t={t}
          gpas={gpas}
          semesters={semesters}
          calculateGPA={this.calculateGPA}
        />
        <br /> <br/>
        <HowToCalculate t={t}/>
        <br/> <br />
        <Contact t={t} />
      </div>
    // </Suspense>
    );
  }
}

export default withRouter(GPACalculator);
