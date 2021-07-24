import React from 'react';
import Semester from './Semester.jsx';
import { Button, IconButton, Modal } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import domtoimage from 'dom-to-image';

export function generateImage(semesterNum) {
  var img = new Image();
  // an element must be visible(display not 'none') for there to be possibility of image generation
  // so we first make our "to-be-generated-image's element" visible
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
      // console.error('oopss', error);
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

    const that = this;  // preserve the *this* object.

    this.image.onload = function () {
      // *this* here will be the object that defined the arrow function so use that instead
      // console.log(that.image);
      that.setState({
        open: true
      });
    };

  }

  handleClose = () => {
    // hide the semester clone used to generate the image
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
            justifyContent: 'space-evenly',
            flexDirection: 'row-reverse',
            height: '90%'
          }}
        >
          <>
            <IconButton
              aria-label="Close modal"
              onClick={() => this.handleClose()}
              component="span"
              style={{alignSelf: 'start', color: 'ghostwhite'}}
            >
              <CloseIcon />
            </IconButton>
            {image !== null ?
              <>
                <img
                  src={image.src}
                  alt={image.alt}
                  id={image.id}
                  style={{width: '70%', marginTop: '2rem', marginBottom: '3rem'}}
                />
                <a
                  href={image.src}
                  download={`Semester ${this.semesterNum} results.png`}
                  style={{alignSelf: 'center'}}
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
