export default {
  View: `
example:
  root: true
  children:
    - style:
        borderWidth: 1
        borderColor: grey
      children:
        - style:
            backgroundColor: lightgrey
            height: 20
  `.trim(),

  Text: `
example:
  root: true
  children:
    - style:
        borderWidth: 1
        borderColor: grey
      children:
        - text:
            content: hello
  `.trim(),

  Icon: `
example:
  root: true
  children:
    - style:
        borderWidth: 1
        borderColor: grey
      children:
        - icon:
            name: chevron-right
  `.trim(),

  Link: `
example:
  root: true
  children:
    - onPress:
        linkTo: example2
      style:
        borderWidth: 1
        borderColor: grey
      children:
        - text:
            content: hello
example2:
  children:
    - onPress:
        linkTo: example
      style:
        borderWidth: 1
        borderColor: grey
      children:
        - text:
            content: world
  `.trim(),

  Layout: `
example:
  root: true
  children:
    - style:
        borderWidth: 1
        borderColor: grey
        height: 100
        flexDirection: row
      children:
        - style:
            backgroundColor: lightgrey
            flex: 1
        - style:
            backgroundColor: brown
            flex: 2

  `.trim(),

  Alias: `
_hr: &hr
  style:
    height: 1
    backgroundColor: lightgrey

example:
  root: true
  children:
    - style:
      children:
        - text:
            content: section 1
        - *hr
        - text:
            content: section 2
        - *hr
        - text:
            content: section 3
  `.trim(),

  Merge: `
_default_style: &default_style
  height: 60
  backgroundColor: lightgrey
  alignItems: center
  justifyContent: center

example:
  root: true
  children:
    - style:
        <<: *default_style
      children:
        - text:
            content: Default
    - style:
        <<: *default_style
        backgroundColor: grey
      children:
        - text:
            content: Custom
  `.trim(),
};
