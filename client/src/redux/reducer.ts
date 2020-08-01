import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

export function stateReducer(oldAppState: AppState = new AppState(), action: Action): AppState {

    switch (action.type) {

        case ActionType.Login:
            return {
                ...oldAppState,
                isLoggedIn: true
            }

        case ActionType.GetAllVacations:
            return {
                ...oldAppState,
                vacations: action.payload
            }

        case ActionType.GetAllUserVacations:
            return {
                ...oldAppState,
                userVacations: action.payload
            }

        case ActionType.GetAllUsers:
            return {
                ...oldAppState,
                users: action.payload
            }

        case ActionType.addUser:
            return {
                ...oldAppState,
                users: [...oldAppState.users, action.payload]
            }

        case ActionType.addVacation:
            return {
                ...oldAppState,
                vacations: [...oldAppState.vacations, action.payload]
            }

        case ActionType.addUserVacation:
            return {
                ...oldAppState,
                vacations: [...oldAppState.vacations, action.payload]
            }

        case ActionType.deleteVacation:
            return {
                ...oldAppState,
                vacation: {}
            }

        case ActionType.deleteUserVacation:
            return {
                ...oldAppState,
                vacation: {}
            }

        case ActionType.updateVacation:
            return {
                ...oldAppState,
                vacations: oldAppState.vacations.map(
                    vacation =>
                        vacation.id === action.payload.vacationId ?
                            action.payload : vacation
                )
            }
    }
}