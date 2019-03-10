import dispatcher from "../dispatcher";

export function showModal (id) {
    dispatcher.dispatch({
        type: "SHOW_MODAL",
        id,
    })
}

export function hideModal (slots, name, number) {
    dispatcher.dispatch({
        type: "HIDE_MODAL",
        slots,
        name,
        number
    })
}

export function handleCancel () {
    dispatcher.dispatch({
        type: "HANDLE_CANCEL",
    })
}

export function handleColor() {
    dispatcher.dispatch({
        type: "HANDLE_COLOR",
    })
}