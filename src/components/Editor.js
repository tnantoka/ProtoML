import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Card,
  CardBody,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import AceEditor from 'react-ace';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LZString from 'lz-string';

import 'brace/mode/yaml';
import 'brace/theme/github';

import DEFAULT_SOURCE from '../constants/default_source';
import Preview from './Preview';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.source || DEFAULT_SOURCE.trim(),
    };
  }

  handleChangeSource = source => {
    this.setState({ source });
  };

  openEditLink = () => {
    this.openLink('edit');
  };

  openPlayLink = () => {
    this.openLink('play');
  };

  openScreensLink = () => {
    this.openLink('screens');
  };

  openLink = route => {
    window.open(`/${route}/${this.compress()}`, '_blank');
  };

  openExamplesLink = () => {
    window.open('/examples', '_blank');
  };

  compress = () => {
    return LZString.compressToEncodedURIComponent(this.state.source);
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar light expand className="border-bottom">
          <Container fluid>
            <NavbarBrand href="/">
              <img src="/icon-64.png" width="30" height="30" alt="" />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className="py-0">
                  <Icon name="bars" size={20} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Links</DropdownItem>
                  <DropdownItem onClick={this.openEditLink}>
                    <Icon name="pencil" /> Edit
                  </DropdownItem>
                  <DropdownItem onClick={this.openPlayLink}>
                    <Icon name="play" /> Play
                  </DropdownItem>
                  <DropdownItem onClick={this.openScreensLink}>
                    <Icon name="window-maximize" /> Screens
                  </DropdownItem>
                  <DropdownItem onClick={this.openExamplesLink}>
                    <Icon name="book" /> Examples
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
        <Container fluid className="app-container">
          <Row className="app-row">
            <Col className="app-col" sm="6">
              <Card className="rounded-0">
                <CardBody className="p-0" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <AceEditor
                    mode="yaml"
                    theme="github"
                    value={this.state.source}
                    onChange={this.handleChangeSource}
                    height="100%"
                    width="100%"
                    showGutter={false}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className="app-col" sm="6">
              <Card className="border-0">
                <CardBody className="p-0" style={{ display: 'flex', flexDirection: 'column' }}>
                  <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgrey' }}>
                    <Preview source={this.state.source} />
                  </View>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
