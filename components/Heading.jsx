import Typography from '@material-ui/core/Typography';

export default function Heading(props) {
    return (
        <Typography component="h1" variant="h3" style={{
            color: 'rgba(249, 71, 47, .9)',
            marginBottom: '1.5rem',
            // textDecorationLine: 'underline',
            fontSize: '2.2rem'
        }}>
            {props.t('A GPA Calculator')}
        </Typography>

    );
}
