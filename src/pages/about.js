import React from "react";
import Helmet from 'react-helmet'

export default class About extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <div>
        <Helmet title={`About | ${siteTitle}`} />
        <h1>
          Acerca de {siteTitle}
        </h1>
        <p>
          En este blog comparto informaci&oacute;n interesante sobre algunos proyectos que he hecho.
          Los temas principales de este blog son sobre Electr&oacute;nica, Control, Programaci&oacute;n 
          y Ciberseguridad. Espero que te agrade!
        </p>
        <h2>
          Acerca de m&iacute;
        </h2>
        <p>
          Mi nombre es Maximiliano Valencia y vivo en la ciudad de Celaya, Gto. Estudi&eacute; Ingenier&iacute;a 
          Rob&oacute;tica en la Universidad Polit&eacute;nica de Guanajuato y Maestr&iacute;a en Ciencias con 
          especialidad en Instrumentaci&oacute;n y Control en la Universidad Aut&oacute;noma de Quer&eacute;taro. 
          Actualmente trabajo como Ingeniero de Diseño Electr&oacute;nico en <a href="http://licore.org">LICORE</a> haciendo 
          sistemas embebidos para aplicaciones de Electr&oacute;nica de Potencia y Sistemas de Comunicaciones 
          para Redes El&eacute;ctricas Inteligentes.
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

