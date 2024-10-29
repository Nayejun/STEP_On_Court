export interface IRegister {
   username: string;
   email: string;
   password: string;
}

export interface ILogin {
   email: string;
   password: string;
}

export interface IAuthFormProps {
   authType: "login" | "register";
}

export interface ICreateReservation {
   date: string;
   time: string;
   place: string;
}

export interface IFixReservation {
   date: string;
   time: string;
   place: string;
}
