import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/NoteAdd';
import DoneIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';
import Unarchive from '@material-ui/icons/Unarchive';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#fdff00',
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
  logo: {
    marginLeft: 	30,
    marginRight: 	0,
  },
  tabs: {
		marginLeft: 	0,
    marginRight: 	0,
  },
  button: {
    marginLeft: 	0,
    marginRight: 	0,
		marginTop: 		'2%',
		marginBottom:	'2%',
  },
};

function NavBar(props) {
	const styleLabel = {
		fontSize:		'14px',
		fontWeight:	700,
	};
  const { 
		classes, 
		tabIndex,
		onClickTab,
	} = props;
  return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<AppBar position="static" elevation={8}>
					<Toolbar>
						<Grid container spacing={0}>
							<Grid item xs={2}>
								<span style={{color:'white',display:'inline-flex',verticalAlign:'middle'}}>
									<img src="/logo.png" alt="" className={classes.logo} width="130" height="60" />
								</span>
							</Grid>
							<Grid item xs={6}>
								<div style={props.displayMe('registry')}>
									<Tabs className={classes.tabs}
										onChange={onClickTab}
										value={tabIndex} centered
									>
										<Tab label={props.i18n.CURRENT} />
										<Tab label={props.i18n.HISTORY} />
									</Tabs>
								</div>
							</Grid>
							<Grid item xs={4}>
								<div style={props.displayMe('registry')}>
									<div style={props.displayTab(0)}>
										<Button mini variant="flat" color="secondary"
											className={classes.button}
											onClick={() => props.onClickAdd()}
										>
											<AddIcon/>
											<span style={styleLabel}>
												{props.i18n.REGISTER}
											</span>
										</Button>
									</div>
								</div>
								<div style={props.hideMe('registry')}>
									<div style={props.displayMe('editRec')}>
										<Button mini variant="flat" color="secondary"
											className={classes.button}
											onClick={() => props.onClickDone('done')}
										>
											<DoneIcon/>
											<span style={styleLabel}>
												{props.i18n.DONE}
											</span>
										</Button>
										&nbsp;&nbsp;&nbsp;
										<Button mini variant="flat"
											className={classes.button}
											onClick={() => props.onClickDelete('delete')}
										>
											<DeleteIcon/>
											<span style={styleLabel}>
												{props.i18n.DELETE}
											</span>
										</Button>
									</div>
									<div style={props.displayMe('viewRec')}>
										<Button mini variant="flat" color="secondary"
											className={classes.button}
											onClick={() => props.onClickRestore('restore')}
										>
											<Unarchive/>
											<span style={styleLabel}>
												{props.i18n.RESTORE}
											</span>
										</Button>
									</div>
								</div>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
  );
}

export default withStyles(styles)(NavBar);