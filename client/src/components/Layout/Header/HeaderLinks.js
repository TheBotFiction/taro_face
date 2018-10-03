/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import CloudDownload from '@material-ui/icons/CloudDownload'

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Button from "../CustomButtons/Button";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Learn"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/terms/new" className={classes.dropdownLink}>
              New term
            </Link>,
            <Link to="/papersheets/new" className={classes.dropdownLink}>
              New PaperSheet
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Take Exam
        </Button>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
