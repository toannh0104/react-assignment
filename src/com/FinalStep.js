import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Row, Col } from 'antd'

export default function FinalStep({
  meal,
  peopleNum,
  restaurant,
  dishes,
  prev
}) {
  return (
    <div>
      <Card>
        <Row>
          <Col span={12}><strong>Meal</strong></Col>
          <Col span={12}>{meal}</Col>
        </Row>
        <Row>
          <Col span={12}><strong>No. of. People</strong></Col>
          <Col span={12}>{peopleNum}</Col>
        </Row>
        <Row>
          <Col span={12}><strong>Restaurant</strong></Col>
          <Col span={12}>{restaurant}</Col>
        </Row>
        <Row>
          <Col span={12}><strong>Dishes</strong></Col>
          <Col span={12}>
            <Card style={{ backgroundColor: '#f0f2f5' }}>
              {dishes.map((item) => (
                <div key={item.name}>
                  {item.name} - {item.num}
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </Card>
      <Button style={{ marginLeft: 8 }} onClick={prev}>Previous</Button>
      <Button
        type="primary"
        onClick={() => {
          alert('Success!\nYour order has been received and is being processed.')
          console.warn(dishes)
        }}
        style={{ float: 'right' }}
      >
        Submit
      </Button>
    </div>
  )
}

FinalStep.propTypes = {
  meal: PropTypes.string.isRequired,
  peopleNum: PropTypes.number.isRequired,
  restaurant: PropTypes.string.isRequired,
  dishes: PropTypes.array.isRequired,
  prev: PropTypes.func
}

FinalStep.defaultProps = {
  prev: () => {}
}
