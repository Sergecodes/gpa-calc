import React from 'react';
import { Button, Modal, IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import {
  PDFDownloadLink, Page, Text,
  View, Image, Document, StyleSheet,
  ReactPDF, PDFViewer
} from '@react-pdf/renderer';
import { generateImage } from './DownloadImage.jsx';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  }
});


export default class DownloadPDF extends React.Component {
  constructor(props) {
    super(props);

    this.image = null;
    this.semesterNum = props.semesterNum;
    this.state = {
      open: false,
    };
  }

  MyDoc = () => {
    // console.log(this.image.src);
    return (
      <Document>
        <Page size="A4" style={{...styles.page, textAlign: 'center'}}>
          <Image
            src={this.image.src}
            style={{width: '100%'}}
          />
        </Page>
      </Document>
    );
  }

  handleClose = () => {
    var node = document.getElementById(`semester-${this.semesterNum} clone`);
    node.style.display = "none";

    this.setState({
      open: false
    });
  }

  handleOpen = () => {
    this.image = generateImage(this.semesterNum);
    const that = this;  // preserve the *this* object.

    this.image.onload = function () {
      // *this* here will be undefined ?(arrow function) so use that
      // console.log(that.image);
      that.setState({
        open: true
      });
    };
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.handleOpen()}
          endIcon={<GetAppIcon />}
        >
          PDF
        </Button>
        <Modal
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-label={`Semester ${this.semesterNum} results pdf modal`}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'row-reverse'
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
            {this.image !== null ?
              <>
                {// PDFViewer turns to an iframe.
                }
                {/*
                  <PDFViewer style={{width: '70%', marginTop: '2rem', marginBottom: '3rem', marginLeft: '3rem'}}>
                    {<this.MyDoc/>}
                  </PDFViewer>
                </object>
                */
                }
                {
                  // todo: for now, this just display an image. change this to actually display the pdf.
                }
                <img
                  src={this.image.src}
                  alt={this.image.alt}
                  style={{width: '70%', marginTop: '2rem', marginBottom: '3rem'}}
                />

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => this.handleClose()}
                  style={{alignSelf: 'center'}}
                >
                  <PDFDownloadLink
                    document={<this.MyDoc/>}
                    fileName={`Semester ${this.semesterNum} results.pdf`}
                    style={{textDecoration: 'none', color: 'midnightblue'}}
                  >
                      {({ blob, url, loading, error }) =>
                        loading ? t('Loading...') : t('Download')
                      }
                  </PDFDownloadLink>
                </Button>
              </>
              : null
            }
          </>
        </Modal>
      </>
    );
  }

}
