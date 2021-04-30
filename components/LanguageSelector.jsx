import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export default function LanguageSelector(props) {
    const { t, locale, router } = props;

    const changeLanguage = (event) => {
      const locale = event.target.value;
      router.push('/', '/', { locale });
      props.handleLanguageChange(locale);
    }

    return (
      <>
        <FormControl
          component="fieldset"
          style={{
            backgroundColor: 'ghostwhite',
            border: '1px solid rgba(249, 71, 47, .2)',
            padding: '.5rem',
            marginRight: '1.3rem',
            float: 'right'
        }}>
          <FormLabel component="legend">{t('Language')}</FormLabel>
          <RadioGroup
              aria-label="language"
              name="language"
              defaultValue={locale}
              onChange={changeLanguage}
              style={{flexDirection: 'row'}}
          >
            <FormControlLabel
                control={<Radio />}
                value="en"
                label={t('English')}
                style={{marginRight: '25px'}}
            />
            <FormControlLabel control={<Radio />} value="fr" label={t('French')} />
          </RadioGroup>

        </FormControl>
      </>
    );
}
