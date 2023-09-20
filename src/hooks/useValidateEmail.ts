import { useRef, useState } from 'react';
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
  const [error, setError] = useState('');
  const [displayResults, setDisplayResults] = useState<DisplayResultsType>(
    DEFAULT_DISPLAY_RESULTS,
  );
  const [isFetching, setIsFetching] = useState(false);

  const previousEmail = useRef('');

  function resetErrorsAndDisplayResults(displayResults: DisplayResultsType) {
    setError('');
    setDisplayResults(displayResults);
  }

  function formatValidationResults(validationResults: ValidationResultsType) {
    const { disposable, dns, format } = validationResults || {};

    switch (true) {
      case !format:
        return setError('Invalid email format.');
      case disposable:
        return resetErrorsAndDisplayResults({
          color: 'warning',
          helperText: 'Is a disposable email.',
        });
      case !dns:
        return setError('Not a valid email.');
      case dns:
        return resetErrorsAndDisplayResults({
          color: 'success',
          helperText: 'Is a valid email.',
        });
      default:
        return resetErrorsAndDisplayResults(DEFAULT_DISPLAY_RESULTS);
    }
  }

  function fetchValidateEmail(email?: string) {
    fetchRestEndpoint({ url: `${VALIDATE_EMAIL_API}/${email}`, mode: 'cors' })
      .then((response) => {
        setIsFetching(false);
        formatValidationResults(response);
      })
      .catch((error) => {
        setError('Error validating email: ' + error);
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
