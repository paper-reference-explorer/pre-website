export type PaperKey = string;

export interface Paper {
  key: PaperKey
  authors: string
  title: string
  year: number
}

export interface GraphPaper {
  authors: string
  title: string
  dateCreated: string
  referencedNTimesGlobal: number
  referencedNTimesLocal: number
  referencesKeys: string[]
}

export interface YearData {
  [year: string]: {
    [key: string]: GraphPaper
  }
}

export interface Node extends Paper {
  dateCreated: string
  referencedNTimesGlobal: number
  referencedNTimesLocal: number
}

export interface Link {
  source: PaperKey
  target: PaperKey
}

interface ExampleData {
  addedPapersExample: Paper[]
  graphPapersExample: YearData[]
  nodesData: Node[]
  linksData: Link[]
}

const addedPapersExample: Paper[] = [
  {
    key: 'A_my', authors: 'A et al.', title: 'My first paper', year: 2018,
  },
  {
    key: 'B_friendly', authors: 'B et al.', title: 'Friendly paper', year: 2018,
  },
  {
    key: 'C_another', authors: 'C et al.', title: 'Another friendly paper', year: 2016,
  },
];

const graphPapersExample: YearData[] = [
  {
    2018: {
      A_my: {
        authors: 'A et al.',
        title: 'My first paper',
        dateCreated: '2018-09-01',
        referencedNTimesGlobal: 0,
        referencedNTimesLocal: 0,
        referencesKeys: [
          'D_old',
        ],
      },
      B_friendly: {
        authors: 'B et al.',
        title: 'Friendly paper',
        dateCreated: '2018-04-23',
        referencedNTimesGlobal: 5,
        referencedNTimesLocal: 0,
        referencesKeys: [
          'D_old',
          'E_older',
        ],
      },
    },
  },
  {
    2017: {},
  },
  {
    2016: {
      F_young: {
        authors: 'F et al.',
        title: 'Young paper',
        dateCreated: '2016-02-16',
        referencedNTimesGlobal: 37,
        referencedNTimesLocal: 1,
        referencesKeys: [],
      },
      C_another: {
        authors: 'C et al.',
        title: 'Another friendly paper',
        dateCreated: '2016-12-05',
        referencedNTimesGlobal: 8,
        referencedNTimesLocal: 0,
        referencesKeys: [
          'F_young',
        ],
      },
    },
  },
  {
    2015: {},
  },
  {
    2014: {},
  },
  {
    2013: {
      D_old: {
        authors: 'D et al.',
        title: 'Old paper',
        dateCreated: '2013-04-01',
        referencedNTimesGlobal: 236,
        referencedNTimesLocal: 2,
        referencesKeys: [],
      },
    },
  },
  {
    2012: {
      E_older: {
        authors: 'E et al.',
        title: 'Older paper',
        dateCreated: '2012-08-13',
        referencedNTimesGlobal: 412,
        referencedNTimesLocal: 1,
        referencesKeys: [],
      },
    },
  },
];

const nodesData: Node[] = [
  {
    key: 'A_my',
    authors: 'A et al.',
    title: 'My first paper',
    dateCreated: '2018-09-01',
    referencedNTimesGlobal: 0,
    referencedNTimesLocal: 0,
    year: 2018,
  },
  {
    key: 'B_friendly',
    authors: 'B et al.',
    title: 'Friendly paper',
    dateCreated: '2018-04-23',
    referencedNTimesGlobal: 5,
    referencedNTimesLocal: 0,
    year: 2018,
  },
  {
    key: 'F_young',
    authors: 'F et al.',
    title: 'Young paper',
    dateCreated: '2016-02-16',
    referencedNTimesGlobal: 37,
    referencedNTimesLocal: 1,
    year: 2016,
  },
  {
    key: 'C_another',
    authors: 'C et al.',
    title: 'Another friendly paper',
    dateCreated: '2016-12-05',
    referencedNTimesGlobal: 8,
    referencedNTimesLocal: 0,
    year: 2016,
  },
  {
    key: 'D_old',
    authors: 'D et al.',
    title: 'Old paper',
    dateCreated: '2013-04-01',
    referencedNTimesGlobal: 236,
    referencedNTimesLocal: 2,
    year: 2013,
  },
  {
    key: 'E_older',
    authors: 'E et al.',
    title: 'Older paper',
    dateCreated: '2012-08-13',
    referencedNTimesGlobal: 412,
    referencedNTimesLocal: 1,
    year: 2012,
  },
];

const linksData: Link[] = [
  { source: 'A_my', target: 'D_old' },
  { source: 'B_friendly', target: 'D_old' },
  { source: 'B_friendly', target: 'E_older' },
  { source: 'C_another', target: 'F_young' },
];

const exampleData: ExampleData = {
  addedPapersExample, graphPapersExample, nodesData, linksData,
};

export default exampleData;
