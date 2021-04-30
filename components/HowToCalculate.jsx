import Typography from '@material-ui/core/Typography';
import { createElement } from 'react';
import Paper from '@material-ui/core/Paper';
import HowToCalculate_Table from '../components/HowToCalculate_Table.jsx';

export default function HowToCalculate(props) {
  const { t } = props;

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        style={{
          color: 'rgba(249, 71, 47, .9)',
      }}>
        {t('How to Calculate GPA')}
      </Typography>
      <br/>
      <HowToCalculate_Table t={t} />
      <br/>
      <Typography variant="body1" style={{wordSpacing: '1px'}}>
        {t('sp1')} <br/>
        {t('sp2')} <br/> <br/>
        <span style={{fontWeight: 'bold'}}>{t('Example') + ': '}</span>
        {t('sp3')}
        {t('sp4')}
        {t('sp5')}
        <span style={{fontWeight: 'bold'}}>{t('sp6')}</span>
      </Typography>
    </>
  );
}
