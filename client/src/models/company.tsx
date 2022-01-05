export class Company { 
    name: string; 
    school: string;
    region: string;
    category: string;
    constructor(name: string, school: string, region: string, category: string) {
        this.name = name
        this.school = school
        this.region = region
        this.category = category
    }
}