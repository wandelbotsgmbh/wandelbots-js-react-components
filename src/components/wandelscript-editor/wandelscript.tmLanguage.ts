export default {
  $schema:
    "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  name: "wandelscript",
  patterns: [
    {
      include: "#keywords",
    },
    {
      include: "#strings",
    },
    {
      include: "#comments",
    },
    {
      include: "#functions",
    },
  ],
  repository: {
    keywords: {
      patterns: [
        {
          name: "keyword.control.flow.wandelscript",
          match:
            "\\b(move|via|to|interrupt|def|False|True|for|if|else|elif|while|return|switch|activate|deactivate|print|and|or|not)\\b",
        },
      ],
    },
    strings: {
      name: "string.quoted.double.wandelscript",
      begin: '"',
      end: '"',
      patterns: [
        {
          name: "constant.character.escape.wandelscript",
          match: "\\\\.",
        },
      ],
    },
    comments: {
      patterns: [
        {
          begin: "#",
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.wandelscript" },
          },
          end: "$",
          name: "comment.line.number-sign.wandelscript",
        },
      ],
    },
    functions: {
      patterns: [
        {
          match: "[a-zA-Z_-]+\\(",
          name: "entity.name.function.wandelscript",
        },
      ],
    },
  },
  scopeName: "source.wandelscript",
}
