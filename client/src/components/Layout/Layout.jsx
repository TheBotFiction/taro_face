import React, { Component, Fragment } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types'
// react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from '@material-ui/core'
// @material-ui/icons
// core components
import Header from "./Header/Header.jsx";
import HeaderLinks from "./Header/HeaderLinks.jsx";
import Parallax from "./Parallax/Parallax.jsx";
import Footer from "./Footer/Footer.jsx";
// sections for this page

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class Layout extends Component {
  static propTypes = {
    header: PropTypes.shape({
      color: PropTypes.string,
      scrolledColor: PropTypes.string
    }),
    paralax: PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string
    }),
    additionalInfoSlot: PropTypes.node
  }

  static defaultProps = {
    header: {
      color: 'transparent',
      scrolledColor: 'white'
    },
    paralax: {
      image: require('assets/img/bg4.jpg'),
      title: 'Taro\'s Face',
      subtitle: 'Learn in active way'
    }
  }

  render () {
    const {
      classes,
      header,
      paralax,
      additionalInfoSlot,
      ...rest
    } = this.props;

    return (
      <Fragment>
        <Header
          brand="Taro's Face"
          rightLinks={<HeaderLinks />}
          fixed
          color={header.color}
          changeColorOnScroll={{
            height: 400,
            color: header.scrolledColor
          }}
          {...rest}
        />
        <Parallax image={paralax.image}>
          <div className={classes.container}>
            <Grid container>
              <Grid item>
                <div className={classes.brand}>
                  <h1 className={classes.title}>{paralax.title}</h1>
                  <h3 className={classes.subtitle}>
                    {paralax.subtitle}
                  </h3>
                </div>
              </Grid>
            </Grid>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          {this.props.children}
        </div>
        {additionalInfoSlot}
        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(componentsStyle)(Layout);
