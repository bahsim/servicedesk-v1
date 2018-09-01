import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#ffe38d',
    },
  },
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


function FuncPanelCurrent(props) {
  const { classes } = props;
  return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<Paper className={classes.root} elevation={8}>
					<Grid container spacing={0}>
						<Grid item xs={2}></Grid>
						<Grid item xs={3}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="record-status">
									{props.i18n.STATUS}
								</InputLabel>
								<Select
									value={props.status}
									onChange={(event) => props.setFilter(event.target.value)}
									inputProps={{
										name: 'status',
										id: 'record-status',
									}}
								>
									{props.statuses.map((item) => {
										return (
											<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</MuiThemeProvider>
  );
}

FuncPanelCurrent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FuncPanelCurrent);