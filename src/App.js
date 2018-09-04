import React from 'react';
import { Steps, Layout } from 'antd';

import FirstStep from './com/FirstStep';
import SecondStep from './com/SecondStep';
import ThirdStep from './com/ThirdStep';
import FinalStep from './com/FinalStep';

import { getData, getAvailableMeal, getRestaurant, getDishes } from './util/helper';

const { Content, Header } = Layout;
const Step = Steps.Step;

const steps = [{
    title: 'Select Meal'
  },{
    title: 'Select Restaurant'
  },{
    title: 'Select dishes'
  },{
    title: 'Review'
  }
]
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      meal: 'breakfast',
      peopleNum: 1,
      restaurant: '',
      dishes: getData().dishes,
      dishesByMeal: null,
      dishesByRestaurant: null,
      chosen: []
    }
  }

  step1Next = ({ meal, peopleNum }) => {
    const { current, dishes } = this.state
    this.setState({
      current: current + 1,
      meal,
      peopleNum,
      dishesByMeal: getAvailableMeal(dishes, meal),
    })
  }

  step2Next = ({ restaurant }) => {
    const { current, dishesByMeal } = this.state

    this.setState({
      current: current + 1,
      restaurant,
      chosen: [],
      dishesByRestaurant: getDishes(dishesByMeal, restaurant),
    })
  }
  step2Prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }
  step3Next = () => {
    const { current } = this.state
    this.setState({
      current: current + 1,
    })
  }
  step3Prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }
  step4Prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  render() {
    const {
      current,
      meal,
      peopleNum,
      restaurant,
      dishesByMeal,
      dishesByRestaurant,
      chosen,
    } = this.state

    let form = ''
    switch (current) {
      case 0:
        form = (
          <FirstStep meal={meal} peopleNum={peopleNum} next={this.step1Next} />
        )
        break
      case 1:
        form = (
          <SecondStep
            restaurant={restaurant}
            restaurants={getRestaurant(dishesByMeal)}
            next={this.step2Next}
            prev={this.step2Prev}
          />
        )
        break
      case 2:
        form = (
          <ThirdStep
            peopleNum={peopleNum}
            dishes={dishesByRestaurant}
            chosen={chosen}
            prev={this.step3Prev}
            next={this.step3Next}
          />
        )
        break
      default:
        form = (
          <FinalStep
            meal={meal}
            peopleNum={peopleNum}
            restaurant={restaurant}
            dishes={chosen}
            prev={this.step4Prev}
          />
        )
    }

    return (
      <Layout style={{ height: '80vh' }}>
        <Header>
          <h1 style={{ color: 'white', textAlign: 'center' }}>
            React assignment
          </h1>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '50px' }}>
          <Steps current={current}>
            {steps.map((e) => (
              <Step key={e.title} title={e.title} />
            ))}
          </Steps>
          <div>{form}</div>
        </Content>
      </Layout>
    )
  }
}
