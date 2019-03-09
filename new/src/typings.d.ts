type PaperKey = string;
// export type ... does not work!
export { PaperKey };

export interface Paper {
  key: PaperKey
  authors: string
  title: string
  year: number
}

interface GraphPaper {
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

export interface SearchResult {
  id: string
  fields: {
    authors: string
    title: string
    year: string
  }
}

export interface SearchItem {
  paper: {
    key: string
    year: string
    authors: string
    title: string
  }
  description: string
}
