import gql from 'graphql-tag'

export const INDEX_TERM_QUERY = gql`
  query indexTerms {
    terms {
      id
      term
    }
  }
`

export const CREATE_PAPER_SHEET_MUTATION: string = gql`
mutation createPaperSheet($questions: [QuestionInputObject!]!) {
  createPaperSheet(questions: $questions) {
    paperSheet {
      id
    }
    code
    errors
  }
}
`