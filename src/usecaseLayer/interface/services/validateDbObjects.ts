export interface IValidateDbObjects{
    validateId(id:string| undefined):(string | never)
}