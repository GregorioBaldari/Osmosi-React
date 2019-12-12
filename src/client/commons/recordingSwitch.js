import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function RecordingSwitch(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        disabled = {props.disabled}
        control={
          <Switch
            checked={props.value}
            onChange={props.onChange()}
            value="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        labelPlacement="top"
        label="Capture"
      />
    </FormGroup>
  );
}
