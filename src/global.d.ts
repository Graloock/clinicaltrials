declare global {
  interface Data {
    nextPageToken: string;
    studies: Trial[];
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