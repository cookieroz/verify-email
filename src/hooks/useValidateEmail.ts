import { useRef, useState } from 'react';
import fetchRestEndpoint from '../utils/fetchEndpoint';

const VALIDATE_EMAIL_API = 'https://www.disify.com/api/email';
type ValidationResultsType = {
  disposable: boolean;
  dns: boolean;
  domain: string;
  format: boolean;
} | null;

export default function useValidateEmail() {
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [validationResults, setValidationResults] =
    useState<ValidationResultsType>(null);

  const previousEmail = useRef('');

  function fetchValidateEmail(email?: string) {
    fetchRestEndpoint({ url: `${VALIDATE_EMAIL_API}/${email}`, mode: 'cors' })
      .then((response) => {
        setIsFetching(false);
        setValidationResults(response);
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

  return { error, validateEmail, isFetching, validationResults };
}
