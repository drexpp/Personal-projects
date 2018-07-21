import React, {Component} from "react";
import Link from "gatsby-link"
import arrowle from "../../public/static/img/arrows/arrow-le.svg"

export default class NavigationLeft extends Component{
  render(){
    let page = ''
    let classType = ''
    if(this.props.page === 'index'){
      page = '/'
      classType = "navigation-le"
    }else if(this.props.page === '2'){
      page = '/page-2'
      classType = "navigation-le-fix"
    }
    return (
      <Link className={classType} to={page}>
      <img className="arrow" src={arrowle} />
      </Link>
    )
  }
}
