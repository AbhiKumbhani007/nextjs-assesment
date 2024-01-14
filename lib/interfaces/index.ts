export interface FirstAccordion {
  data: {
    accordionCollection: {
      items: Items[];
    };
  };
}

export interface Link {
  linkText: string;
  href: string;
}

export interface Accordion {
  data: {
    accordion: {
      __typename: string;
      sys: {
        id: string;
      };
      heading: string;
      accordionItemsCollection: {
        items: Items[];
      };
    };
  };
}

interface Items {
  __typename: string;
  sys: {
    id: string;
  };
}
