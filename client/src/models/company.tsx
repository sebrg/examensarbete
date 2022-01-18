export class Company { 
    name: string; 
    school: string;
    region: string;
    category: string;
    id?: string //NOTE: not sure to keep
    constructor(name: string, school: string, region: string, category: string, id?: string) {
        this.name = name
        this.school = school
        this.region = region
        this.category = category
        this.id = id
    }
}