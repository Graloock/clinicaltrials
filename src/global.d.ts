declare global {
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