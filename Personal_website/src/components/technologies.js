import React from 'react'
import js_logo from "../../public/static/img/js.svg"
import node_logo from "../../public/static/img/node.svg"
import java_logo from "../../public/static/img/java.svg"
import react_logo from "../../public/static/img/react.svg"
import spring_logo from "../../public/static/img/spring.svg"
import python_logo from "../../public/static/img/python.png"
import docker_logo from "../../public/static/img/docker.svg"
import algo_logo from "../../public/static/img/algorithms.png"
import ReactTooltip from 'react-tooltip'

const Technologies = () => (

      <ul className="list-group list-group-flush">

        <li className="list-group-item">
          <img data-tip="Javascript" src={js_logo} alt="js"/>
          <img data-tip="Node.js" src={node_logo} alt="node"/>
          <img data-tip="Java" src={java_logo} alt="java"/>
          <img data-tip="React" src={react_logo} alt="react"/>
          <img data-tip="Spring core" src={spring_logo} alt="spring"/>
          <img data-tip="Python" src={python_logo} alt="python"/>
          <img data-tip="Docker" src={docker_logo} alt="docker"/>
          <img data-tip="Algorithms" src={algo_logo} alt="algo"/>
        </li>
        <ReactTooltip effect="solid" />
      </ul>
    )

export default Technologies;
