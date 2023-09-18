declare module 'policies' {
  type PolicyType = {
    id: number
    name: string
    if_statements: IfStatementsType[]
  }

  type IfStatementsType = {
    id: number
    variable: string
    value: string
    comparison_operator: 'EQ' | 'LT' | 'LTE' | 'GT' | 'GTE'
    else_block: boolean
    then_block: boolean
  }

  type PolicyResponseType = {
    content: PolicyType[]
  }
}
