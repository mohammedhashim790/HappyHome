export interface DocumentDetails{
    ID:number;
    Aadhar_Number:string;
    panId:string;
    voterId:string;
    salarySlip:string;
    LOA:string;
    NOC:string;
    saleAgreement:string;
    Reg_Details:string;
    Collateral:string;
}
export interface IncomeDetails{
    ID:number;
    Current_Sallary:number;
    propertyLocation:string;
    employerName:string;
    estimatedCost:number;
    Occupation:string;
    Employer_Name:string;
    employmentType:string;
    retire:number;
    propertyName:string;
}
export interface LoanDetails{
    Amount_Required:number;
    tenure:string;
    No_of_installments:number;
    Reference_Number:number;
    ID:number;
    loanAmount:number;
    Elgible_Amount:number;
    ROI:number;
}
export interface UserTable{
    firstName:string;
    Id:number;
    middleName:string;
    emailId:string;
    Password:string;
    phNumber:number;
    DOB:string;
    gender:string;
    nationality :string;
    adharNo:string;
    panId:string;
    Token:string;
}
export interface UserAccountTable{
    ID:number;
    Account_ID:string
    Status:string;
    Created_At:string;
    Updated_At:string;
    Signature:string;
    UserTable:UserTable;
    UserLoan:UserLoan;
}
export interface UserLoan{
    Due_Date:string;
    Next_Due_Date:string;
    Remaining_Amount:number;
    Date_Sanctioned:string;
    LoanDetails:LoanDetails;
    UserBank:UserBankDetails;
    IncomeDetails:IncomeDetails;
    DocumentDetails:DocumentDetails;
    UserDetails:UserTable;
}
export interface UserBankDetails{
    ID:number;
    Bank_Name :string;
    Account_Number:string;
    Address:string;
    IFSC:string;
}
