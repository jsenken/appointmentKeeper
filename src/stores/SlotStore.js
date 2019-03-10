import { EventEmitter } from "events";
import dispatcher from "../dispatcher"

class SlotStore extends EventEmitter {
    constructor() {
        super();
        this.show= false,
        this.clicked= "",
        this.nameInput= "",
        this.numberInput= "",
        this.slots = [
            {
              id: 1,
              title: "9:00AM-10:00AM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 2,
              title: "10:00AM-11:00AM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 3,
              title: "11:00AM-12:00PM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 4,
              title: "12:00PM-1:00PM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 5,
              title: "1:00PM-2:00PM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 6,
              title: "2:00PM-3:00PM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 7,
              title: "3:00PM-4:00PM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            },
            {
              id: 8,
              title: "4:00PM-5:00PM",
              name: "",
              number: "",
              bkgc: "btn btn-success open"
            }
          ]
        };
    getAll() {
        return this.slots
    }

    showModal = id => {
      console.log(id)
      this.clicked= id,
      this.nameInput = this.slots[id-1].name
      this.numberInput = this.slots[id-1].number
      this.reallyShow()
    };
    
    reallyShow = () => {
      this.show= true;
      this.emit("change");
    }

    hideModal = (slots) => {
      this.slots = slots
      this.show= false
      console.log(this.slots)
      this.handleColor()
      this.emit("change")
    };

    handleCancel = () => {
        this.slots[this.clicked-1].name = "";
        this.slots[this.clicked-1].number = "";
        this.hideModal(this.slots)
      }


    handleColor = () => {
      for (var i = 0; i < this.slots.length; i ++){
        if (this.slots[i].name !== "" && this.slots[i].number !== ""){
            this.slots[i].bkgc = "btn btn-danger open"
        } else
            this.slots[i].bkgc = "btn btn-success open"
      }
      console.log(this.slots)
  }



    handleActions(action) {
      console.log(action)
      switch (action.type) {
        case "SHOW_MODAL": 
          this.showModal(action.id);
          break;
        case "HIDE_MODAL":
          this.hideModal(action.slots, action.name, action.number);
          break;
        case "HANDLE_CANCEL":
          this.handleCancel();
          break;
        case "HANDLE_COLOR":
          this.handleColor()
          break;
      }
    }
}

const slotStore = new SlotStore;
dispatcher.register(slotStore.handleActions.bind(slotStore))

export default slotStore;