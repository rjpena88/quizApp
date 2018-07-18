import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    // trying adding Tally here
    tally: any[];

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        // trying adding Tally here
        this.tally = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
            // trying adding Tally here
            // this.tally.push(new Option(o));
        });
    }
}
