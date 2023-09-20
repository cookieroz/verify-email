type FetchRestEndpointTypes = {
  method?: string;
  url: string;
  [options: string]: unknown;
};

export default async function fetchRestEndpoint({
  method = 'GET',
  url,
  ...options
}: FetchRestEndpointTypes) {
  const endpointResponse = await fetch(url, {
    method,
    ...options,
  });

  return endpointResponse?.json();
}
