import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { ApplicationMigration, Migrator } from '../MigrationDashboardPage/mockData';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2, 0),
    minWidth: '100%',
  },
  summary: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

interface StartMigrationDialogProps {
  open: boolean;
  onClose: () => void;
  applications: ApplicationMigration[];
  migrators: Migrator[];
}

const steps = ['Select Application', 'Choose Migrator', 'Review & Start'];

export const StartMigrationDialog = ({
  open,
  onClose,
  applications,
  migrators,
}: StartMigrationDialogProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [selectedMigrator, setSelectedMigrator] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const app = applications.find(a => a.id === selectedApp);
  const migrator = migrators.find(m => m.id === selectedMigrator);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedApp('');
    setSelectedMigrator('');
    setSubmitted(false);
    onClose();
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return !!selectedApp;
      case 1:
        return !!selectedMigrator;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              Select an application to migrate:
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Application</InputLabel>
              <Select
                value={selectedApp}
                onChange={e => setSelectedApp(e.target.value as string)}
                label="Application"
              >
                {applications.map(a => (
                  <MenuItem key={a.id} value={a.id}>
                    <Box>
                      <Typography variant="body1">{a.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {a.sourceTechnology} → {a.targetTechnology}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {app && (
              <Paper variant="outlined" className={classes.summary}>
                <Typography variant="subtitle2">{app.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {app.description}
                </Typography>
                <Box mt={1}>
                  <Chip label={app.sourceTechnology} size="small" className={classes.chip} />
                  <Chip label="→" size="small" variant="outlined" className={classes.chip} />
                  <Chip label={app.targetTechnology} size="small" color="primary" className={classes.chip} />
                  <Chip label={`Complexity: ${app.complexity}`} size="small" className={classes.chip} />
                </Box>
              </Paper>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              Choose a migrator to perform the migration:
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Migrator</InputLabel>
              <Select
                value={selectedMigrator}
                onChange={e => setSelectedMigrator(e.target.value as string)}
                label="Migrator"
              >
                {migrators.map(m => (
                  <MenuItem key={m.id} value={m.id}>
                    <Box>
                      <Typography variant="body1">{m.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {m.type} · {m.avgDuration}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {migrator && (
              <Paper variant="outlined" className={classes.summary}>
                <Typography variant="subtitle2">{migrator.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {migrator.description}
                </Typography>
                <Box mt={1}>
                  <Chip label={`Type: ${migrator.type}`} size="small" className={classes.chip} />
                  <Chip label={`Skill: ${migrator.skill}`} size="small" className={classes.chip} />
                  {migrator.successRate && (
                    <Chip
                      label={`${migrator.successRate}% success rate`}
                      size="small"
                      color="primary"
                      className={classes.chip}
                    />
                  )}
                </Box>
              </Paper>
            )}
          </Box>
        );

      case 2:
        return (
          <Box>
            {submitted ? (
              <Alert severity="success">
                Migration started successfully! {app?.name} is now being migrated using{' '}
                {migrator?.name}. Track progress on the dashboard.
              </Alert>
            ) : (
              <>
                <Typography variant="body1" gutterBottom>
                  Review and confirm your migration:
                </Typography>
                <Paper variant="outlined" className={classes.summary}>
                  <Typography variant="subtitle1" gutterBottom>
                    Migration Summary
                  </Typography>
                  <Box mb={1}>
                    <Typography variant="body2">
                      <strong>Application:</strong> {app?.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Source:</strong> {app?.sourceTechnology}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Target:</strong> {app?.targetTechnology}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Complexity:</strong> {app?.complexity}
                    </Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography variant="body2">
                      <strong>Migrator:</strong> {migrator?.name} ({migrator?.type})
                    </Typography>
                    <Typography variant="body2">
                      <strong>Skill:</strong> {migrator?.skill}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Est. Duration:</strong> {migrator?.avgDuration}
                    </Typography>
                  </Box>
                  <Alert severity="info" style={{ marginTop: 8 }}>
                    This will create a TaskGroup in Konveyor Hub and dispatch the{' '}
                    {migrator?.name} addon to process the migration. A new branch will be
                    created in the source repository with the migrated code.
                  </Alert>
                </Paper>
              </>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Start Migration</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={2}>{renderStepContent()}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {activeStep > 0 && !submitted && (
          <Button onClick={handleBack}>Back</Button>
        )}
        {!submitted && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {activeStep === steps.length - 1 ? 'Start Migration' : 'Next'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
