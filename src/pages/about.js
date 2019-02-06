import React from "react";
import Helmet from 'react-helmet'

export default class About extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <div>
        <Helmet title={`About | ${siteTitle}`} />
        <h1>
          About {siteTitle}
        </h1>
        <p>
          En este blog comparto informaci&oacute;n interesante sobre algunos proyectos que he hecho.
          Los temas principales de este blog son sobre Electr&oacute;nica, Control, Programaci&oacute;n 
          y Ciberseguridad. Espero que te agrade!
        </p>
        <h2>
          About me
        </h2>
        <p>
          Mi nombre es Maximiliano Valencia y vivo en Quer&eacute;taro. Estudi&eacute; Ingenier&iacute;a Rob&oacute;tica
          en la Universidad Polit&eacute;nica de Guanajuato y Maestr&iacute;a en Ciencia en Instrumentaci&oacute;n y 
          Control en la Universidad Aut&oacute;noma de Quer&eacute;taro.
        </p>
      </div>
    )
  }
}

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

