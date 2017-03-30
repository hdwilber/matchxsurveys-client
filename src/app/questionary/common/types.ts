import { User } from "../../user/common/types";

export class Label {
  id: number;
  type: string;
  data: string;
}
export class E {
  id: number;
  parent: E;
  next: E;
  prev: E;
  dataType: string;
  label: Label;
  code: string;
  children: E[];
}
export class Option {
  id: number;
  type: string;
  value: number;
  data: string;
  extra: string;

  static TYPES = [
    { name: 'Option', code:'option' },
    { name: 'Minimum', code: 'min' },
    { name: 'Maximum', code: 'max' }
  ];
}
export class Question extends E {
  type: string;
  subType: string;
  options: Option[];
  logics: Logic[];

  static TYPES = [
    {
      name: "Selection",
      code: "selection",
      subTypes: [
        {
          name: "Simple",
          code: "simple",
          options: [
            { name: 'Option', code: 'option' }
          ]
        },
        {
          name: "Level",
          code: "level",
          options: [
            { name: 'Minimum', code: 'min' },
            { name: 'Maximum', code: 'max' }
          ]
        }
      ]
    },
    {
      name: "Input",
      code: 'input', 
      subTypes: [
        {
          name: "Text",
          code: 'text',
          options: [
            { name: 'Text Small', code: 'text-small' },
            { name: 'Text Large', code: 'text-large' }
          ]
        }
      ]
    },
    {
      name: "Remark",
      code: "remark",
      subTypes: [
        {
          name: "none", 
          code: "node"
        }
      ]
    }
  ];
}
export class Group extends E {
  id: number;
  start: E;
  questions: Question[];
  logics: Logic[];
}

export class Questionary extends E {
  groups: Group[];
}

export class TakenQuiz {
  id: number;
  questionary: Questionary;
  user: User;
  first: E;
  last: E;
}

export class Logic {
  id: number;
  action: string;
  hierarchy: any;
  questionary: Questionary;

  static ACTION_TYPES = [
    {
      name: 'Hide',
      code: 'hide'
    },
    {
      name: 'Show',
      code: 'show'
    },
    {
      name: 'Jump',
      code: 'jump'
    }
  ];
}
 
export class MatchLogic extends E {
  bool: string;
  name: string;
  
  static BOOL_TYPES = [
    { name: 'AND', code: 'and' },
    { name: 'OR', code: 'or'}
  ];
}

export class Match {
  id: number;
  operator: string;
  target: E;
  targetOption: Option;
  targetValue: number;
  name: string;

  static OPERATOR_TYPES = [
    { name: 'Equals To', code: 'eq' },
    { name: 'Greater Than', code: 'gt'},
    { name: 'Inside', code: 'in' },
    { name: "Lesser Than", code: 'lt' }
  ];
}

export class Answer {
  id: number;
  question: Question;
  option: Option;
  value: number;
  data: string;
}
