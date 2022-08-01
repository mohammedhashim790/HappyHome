

export interface DocumentDetails{
    ID?:number;
    Aadhar_Number?:string;
    panId?:string;
    voterId?:string;
    salarySlip?:string;
    LOA?:string;
    NOC?:string;
    saleAgreement?:string;
    Reg_Details?:string;
    Collateral?:string;
}
export interface IncomeDetails{
  id?:number;
  current_Sallary?:number;
  propertyLocation?:string;
  employerName?:string;
  estimatedCost?:number;
  occupation?:string;
  employer_Name?:string;
  employmentType?:string;
  retire?:number;
  propertyName?:string;
}
export interface LoanDetails{
  amount_Required?:number;
  tenure?:string;
  no_of_installments?:number;
  reference_Number?:number;
  id?:number;
  loanAmount?:number;
  elgible_Amount?:number;
  roi?:number;
}
export interface UserTable{
  firstName?:string;
  lastName?:string;
    Id?:number;
    middleName?:string;
    emailId?:string;
  password?:string;
    phNumber?:number;
  dob?:string;
    gender?:string;
    nationality ?:string;
    adharNo?:string;
    panId?:string;
  token?:string;
    is_Admin?:boolean;
}
export interface UserAccountTable{
    id?:number;
    account_ID?:string
  status?:string;
  created_At?:string;
  updated_At?:string;
  signature?:string;
  userTable?:UserTable;
  userLoan?:UserLoan;
}
export interface UserLoan{
  due_Date?:string;
  amount?:string,
  next_Due_Date?:string;
  remaining_Amount?:number;
  date_Sanctioned?:string;
  loanDetails?:LoanDetails;
  userBank?:UserBankDetails;
  incomeDetails?:IncomeDetails;
  documentDetails?:DocumentDetails;
  userDetails?:UserTable;
}
export interface UserBankDetails{
  id?:number;
  bank_Name ?:string;
  account_Number?:string;
  address?:string;
  ifsc?:string;
}
