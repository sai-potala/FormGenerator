import React from "react";
import axios from "axios";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount = () => {
    axios
      .get(
        `https://api-form-generator.herokuapp.com/auth/form/${this.props.match.params.id}`
      )
      .then((response) => this.setState({ ...this.state, data: response.data }))
      .catch((error) => console.log(error));
  };

  onchange = (value, index) => {
    this.setState({
      ...this.state,
      [this.state.data[index].answer]: value,
    });
  };
  render() {
    return (
      <>
        {this.state.data &&
          this.state.data.map((questions, index) => {
            return (
              <>
                <section key={index}>
                  <h3>{questions.question}</h3>
                  <input
                    type="text"
                    value={this.state.data[index].answer}
                    onChange={(e) => this.onchange(e.target.value, index)}
                  />
                </section>
              </>
            );
          })}
      </>
    );
  }
}

export default Question;
