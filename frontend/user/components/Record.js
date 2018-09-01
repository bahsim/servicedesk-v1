import React from 'react';
import createReactClass from 'create-react-class';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#0900ff',
    },
  },
});

export default createReactClass({
	
	getInitialState() {
		return {
			_id:	'',
			data: {
				created: moment(new Date()).format('YYYY-MM-DD[T]HH:mm'),
				status: 		'',
				statusView: '',
				clientInfo: '',
				deviceInfo: '',
				componentParts: '',
				footNote: '',
			}
		}
	},
	
	componentDidMount() {
		const { record, status } = this.props;
		if (record) {
			this.setState({
				_id:	record._id,
				data: {
					created: 				record.created,
					status: 				record.status,
					statusView: 		record.statusView,
					clientInfo: 		record.clientInfo,
					deviceInfo: 		record.deviceInfo,
					componentParts: record.componentParts,
					footNote: 			record.footNote,
				}
			})
		}
		if (status) {
			const { data } = this.state;
			this.setState({
				data: { ...data, ...{
					status: 		status.id,
					statusView: status.name,
				}}
			});
		}
	},
	
	putData(field, value) {
		if (!this.props.save && !this.props.change) {
			return;
		}
		const data = this.state.data;
		let newData = {};
		newData[field] = value;
		if (field === 'status') {
			this.props.statuses.forEach((item) => {
				if (item.id === value) {
					newData.statusView = item.name;
				}
			});
		}
		this.setState({
			data: { ...data, ...newData}
		});
		this.props.preSave(newData);
	},
	
	render() {
		const { 
			i18n,
			statuses, 
			print,
			save,
			change,
			close,
		} = this.props;
		const styleLabel = {
			fontSize:		'14px',
			fontWeight:	700,
		};
		const styleMainDiv = {
			padding:'40px'
		}
		const styleFormControl = {
			paddingBottom:'10px'
		}
		return (
			<MuiThemeProvider theme={theme}>
				<br/>
				<Grid container spacing={0}>
					<Grid item md={3}></Grid>
					<Grid item md={6}>
						<Paper elevation={8}>
							<div style={styleMainDiv}>
								
								<FormControl fullWidth style={styleFormControl}>
									<TextField 
										label={i18n.DATE_TIME}
										value={moment(this.state.data.created).format('DD.MM.YYYY HH:mm')}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
								
								{(save || change) &&
									<FormControl fullWidth style={styleFormControl}>
										<InputLabel htmlFor="record-status">{i18n.STATUS}</InputLabel>
										<Select
											value={this.state.data.status}
											onChange={(e) => this.putData('status', e.target.value)}
											inputProps={{
												name: 'status',
												id: 'record-status',
											}}
										>
											{statuses && statuses.map((item) => {
												return (
													<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
												)
											})}
										</Select>
									</FormControl>
								}
								
								{!save && !change &&
									<FormControl fullWidth style={styleFormControl}>
										<TextField 
											label={i18n.STATUS}
											value={this.state.data.statusView}
										/>
									</FormControl>
								}
								
								<FormControl fullWidth style={styleFormControl}>
									<TextField 
										label={i18n.CLIENT_INFO}
										value={this.state.data.clientInfo}
										onChange={(e) => this.putData('clientInfo', e.target.value)}
									/>
								</FormControl>
								
								<FormControl fullWidth style={styleFormControl}>
									<TextField 
										label={ i18n.DEVICE_INFO }
										value={this.state.data.deviceInfo}
										onChange={(e) => this.putData('deviceInfo', e.target.value)}
									/>
								</FormControl>
								
								<FormControl fullWidth style={styleFormControl}>
									<TextField 
										label={ i18n.COMPONENT_PARTS }
										value={this.state.data.componentParts}
										onChange={(e) => this.putData('componentParts', e.target.value)}
									/>
								</FormControl>
								
								<FormControl fullWidth style={styleFormControl}>
									<TextField 
										label={ i18n.FOOT_NOTE }
										value={this.state.data.footNote}
										onChange={(e) => this.putData('footNote', e.target.value)}
									/>
								</FormControl>
								
								<br/><br/>
								
								{print &&
									<span>
										<Button mini variant="flat" color="primary" 
											onClick={() => print(this.state.data)}
										>
											<PrintIcon />
											<span style={styleLabel}>{i18n.PRINT}</span>
										</Button>
										&nbsp;&nbsp;&nbsp;
									</span>
								}
								{save &&
									<span>
										<Button mini variant="flat" color="primary" 
											onClick={() => save(this.state.data)}
										>
											<CreateIcon />
											<span style={styleLabel}>{i18n.RECORD}</span>
										</Button>
										&nbsp;&nbsp;&nbsp;
									</span>
								}
								{change &&
									<span>
										<Button mini variant="flat" color="primary" 
											onClick={() => change(this.state._id, this.state.data)}
										>
											<SaveIcon />
											<span style={styleLabel}>{i18n.SAVE}</span>
										</Button>
										&nbsp;&nbsp;&nbsp;
									</span>
								}
								{close &&
									<span>
										<Button mini variant="flat" color="primary" 
											onClick={() => close()}
										>
											<CancelIcon />
											<span style={styleLabel}>{i18n.CLOSE}</span>
										</Button>
										&nbsp;&nbsp;&nbsp;
									</span>
								}
								
							</div>
						</Paper>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
});
