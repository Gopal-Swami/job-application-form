import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Box } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import AlertTitle from '@mui/material/AlertTitle';
import {
  isStringField,
  isEmail,
  isPhoneNumber,
  isFileTypeAccepted,
  isValidUrl,
} from '../utils/validators';
import {
  submitApplication,
  clearSubmitFormApplicationState,
} from '../actions/formActions';
import { useDispatch, useSelector } from 'react-redux';
const FormScreen = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [liveInUs, setLiveInUs] = useState('');
  const [gitProfile, setGitProfile] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [aboutYou, setAboutYou] = useState('');
  const [firstNameEmptyFieldError, setFirstNameEmptyFieldError] =
    useState(false);
  const [emailEmptyFieldError, setEmailEmptyFieldError] = useState(false);
  const [gitProfileEmptyFieldError, setGitProfileEmptyFieldError] =
    useState(false);
  const [cvFileEmptyFieldError, setCvFileEmptyFieldError] = useState(false);
  const [aboutYouEmptyFieldError, setAboutYouEmptyFieldError] = useState(false);
  const [liveInUsEmptyFieldError, setLiveInUsEmptyFieldError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const submitApplicationState = useSelector(
    (state) => state.submitApplicationState
  );
  const { loading, success, error, applicationData } = submitApplicationState;
  // Application submit action to submit the data to the end point
  const submitJobApplication = () => {
    if (firstName === '') {
      setFirstNameEmptyFieldError(true);
    }
    if (email === '') {
      setEmailEmptyFieldError(true);
    }
    if (gitProfile === '') {
      setGitProfileEmptyFieldError(true);
    }
    if (cvFile === null) {
      setCvFileEmptyFieldError(true);
    }
    if (aboutYou === '') {
      setAboutYouEmptyFieldError(true);
    }
    if (liveInUs === '') {
      setLiveInUsEmptyFieldError(true);
    }

    if (
      firstName !== '' ||
      email !== '' ||
      gitProfile !== '' ||
      cvFile !== null ||
      aboutYou !== '' ||
      liveInUs !== ''
    ) {
      const applicationFormData = new FormData();
      applicationFormData.append('firstName', firstName);
      applicationFormData.append('lastName', lastName);
      applicationFormData.append('email', email);
      applicationFormData.append('phoneNumber', phoneNumber);
      applicationFormData.append('gitProfile', gitProfile);
      applicationFormData.append('file', cvFile);
      if (coverLetterFile !== null) {
        applicationFormData.append('file', coverLetterFile);
      }
      applicationFormData.append('aboutYou', aboutYou);
      applicationFormData.append('liveInUs', liveInUs);
      dispatch(submitApplication(applicationFormData));
    }
  };

  // Reusable method to clear the form fields on clear and successful form submission actions.
  const setFormFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setGitProfile('');
    setCvFile(null);
    setCoverLetterFile(null);
    setAboutYou('');
    setLiveInUs('');
    setFirstNameEmptyFieldError(false);
    setEmailEmptyFieldError(false);
    setGitProfileEmptyFieldError(false);
    setAboutYouEmptyFieldError(false);
    setLiveInUsEmptyFieldError(false);
    setCvFileEmptyFieldError(false);
  };
  // Method to set the all the fields  to empty on click and show message or form cleared
  const clearFormFields = () => {
    setFormFields();
    setOpenAlert(true);
    setAlertSeverity('info');
    setAlertTitle('Info');
    setAlertMessage('Form Cleared');
    setTimeout(() => {
      setOpenAlert(false);
    }, 500);
    dispatch(clearSubmitFormApplicationState());
  };

  // To check the success and error of form submission
  useEffect(() => {
    if (success) {
      setOpenAlert(true);
      setAlertTitle('Success');
      setAlertMessage(`Application submitted successfully.`);
      setAlertSeverity('success');
      setFormFields();
    } else if (error) {
      setOpenAlert(true);
      setAlertTitle('Error');
      setAlertSeverity('error');
      setAlertMessage(error);
    }
  }, [success, error]);
  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <Collapse in={openAlert} sx={{ mb: 2, ml: 2 }}>
            <Alert
              severity={alertSeverity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>{alertTitle}</AlertTitle>
              {alertMessage}
              <br />
              {applicationData &&
                `Your application id is : ${applicationData.id}`}
            </Alert>
          </Collapse>
          <TextField
            fullWidth
            label="First name*"
            id="first-name"
            nalastme="first-name"
            sx={{ m: 1 }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setFirstNameEmptyFieldError(false);
            }}
            error={
              (firstName.length !== 0 && !isStringField(firstName)) ||
              firstNameEmptyFieldError
            }
            helperText={
              firstName.length !== 0 && !isStringField(firstName)
                ? 'First name cannot contain numbers or special characters'
                : firstNameEmptyFieldError
                ? 'First name is required'
                : ''
            }
          />

          <TextField
            fullWidth
            label="Last name"
            id="last-name"
            name="last-name"
            sx={{ m: 1 }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastName.length !== 0 && !isStringField(lastName)}
            helperText={
              lastName.length !== 0 && !isStringField(lastName)
                ? 'Last name cannot contain numbers or special characters'
                : ''
            }
          />

          <TextField
            fullWidth
            label="Email*"
            id="email"
            name="email"
            sx={{ m: 1 }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailEmptyFieldError(false);
            }}
            error={
              (email.length !== 0 && !isEmail(email)) || emailEmptyFieldError
            }
            helperText={
              email.length !== 0 && !isEmail(email)
                ? 'Please provide valid email'
                : emailEmptyFieldError
                ? 'Email is required'
                : ''
            }
          />
          <TextField
            fullWidth
            label="Phone number"
            id="phone-number"
            name="phone-number"
            sx={{ m: 1 }}
            inputProps={{
              maxLength: 10,
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={phoneNumber.length !== 0 && !isPhoneNumber(phoneNumber)}
            helperText={
              phoneNumber.length !== 0 && !isPhoneNumber(phoneNumber)
                ? 'Please provide valid phone number'
                : ''
            }
          />
          <TextField
            fullWidth
            label="Git profile*"
            id="git-profile"
            name="git-profile"
            sx={{ m: 1 }}
            value={gitProfile}
            onChange={(e) => {
              setGitProfile(e.target.value);
              setGitProfileEmptyFieldError(false);
            }}
            error={
              (gitProfile.length !== 0 && !isValidUrl(gitProfile)) ||
              gitProfileEmptyFieldError
            }
            helperText={
              gitProfile.length !== 0 && !isValidUrl(gitProfile)
                ? 'Please provide valid git profile'
                : gitProfileEmptyFieldError
                ? 'Git profile is required'
                : ''
            }
          />

          <FormLabel
            fullWidth
            id="upload-cv"
            sx={{
              m: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Input
              fullWidth
              id="Cv"
              sx={{ display: 'none' }}
              name="Cv"
              type="file"
              onChange={(e) => {
                setCvFile(e.target.files[0]);
                isFileTypeAccepted('Cv');
                setCvFileEmptyFieldError(false);
              }}
            />
            <span>
              {cvFile !== null && !isFileTypeAccepted('Cv') ? (
                <span style={{ color: '#ff1744' }}>
                  Please Upload Doc, Docx and PDF file only
                </span>
              ) : cvFileEmptyFieldError ? (
                <span style={{ color: '#ff1744' }}>Please upload CV</span>
              ) : cvFile !== null && isFileTypeAccepted('Cv') ? (
                'CV Uploaded'
              ) : (
                'Upload CV'
              )}
            </span>
            <Button
              variant="contained"
              endIcon={<UploadFileIcon />}
              component="span"
            >
              Choose File
            </Button>
          </FormLabel>

          <FormLabel
            fullWidth
            id="upload-cover-letter"
            sx={{
              m: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Input
              fullWidth
              id="cover-letter"
              sx={{ display: 'none' }}
              name="cover-letter"
              type="file"
              onChange={(e) => {
                setCoverLetterFile(e.target.files[0]);
                isFileTypeAccepted('cover-letter');
              }}
            />
            <span>
              {coverLetterFile !== null &&
              !isFileTypeAccepted('cover-letter') ? (
                <span style={{ color: '#ff1744' }}>
                  Please Upload Doc, Docx and PDF file only
                </span>
              ) : coverLetterFile !== null &&
                isFileTypeAccepted('cover-letter') ? (
                'Cover Letter Uploaded'
              ) : (
                'Upload Cover Letter'
              )}
            </span>
            <Button
              variant="contained"
              endIcon={<UploadFileIcon />}
              component="span"
            >
              Choose file
            </Button>
          </FormLabel>

          <TextField
            fullWidth
            label="About you*"
            id="about-you"
            name="about-you"
            multiline
            rows={5}
            sx={{ m: 1 }}
            value={aboutYou}
            onChange={(e) => {
              setAboutYou(e.target.value);
              setAboutYouEmptyFieldError(false);
            }}
            error={aboutYouEmptyFieldError}
            helperText={
              aboutYouEmptyFieldError
                ? 'Please provide few lines about you '
                : ''
            }
          />
          <FormLabel id="live-in-us" sx={{ m: 1 }}>
            Do you live in the US?*
            {liveInUsEmptyFieldError ? (
              <span style={{ color: '#ff1744' }}>Required</span>
            ) : (
              ''
            )}
          </FormLabel>
          <RadioGroup
            sx={{ m: 1 }}
            row
            aria-labelledby="live-in-us"
            name="live-in-us"
            value={liveInUs}
            onChange={(e) => {
              setLiveInUs(e.target.value);
              setLiveInUsEmptyFieldError(false);
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            variant="contained"
            sx={{ width: '25%' }}
            onClick={submitJobApplication}
          >
            {loading ? (
              <CircularProgress sx={{ color: 'text.primary' }} />
            ) : (
              'Submit'
            )}
          </Button>
          <Button
            variant="contained"
            sx={{ width: '25%' }}
            onClick={clearFormFields}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormScreen;
