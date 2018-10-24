import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import _ from 'lodash';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    };
    this.id = _.uniqueId('comment_');
  } 

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const { comment } = this.props;
    return (
      <div>
        <Button
          id={this.id}
          style={{
            backgroundColor: 'orange',
            opacity: 0.8,
            width: 18,
            height: 18,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1,
          }}
          onClick={this.toggle}
          className="rounded-0"
          size="sm"
        />
        <Popover isOpen={this.state.popoverOpen} target={this.id} toggle={this.toggle}>
          <PopoverHeader>Comments</PopoverHeader>
          <PopoverBody style={{ whiteSpace: 'pre-wrap' }}>{comment}</PopoverBody>
        </Popover>
      </div>
    );
  }
}
