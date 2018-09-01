import React from 'react';
import createReactClass from 'create-react-class';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

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
  button: {
		marginTop: 		'2%',
		marginBottom:	'1%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
};


const FuncPanelHistory = createReactClass({
	getInitialState() {
		return {
			date1: '',
			date2: '',
		}
	},
  componentDidMount() {
		this.setState({
			date1: this.props.period[0],
			date2: this.props.period[1],
		})
	},
	refresh() {
		const { date1, date2 } = this.state;
		this.props.setFilter(date1, date2);
	},
	render() {
		const { classes } = this.props;
		const styleLabel = {
			fontSize:		'14px',
			fontWeight:	700,
		};
		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<Paper className={classes.root} elevation={8}>
						<Grid container spacing={0}>
							<Grid item xs={2}></Grid>
							<Grid item xs={2}>
								<FormControl className={classes.formControl}>
									<TextField
										label={this.props.i18n.FROM}
										type="date"
										value={this.state.date1}
										onChange={(e) => this.setState({ date1: e.target.value })}
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={2}>
								<FormControl className={classes.formControl}>
									<TextField
										label={this.props.i18n.TO}
										type="date"
										value={this.state.date2}
										onChange={(e) => this.setState({ date2: e.target.value })}
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={2}>
								<FormControl className={classes.formControl}>
									<Button 
										variant="flat" 
										onClick={() => this.refresh()}
										className={classes.button} 
										color="primary"
									>
										<RefreshIcon/>
										<span style={styleLabel}>
											{this.props.i18n.REFRESH}
										</span>
									</Button>
								</FormControl>
							</Grid>
						</Grid>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
});

export default withStyles(styles)(FuncPanelHistory);