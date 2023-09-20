import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

const VALIDATION_REQUESTS_IDENTIFIER = 'validationRequests';

export type EmailValidationRequestType = {
  email: string;
  result: string;
};
export type EmailValidationRequestContextType = {
  addRequest?: (emailRequest: EmailValidationRequestType) => void;
  emailValidationRequests: EmailValidationRequestType[] | [];
};

export const TrackEmailValidationContext =
  createContext<EmailValidationRequestContextType>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addRequest: (_emailRequest: EmailValidationRequestType) => {},
    emailValidationRequests: [],
  });
export function useTrackEmailValidationContext() {
  return useContext(TrackEmailValidationContext);
}

function TrackEmailValidationContextProvider({ children }: PropsWithChildren) {
  const [emailValidationRequests, setEmailValidationRequests] = useState<
    EmailValidationRequestType[]
  >(() => {
    const storedCount = localStorage.getItem(VALIDATION_REQUESTS_IDENTIFIER);
    return storedCount ? JSON.parse(storedCount) : [];
  });

  function addRequest(emailRequest: EmailValidationRequestType) {
    const updatedValidationRequests = [
      ...emailValidationRequests,
      emailRequest,
    ];

    setEmailValidationRequests(updatedValidationRequests);

    localStorage.setItem(
      VALIDATION_REQUESTS_IDENTIFIER,
      JSON.stringify(updatedValidationRequests),
    );
  }

  return (
    <TrackEmailValidationContext.Provider
      value={{ addRequest, emailValidationRequests }}
    >
      {children}
    </TrackEmailValidationContext.Provider>
  );
}

export default TrackEmailValidationContextProvider;
