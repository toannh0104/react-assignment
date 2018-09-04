import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Row, Col } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

export function hasOther(selected = [], value, i) {
  var index = selected.map((e) => e.name).indexOf(value);
  return index !== -1 && index !== i;
}

export default class DishItem extends React.Component {
  constructor(props) {
    super(props);

    const { chosen, index, name } = props;
    const has = hasOther(chosen, name, index);

    this.state = {
      name: {
        validateStatus: has ? 'error' : 'success',
        errorMsg: has ? "can't select the same dish twice" : null,
        value: props.name || ''
      },

      number: {
        value: props.num || 1
      },
    }
  }

  onChangeDish = (value) => {
    const { chosen, index } = this.props;

    if (hasOther(chosen, value, index)) {
      this.setState({
        name: {
          validateStatus: 'error',
          errorMsg: "can't select the same dish twice",
          value
        },
      })
    } else {
      this.setState({
        name: {
          validateStatus: 'success',
          errorMsg: null,
          value
        },
      })
      const num = parseInt(this.state.number.value, 10)
      this.props.update({
        index: this.props.index,
        name: value,
        num
      })
    }
  }

  onChangeNum = (e) => {
    const { value } = e.target;
    const num = parseInt(value, 10)

    if (value > 0 && value <= 10) {
      this.setState({
        number: {
          validateStatus: 'success',
          errorMsg: null,
          value: num,
        }
      })

      // update
      this.props.update({
        index: this.props.index,
        name: this.props.name,
        num: value,
      })
    } else {
      this.setState({
        number: {
          validateStatus: 'error',
          errorMsg: 'number of dishes must be between 1 and 10',
          value: num,
        },
      })
    }
  }

  render() {
    const { dishes } = this.props;
    const { name, number } = this.state;

    return (
      <Form layout="horizontal">
        <Row gutter={12}>
          <Col span={5} />
          <Col span={5}>
            <FormItem validateStatus={name.validateStatus} help={name.errorMsg}>
              <Select value={name.value} onChange={this.onChangeDish}>
                {dishes.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={5}>
            <Form.Item
              validateStatus={number.validateStatus}
              help={number.errorMsg}
            >
              <input
                type="number"
                min={1}
                max={10}
                value={number.value || ''}
                onChange={this.onChangeNum}
              />
            </Form.Item>
          </Col>
          <Col span={5} />
        </Row>
      </Form>
    )
  }
}

DishItem.proptTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  chosen: PropTypes.array,
  num: PropTypes.number,
  update: PropTypes.func
}
