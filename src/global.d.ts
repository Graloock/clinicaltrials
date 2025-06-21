declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var mongoose: any; // Must be var and any, sorry xD

  interface Data {
    studies: Trial[];
    nextPageToken: string;
    query?: string;
  }

  interface Trial {
    protocolSection: {
      identificationModule: {
        briefTitle: string;
        nctId: string;
      };
      conditionsModule: {
        conditions: string[];
      };
    };
  }
}

export {};