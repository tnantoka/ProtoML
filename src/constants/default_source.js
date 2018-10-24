export default `

_header_style: &header_style
  height: 60
  backgroundColor: lightgrey
  alignItems: center
  justifyContent: center

_home_list_item: &home_list_item
  onPress:
    linkTo: source
  style:
    height: 64
    padding: 10
    flexDirection: row
    width: 100%
  children:
    - style:
        height: 44
        width: 44
        backgroundColor: grey
        marginRight: 10
    - style:
      children:
        - text:
            content: Name
        - text:
            content: '2018-11-01'
_hr: &hr
  style:
    height: 1
    backgroundColor: lightgrey

home:
  root: true
  children:
    - style:
        <<: *header_style
      children:
        - text:
            content: Protoypes
    - style:
        flex: 1
      children:
        - *home_list_item
        - *hr
        - *home_list_item
        - *hr
        - *home_list_item
        - *hr
    - style:
        width: 100%
        height: 50
        position: absolute
        bottom: 0
        backgroundColor: grey
        alignItems: center
        justifyContent: center
      comment: Show the ad.
      children:
        - text:
            content: Ad
            style:
              color: white

_source_header: &source_header
  style:
    <<: *header_style
    flexDirection: row
  children:
    - text:
        content: Name
    - onPress:
        linkTo: home
      style:
        width: 30
        position: absolute
        left: 10
      children:
        - icon:
            name: chevron-left
            size: 20

_source_button_group_style: &source_button_group_style
  marginHorizontal: 10
  flexDirection: row
  alignItems: center
  marginTop: 10

_source_button_style: &source_button_style
  flex: 1
  textAlign: center
  lineHeight: 44

source:
  children:
    - *source_header
    - style:
        <<: *source_button_group_style
      children:
        - text:
            content: Source
            style:
              <<: *source_button_style
              backgroundColor: grey
              color: white
        - text:
            content: Preview
            style:
              <<: *source_button_style
          onPress:
            linkTo: preview
    - comment: |
        Write the code.
        (YAML)
    - input:
        value: 'home:'
        multiline: true
        numberOfLines: 10
        style:
          margin: 10
          borderWidth: 1
          borderColor: lightgrey
          flex: 1

preview:
  children:
    - *source_header
    - style:
        <<: *source_button_group_style
      children:
        - text:
            content: Source
            style:
              <<: *source_button_style
          onPress:
            linkTo: source
        - text:
            content: Preview
            style:
              <<: *source_button_style
              backgroundColor: grey
              color: white
    - style:
        borderWidth: 1
        borderColor: lightgrey
        flex: 1
        margin: 10
      children:
        - text:
            content: Preview
`;
