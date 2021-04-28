import randomColor from 'randomcolor';

var rc = randomColor();
export { rc };

export default function setColor(gpa) {
  if (gpa >= 2.0) return 'primary';
  else return 'secondary';
}
