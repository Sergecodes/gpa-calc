import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

export default function MoreInfo_Icon(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const dropdownStyle = {
    display: 'inline',
    position: 'absolute',
    color: 'gray',
    zIndex: '99',
    border: '1px solid rgba(90, 90, 90, .5)',
  	padding: '0.4rem',
  	width: '18rem',
    borderRadius: '7px',
    backgroundColor: 'beige',
    // backgroundColor: 'bisque',

  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <div style={{
        display: 'inline',
        position: 'relative',

      }}>
        <IconButton
          // color="secondary"
          aria-label="Meaning of cumulative"
          onClick={handleClick}
          component="span"
        >
          <InfoOutlinedIcon />
        </IconButton>
        {open ? (
          <div style={dropdownStyle}>
            {props.content}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );

}
