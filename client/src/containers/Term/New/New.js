/**
 * @flow
 */
import React, { Component } from 'react';
import type { Node } from 'react';
import type { TermType } from 'types';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { TermCreate } from 'components/Term';

const TermCreateContainer = () => {
  return (<TermCreate />)
};

export default TermCreateContainer;
