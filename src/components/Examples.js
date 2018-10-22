import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import Preview from './Preview';
import EXAMPLE_SOURCES from '../constants/example_sources';

export default class Exmaples extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {Object.keys(EXAMPLE_SOURCES).map(key => {
          return (
            <Card key={key} className="mb-3 rounded-0">
              <CardHeader tag="h5" className="bg-white">{key}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <pre className="bg-light m-0">
                      <code>{EXAMPLE_SOURCES[key]}</code>
                    </pre>
                  </Col>
                  <Col>
                    <Preview source={EXAMPLE_SOURCES[key]} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    margin: '1rem',
  },
});
