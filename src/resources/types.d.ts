declare module 'policies' {
  type PolicyType = {
    id: number
    name: string
    if_statements: IfStatementsType[]
  }

  type IfStatementsType = {
    id: number
    variable?: string
    value?: string
    comparison_operator?: 'EQ' | 'LT' | 'LTE' | 'GT' | 'GTE'
    else_block?: 'true' | 'false'
    then_block?: 'true' | 'false'
  }

  type PolicyResponseType = {
    content: PolicyType[]
  }

  type DecisionType = {
    decision: boolean
  }

  type ShapeType = 'decision' | 'end' | 'both'
}
