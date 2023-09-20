import { useRef, useState } from 'react';
import {
  EmailValidationRequestType,
  useTrackEmailValidationContext,
} from '../contexts/TrackEmailValidationContextProvider';
import fetchRestEndpoint from '../utils/fetchEndpoint';

const DEFAULT_DISPLAY_RESULTS = {
  color: '',
  helperText: '',
};
const VALIDATE_EMAIL_API = 'https://www.disify.com/api/email';
type DisplayResultsType = {
  color?: string;
  helperText: string;
};
type ValidationResultsType = {
  disposable: boolean;
  dns: boolean;
  domain: string;
  format: boolean;
} | null;

export default function useValidateEmail() {
  const { addRequest } = useTrackEmailValidationContext();
  const [error, setError] = useState('');
  const [displayResults, setDisplayResults] = useState<DisplayResultsType>(
    DEFAULT_DISPLAY_RESULTS,
  );
  const [isFetching, setIsFetching] = useState(false);

  const previousEmail = useRef('');

  function trackEmailValidationRequest(
    emailRequest: EmailValidationRequestType,
  ) {
    if (addRequest) {
      addRequest(emailRequest);
    }
  }

  function resetErrorsAndDisplayResults(displayResults: DisplayResultsType) {
    setError('');
    setDisplayResults(displayResults);
    return displayResults;
  }

  function formatValidationResults(validationResults: ValidationResultsType) {
    const { disposable, dns, format } = validationResults || {};
    let resultsText = '';

    switch (true) {
      case !format:
        resultsText = 'Invalid email format.';
        setError(resultsText);
        return resultsText;
      case disposable:
        resultsText = 'Is a disposable email.';
        resetErrorsAndDisplayResults({
          color: 'warning',
          helperText: resultsText,
        });
        return resultsText;
      case !dns:
        resultsText = 'Not a valid email.';
        setError(resultsText);
        return resultsText;
      case dns:
        resultsText = 'Is a valid email.';
        resetErrorsAndDisplayResults({
          color: 'success',
          helperText: resultsText,
        });
        return resultsText;
      default:
        resetErrorsAndDisplayResults(DEFAULT_DISPLAY_RESULTS);
        return resultsText;
    }
  }

  function fetchValidateEmail(email: string) {
    fetchRestEndpoint({ url: `${VALIDATE_EMAIL_API}/${email}`, mode: 'cors' })
      .then((response) => {
        setIsFetching(false);
        const resultsText = formatValidationResults(response);
        trackEmailValidationRequest({ email, result: resultsText });
      })
      .catch((error) => {
        const errorMessage = 'Error validating email: ' + error;
        setError(errorMessage);
        trackEmailValidationRequest({ email, result: errorMessage });
        setIsFetching(false);
      });
  }

  function validateEmail(email?: string) {
    if (email === previousEmail.current) {
      return;
    }

    if (!email) {
      return setError('No email provided');
    }

    setIsFetching(true);
    previousEmail.current = email;

    fetchValidateEmail(email);
  }

  return {
    error,
    validateEmail,
    displayResults,
    isFetching,
  };
}
