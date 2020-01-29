import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: 13,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function InstrumentSelector(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    instrument: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);


  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
//Adding Sounds: STEP 4

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="instrument-native-simple">Instrument</InputLabel>
        <Select
          native
          value={props.value}
          onChange={props.onChange()}
          inputProps={{
            name: 'instrument',
            id: 'instrument-native-simple',
          }}
        >
          <option value={'Classic Guitar'}>Classic Guitar</option>
          <option value={'Water Drop'}>Water Drop</option>
          <option value={'Wood Block'}>Wood Block</option>
          <option value={'Wood Block Single'}>Wood Block Single</option>
          <option value={'Marimba'}>Marimba</option>
          <option value={'Water Flowing'}>Water Flowing</option>
        </Select>
      </FormControl>
    </div>
  );
}
