import React from 'react';
import Semester from './Semester.jsx';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export function generateImage(semesterNum) {
  var img = new Image();
  var node = document.getElementById(`semester-${semesterNum} clone`);
  node.style.display = "block";

  domtoimage.toPng(node)
    .then(function (dataUrl) {
      img.src = dataUrl;
      img.id = 'results-image';
      img.setAttribute('alt', `Semester ${semesterNum} results`);
    })
    .catch(function (error) {
      alert("An error occurred during the generation of the image.");
      console.error('oopss', error);
    });

  return img;
}

export default class DownloadImage extends React.Component {
  constructor(props) {
    super(props);

    this.image = null;
    this.semesterNum = props.semesterNum;
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.image = generateImage(this.semesterNum);

    const $this = this;  // preserve the *this* object.

    this.image.onload = function () {
      // *this* here will be undefined ?(arrow function) so use $this
      // console.log($this.image);
      $this.setState({
        open: true
      });
    };

  }

  handleClose = () => {
    var node = document.getElementById(`semester-${this.semesterNum} clone`);
    node.style.display = "none";

    this.setState({
      open: false
    });
  }

  render() {
    const image = this.image, { t } = this.props;

    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.handleOpen()}
          endIcon={<GetAppIcon />}
        >
          {t('Image')}
        </Button>
        <Modal
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-label={`Semester ${this.semesterNum} results modal image`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row-reverse',
            height: '90%'
          }}
        >
          <>
            <IconButton
              aria-label="Close modal"
              onClick={() => this.handleClose()}
              component="span"
              style={{alignSelf: 'start', color: 'ghostwhite', marginLeft: '3rem'}}
            >
              <CloseIcon />
            </IconButton>
            {image !== null ?
              <>
                <img
                  src={image.src}
                  alt={image.alt}
                  id={image.id}
                  style={{width: '60%'}}
                />
                <a
                  href={image.src}
                  download={`Semester {this.semesterNum} results.png`}
                  style={{
                    alignSelf: 'end',
                    position: 'relative',
                    bottom: '1rem',
                    right: '2rem'
                  }}
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => this.handleClose()}
                    disableElevation
                    // style={{color: 'darkblue'}}
                  >
                    {t('Download')}
                  </Button>
                </a>
              </>
              : null
            }
          </>
        </Modal>
      </>
    );
  }

}
