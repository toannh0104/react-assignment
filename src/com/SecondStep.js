import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class SecondStep extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurant: props.restaurants[0]
    }
  }
  handleRestaurantChange = (value) => {
    this.setState({
      restaurant: value
    })
  }
  next = () => {
    this.props.next({
      restaurant: this.state.restaurant
    })
  }

  render() {
    const { restaurant, restaurants } = this.props

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          required
          label="Please select a restaurant"
        >
          <Select
            defaultValue={restaurant || restaurants[0]}
            onChange={this.handleRestaurantChange}
          >
            {restaurants.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </FormItem>
        <Button style={{ marginLeft: 8 }} onClick={this.props.prev}>
          Previous
        </Button>
        <Button type="primary" onClick={this.next} style={{ float: 'right' }}>
          Next
        </Button>
      </Form>
    )
  }
}

SecondStep.propTypes = {
  restaurant: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  next: PropTypes.func,
  prev: PropTypes.func
}

SecondStep.defaultProps = {
  next: () => {},
  prev: () => {}
}

export default SecondStep
