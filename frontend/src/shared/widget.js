import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { NormalButtonContainer } from '../ui/widget'

const NormalButton = styled(Button)({
    border: 'none',
    display: 'inline-block',
    backgroundColor: '#29b !important',
    /*background-image: url("/static/img/buttonblue@2x.png"),*/
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    transition: 'background-position .12s',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    overflow: 'hidden',
    cursor: 'pointer',
    textTransform: 'none',
    whiteSpace: 'nowrap',

    borderRadius: '4px',
    padding: '5px 10px',

    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0px',
    
    '&:hover': {
        backgroundPosition: 'calc(50% - 20px) 50%',
        textDecoration: 'none',
        userSelect: 'none',
    }
});
/*(props) => (
    <NormalButtonContainer>
        <div className={`normal kb ${props.c}`} >
            <Button variant="contained" onClick={props.onClick}>
                {props.name}
            </Button>
        </div>
    </NormalButtonContainer>
);*/

const SmallButton = (props) => (
    <NormalButtonContainer>
        <div className="small kb" onClick={props.onClick}>
            {props.name}
        </div>
    </NormalButtonContainer>
);
  
  export { NormalButton, SmallButton, };