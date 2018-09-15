
import React, { Component } from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, Typography } from '@material-ui/core'
// core components
import Header from 'components/UIKit/Header/Header'
import HeaderLinks from 'components/UIKit/Header/HeaderLinks'
import Footer from 'components/UIKit/Footer/Footer'
import Button from 'components/UIKit/CustomButtons/Button'
import Card from 'components/UIKit/Card/Card'
import CardBody from 'components/UIKit/Card/CardBody'
import CardHeader from 'components/UIKit/Card/CardHeader'
import CardFooter from 'components/UIKit/Card/CardFooter'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../../firebase'

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage'

import image from 'assets/img/bg7.jpg'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

class SigninComponent extends Component {
  constructor (props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden'
    }
  }
  componentDidMount () {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: '' })
      }.bind(this),
      700
    )
  }
  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Taro's Face"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <Grid container justify="center">
              <Grid item xs={12} s8={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <Typography variant="headline" color="inherit">
                        Sign In
                      </Typography>
                    </CardHeader>
                    <p className={classes.divider}>Get started with</p>
                    <CardBody>
                      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </Grid>
            </Grid>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    )
  }
}

export default withStyles(loginPageStyle)(SigninComponent)
