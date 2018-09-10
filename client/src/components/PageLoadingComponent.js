import React from 'react'

const PageLoadingComponent = ({isLoading, error}) => {
  if (isLoading) {    // Handle the loading state
    return <div>Loading...</div>
  } else if (error) { // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>
  } else {
    return null
  }
}

export default PageLoadingComponent