import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function BodySelector(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label="Body 1" />
          <FormControlLabel value="1" control={<Radio />} label="Body 2" />
          <FormControlLabel value="2" control={<Radio />} label="Body 3" />
        </RadioGroup>
      </FormControl>
    )
  }
