import Image from 'next/image';
import { WhatsApp, GitHub } from '@material-ui/icons';
// import GitHubIcon from '@material-ui/icons/GitHub';
import { Grid, Typography } from '@material-ui/core';

export default function Contact(props) {
  const { t } = props;
  const gridItemStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <div style={{
      border: '1px dotted #ddbebe',
      width: '45%',
      paddingBottom: '.5rem',
      marginBottom: '1.7rem',
      borderRadius: '5px',
      float: 'right'
    }}>
      <Typography component="h2" variant="h3" style={{
          color: 'rgba(249, 71, 47, .8)',
          marginBottom: '.8rem',
          textAlign: 'center',
          fontSize: '2.2rem',

      }}>
          <span style={{borderBottom: '1px dotted'}}>Contact</span>
      </Typography>
      <Grid
        container
        style={{
          display: 'flex',
          lineHeight: 'normal',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <Grid item xs={2} style={gridItemStyles}>
            <a href="mailto: polosergeo31@gmail.com">
              <Image
                src="/images/google-gmail.svg"
                alt={t('Contact via email')}
                width={40}
                height={40}
              />
            </a>
            <a className="link-text gmail-text" href="mailto: polosergeo31@gmail.com">
              {t('Email')}
            </a>
          </Grid>
          <Grid item xs={2} style={gridItemStyles}>
            <a href="https://github.com/Sergecodes/gpa-calc" className="github-ico">
              <GitHub fontSize="large" />
            </a>
            <a className="link-text github-text" href="https://github.com/Sergecodes/gpa-calc">
              {t('GitHub')}
            </a>
          </Grid>
          {
            /*
            <Grid item xs={2} style={gridItemStyles}>
              <a href="https://wa.me/237651209832" className="whatsapp-ico">
                <WhatsApp fontSize="large" />
              </a>
              <a className="link-text whatsapp-text" href="https://wa.me/237651209832">
                {t('WhatsApp')}
              </a>
            </Grid>
            */
          }

      </Grid>

      <style jsx>{`
        .grid-item {
          text-align: center;
        }

        /*
        .whatsapp-ico,
        .whatsapp-text {
          color: #22ee22;
        }
        */

        .link-text {
          font-size: .9rem;
          display: block;
          text-decoration: none;
        }

        .github-ico {
          margin-bottom: 3px;
        }

        .github-text {
          color: #551a8b;
        }

        .gmail-text {
          color: #ee2222;
        }

      `}</style>
    </div>
  );
}
