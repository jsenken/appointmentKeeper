import React, { Component } from "react";
import Slot from "./components/Slot";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Modal from "./components/Modal";
import Input from "./components/Input";
import Button from "./components/Button";
import SlotStore from "./stores/SlotStore";
import * as SlotActions from "./actions/SlotActions"

class App extends Component {
  constructor() {
    super();
    this.state = {
      show: SlotStore.show,
      clicked: SlotStore.clicked,
      slots: SlotStore.getAll(),
      nameInput: SlotStore.nameInput,
      numberInput: SlotStore.numberInput
    };
  }


    componentWillMount() {
      SlotStore.on("change", () => {
        this.setState({
          show: SlotStore.show,
          clicked: SlotStore.clicked,
          slots: SlotStore.getAll(),
          nameInput: SlotStore.nameInput,
          numberInput: SlotStore.numberInput
        })
      })
    }

  showModal = id => {
    SlotActions.showModal(id)
  }

  handleInputChange(property) {
    return e=> {
      this.setState({
        [property]: e.target.value
      });
    };
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.nameInput === "" || this.state.numberInput ===""){
      alert("Please fill in name and number")
    } else
    var phoneno = /^\d{10}$/;
    if(this.state.numberInput.match(phoneno)){
      this.setState(state => {
        const slots = state.slots.map(slot => {
            if (slot.id === this.state.clicked) {
            return {...slot, name:this.state.nameInput, number:this.state.numberInput}
            } else {
            return slot;
            }
            });
            console.log(this.state.slots)
            return {
            slots,
            };
          },this.hideModal
          );
    } else 
    alert("Please use a valid phone number (10 digits)")


  };

  hideModal = () => {
    SlotActions.hideModal(this.state.slots)
  }


  handleCancel = () => {
    SlotActions.handleCancel()
  }


  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <Title>Appointment Keeper</Title>
          {this.state.slots.map(slot => (
            <Slot
              id={slot.id}
              title={slot.title}
              key={slot.id}
              name={slot.name}
              className={slot.bkgc}
              showModal={this.showModal}
            />
          ))}
          <Modal show={this.state.show} handleClose={this.hideModal} handleCancel={this.handleCancel}>
            Name:
            <Input
              value={this.state.nameInput}
              onChange={this.handleInputChange('nameInput')}
              placeholder={ "Enter Name Here"}
            />
            Number:
            <Input
              value={this.state.numberInput}
              onChange={this.handleInputChange('numberInput')}
              placeholder={ "Enter Phone Number Here"}
            />
            <hr></hr>
            <div className="options">
            <Button
              onClick={this.handleFormSubmit}
              type="primary"
              className="input"
            >
              Submit Appointment
            </Button>
            <Button
              onClick={this.handleCancel}
              type="danger"
              className="input"
            >
              Cancel Appointment
            </Button>
            <Button
              onClick={this.hideModal}
              type="secondary"
              className="input"
            >
              Close Modal
            </Button>
            </div>
          </Modal>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default App;
