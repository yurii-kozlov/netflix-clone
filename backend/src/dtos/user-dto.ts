import { UserDoc, Plan } from 'models/user-model';

class UserDto {
  email: string;
  id: number;
  isActivated: boolean;
  plan: Plan

  constructor(model: UserDoc) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.plan = model.plan;
  }
}

export default UserDto;
