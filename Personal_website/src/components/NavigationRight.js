import React, {Component} from "react";
import Link from "gatsby-link"
import arrowri from "../../public/static/img/arrows/arrow-ri.svg"

export default class NavigationRight extends Component{
  render(){
    const page = "/page-"+this.props.page;
    return (
      <Link className="navigation-ri" to={page}>
      <img className="arrow" src={arrowri} />
      </Link>
    )
  }
}
