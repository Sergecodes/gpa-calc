const translationStrings = {
    "Language": "Language",
    "A GPA Calculator": "A GPA Calculator",
    "English": "English",
    "French": "French",
    "Download": "Download",
    "Loading...": "Loading...",
    "Image": "Image",
    "Your GPA": "Your GPA",
    "Semester ": "Semester ",
    "semester" : "Semester",
    "semesters": "semesters",
    "Semester": "Semester",
    "Average": "Average",
    "Cumulative": "Cumulative",
    "Icon 1 content": "The average is calculated by dividing the sum of all GPAs by the number of semesters.",
    "Icon 2 content": "It is calculated by considering all the courses of every semester as if they are in one semester and calculating the GPA altogether.",
    "Course name": "Course name",
    "Credit": "Credit",
    "Marks /100": "Marks /100",
    "Grade": "Grade",
    "Score and appreciation grid": "Score and appreciation grid",
    "80 and above": "80 and above",
    "Good": "Good",
    "Good enough": "Good enough",
    "Satisfactory": "Satisfactory",
    "Credits capitalised non-transferable": "Credits capitalised non-transferable",
    "Fail": "Fail",
    "Add course": "Add course",
    "Reset": "Reset",
    "Add a semester": "Add a semester",
    "Remove semester": "Remove semester",
    "Appreciation": "Appreciation",
    "How to Calculate GPA": "How to Calculate GPA",
    "Example": "Example",
    "WhatsApp me": "WhatsApp me",
    "Email me": "Email me",
    "Contact via email": "Contact via email",

    "sp1": "Each course has a credit, which is like its coefficient and determines its 'weight'. The 'points' obtained for each course is obtained as shown on the table above, and depends on the marks obtained. ",
    "sp2": "To get the GPA of a given semester, multiply each course's credit by its points then find the sum. Now divide that sum by the sum of the credits of each course of that semester. ",
    "sp3": "Suppose there are 3 courses in a semester; Course A, Course B and Course C with credits 2, 3 and 4 respectively. ",
    "sp4": "Suppose a student scored 70, 85 and 49 in the different courses, therefore the grades obtained are B+, A and C- (obtained from the table above). ",
    "sp5": "To get the GPA, we take (2*3.30 + 3*4.00 + 4*1.70) ÷ (2 + 3 + 4) = 25.40 ÷ 9 which gives ",
    "sp6": "2.82 / 4.",

};

export default function translate(key) {
  return translationStrings[key];
}
