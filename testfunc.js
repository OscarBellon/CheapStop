function ParsearUbcicacion(calle, codigo) {
    const calleParseada = calle.replace(/\s+/g, "+");
    const resultado = calleParseada.concat(",+");
    return resultado.concat(codigo);
  }
  