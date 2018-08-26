/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import type { TermListItem } from 'types'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

type Props = {
  terms: TermListItem[]
}

class TermList extends PureComponent<Props, *> {
  render() {
    const termItems = this.props.terms.map((term, i) => {
      return (
        <TableRow key={i}>
          <TableCell style={{ width: '20%' }}>
            <Link to={`/terms/${term.id}`}>
              {term.term}
            </Link>
          </TableCell>
          <TableCell>
            <p><strong>Meaning:</strong> {term.meaning}</p>
            <p>
              <strong>Sample:</strong><br/>
              <ul>
                {
                  term.samplePhrases.map((phrase, i) =>
                    <li key={i}>{phrase.phrase}</li>
                  )
                }
              </ul>
            </p>
          </TableCell>
        </TableRow>
      )
    })
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Term</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {termItems}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default TermList
