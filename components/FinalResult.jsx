import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import MoreInfo_Icon from './MoreInfo_Icon';
import setColor from './utils';

export default class FinalResult extends React.PureComponent {
  calculateAverage = () => {
    const gpas = this.props.gpas;

    if (gpas.length === 0)
      return 0.00;
    return parseFloat((gpas.reduce(
      (a, b) => a + b
    ) / gpas.length).toFixed(2));
  }

  calculateCumulativeGPA = () => {
    var allCourses = [];

    for(let semester of this.props.semesters) {
      for(let course of semester.courses) {
        allCourses.push(course);
      }
    }

    const dummySemester = {
      number: 0,
      gpa: 0.0,
      courses: [...allCourses]
    };

    return this.props.calculateGPA(dummySemester);
  }

  render() {
    const { t, gpas } = this.props;
    const average = this.calculateAverage();
    const cumulativeGPA = this.calculateCumulativeGPA();

    const divStyle = {
      borderTop: '2px solid rgba(144, 144, 144, 0.4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '.7rem',
    };

    const secDivStyle = {
      ...divStyle,
      paddingTop: '0',
      paddingBottom: '0',
    };

    return (
      <div>
        <div style={{
          textTransform: 'uppercase',
          textAlign: 'center',
          color: 'dimgray',
        }}>
          <h2>{t('Your GPA')}</h2>
        </div>

        {gpas.map(
          (gpa, index) =>
            <div
              key={index}
              style={divStyle}
            >
              <span>{t('Semester') + ' ' + (index + 1)}</span>
              <span style={{color: (gpa >= 2.0 ? 'blue' : 'red')}}>
                  <span style={{
                    borderRight: `1px solid ${gpa >= 2.0 ? 'blue' : 'orangered'}`,
                    paddingRight: '.4rem'
                  }}>
                    {`${gpa.toFixed(2)} / 4`}
                  </span>
                  <span style={{paddingLeft: '.4rem'}}>
                    {`${(gpa * 5).toFixed(2)} / 20`}
                  </span>
              </span>
            </div>
        )}

        <div style={secDivStyle}>
          <Typography
            variant="subtitle2"
            component="span"
            color={setColor(average)}
          >
            {t('Average')}
            <MoreInfo_Icon
              content={t('Icon 1 content')}
            />
          </Typography>

          <Typography variant="subtitle2" component="span" color={setColor(average)}>
            {average === 0 ? '0.00 / 4' : `${average} / 4`}
          </Typography>
        </div>
        <div style={{...secDivStyle, borderBottom: '2px solid rgba(144, 144, 144, 0.4)'}}>
          <Typography
            variant="subtitle2"
            component="span"
            color={setColor(cumulativeGPA)}
          >
            {t('Cumulative')}
            <MoreInfo_Icon
              content={t('Icon 2 content')}
            />
          </Typography>

          <Typography variant="subtitle2" component="span" color={setColor(cumulativeGPA)}>
            {cumulativeGPA === 0 ? '0.00 / 4' : `${cumulativeGPA} / 4`}
          </Typography>
        </div>

      </div>
    );
  }
}
