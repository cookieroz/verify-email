import { useState } from 'react';

const VALIDATION_REQUESTS_IDENTIFIER = 'validationRequests';
type EmailValidationRequestType = {
  email: string;
  result: string;
};

export default function useTrackEmailValidation() {
  const [validationRequests, setValidationRequests] = useState<
    EmailValidationRequestType[]
  >(() => {
    const storedCount = localStorage.getItem(VALIDATION_REQUESTS_IDENTIFIER);
    return storedCount ? JSON.parse(storedCount) : [];
  });

  function addRequest(emailRequest: EmailValidationRequestType) {
    const updatedValidationRequests = [...validationRequests, emailRequest];

    setValidationRequests(updatedValidationRequests);

    localStorage.setItem(
      VALIDATION_REQUESTS_IDENTIFIER,
      JSON.stringify(updatedValidationRequests),
    );
  }

  return { addRequest, validationRequests };
}
