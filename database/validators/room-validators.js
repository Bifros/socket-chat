exports.nameValidation = (name) => name.match(/[a-zA-z0-9_!?.#@*()[]\s]{2,30}/g);
