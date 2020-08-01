import { Vacation } from '../models/vacation';
import { User } from '../models/user';

export class AppState {
    public vacations: Vacation[] = [];
    public userVacations: Vacation[] = [];
    public vacation: Vacation = {};
    public vacationToUpdate: Vacation = {};
    public users: User[] = [];
    public user: User = {};
    public isLoggedIn: boolean = false;
}