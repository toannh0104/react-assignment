import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Row, Col } from 'antd';
import { validateDish } from '../util/helper';
import DishItem from './DishItem';

const FormItem = Form.Item;

class ThirdStep extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chosen: props.chosen
    }
  }

  next = () => {
    const { chosen } = this.state
    this.props.next({
      chosen
    })
  }

  add = () => {
    const { dishes } = this.props
    const { chosen } = this.state
    chosen.push({ ...dishes[0], num: 1 })

    this.setState({
      chosen
    })
  }
  update = ({ index, name, num, validateStatus }) => {
    const { chosen } = this.state

    chosen[index].validateStatus = validateStatus
    chosen[index].name = name
    chosen[index].num = num
    this.setState({
      chosen
    })
  }
  render() {
    const { dishes, peopleNum } = this.props
    const { chosen } = this.state

    const chosenItems = chosen.map((item, index) => (
      <DishItem
        key={index.toString()}
        index={index}
        dishes={dishes}
        chosen={chosen}
        name={item.name}
        num={item.num}
        update={this.update}
      />
    ))
console.log("check");
    return (
      <div>
        <Row gutter={12}>
          <Col span={5} />
          <Col span={5}>Please select a dish</Col>
          <Col span={5}>Please enter no. of servings</Col>
          <Col span={5} />
        </Row>
        {chosenItems}
        {dishes.length !== chosen.length && (
          <Row gutter={16}>
            <Col span={6} />
            <Col span={6}>
              <FormItem>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: '60%' }}
                >
                  <Icon type="plus" /> Add a dish
                </Button>
              </FormItem>
            </Col>
            <Col span={8} />
          </Row>
        )}
        {!validateDish(peopleNum, chosen.map((item) => item.num)) && (
          <div style={{ textAlign: 'center', color: 'red' }}>
            <span>
              The total number of dishes must be greater or equal to the
              number of person and a maximum of 10 is allowed.
              <br />
            </span>
          </div>
        )}
        <Button style={{ marginLeft: 8 }} onClick={this.props.prev}>
          Previous
        </Button>

        <Button
          type="primary"
          onClick={this.next}
          disabled={!validateDish(peopleNum, chosen.map((item) => item.num))}
          style={{ float: 'right' }}
        >
          Next
        </Button>
      </div>
    )
  }
}

ThirdStep.propTypes = {
  peopleNum: PropTypes.number.isRequired,
  dishes: PropTypes.array.isRequired,
  chosen: PropTypes.array.isRequired,
  next: PropTypes.func,
  prev: PropTypes.func
}

ThirdStep.defaultProps = {
  next: () => {},
  prev: () => {}
}

export default ThirdStep
