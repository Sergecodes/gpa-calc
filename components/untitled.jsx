

// this.setState(prevState => ({
//   semesters // equivalent to semesters: semesters
// }), );

// clone node
// this.originalContent = node.cloneNode(true);
// this.originalContent = ($(`#semester-${semesterNum}`).clone(true, true)).get(0);

// in GPACalculator
handleModalImageClose = (semesterNum) => {
  const semesters = [...this.state.semesters];
  const semester = semesters.find(sem => sem.number === semesterNum);
  const semesterIndex = semesterNum - 1;

  this.handleDeleteSemester(semester);
  // console.log(semesters);
  // this.setState({ semesters });  // rerender by setting state to new list of semesters
  // semesters.splice(semesterIndex, 0, semester);   // reinsert semester to initial position
  // this.setState({ semesters });  // reset state to force rerender
}
